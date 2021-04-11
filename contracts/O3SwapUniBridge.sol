// SPDX-License-Identifier: GPL-3.0

pragma solidity =0.6.12;

import "./Ownable.sol";
import "./libraries/uniswap/UniswapV2Library.sol";
import "./interfaces/uniswap/IUniswapV2Factory.sol";
import './libraries/TransferHelper.sol';
import "./interfaces/IWETH.sol";
import "./interfaces/IERC20.sol";
import "./libraries/SafeMath.sol";
import "./interfaces/poly/ISwapper.sol";
import "./libraries/Convert.sol";

contract O3SwapUniBridge is Ownable {
    using SafeMathUniswap for uint256;
    using Convert for bytes;

    address public WETH;
    address public factory;
    address public swapper;
    uint public swapperId;

    uint64 public base_fee_denominator = 10**4;

    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'O3SwapUniBridge: EXPIRED');
        _;
    }

    constructor (
        address _weth,
        address _factory,
        address _swapper,
        uint _swapperId
    ) public {
        WETH = _weth;
        factory = _factory;
        swapper = _swapper;
        swapperId = _swapperId;
    }

    function getSwapperId() external view returns (uint) {
        return swapperId;
    }

    function setSwapperId(uint _swapperId) external onlyOwner {
        swapperId = _swapperId;
    }

    function collect(address token) external {
        if (token == WETH) {
            IWETH(WETH).withdraw(IERC20(token).balanceOf(address(this)));
            TransferHelper.safeTransferETH(owner(), IERC20(token).balanceOf(address(this)));
        } else {
            TransferHelper.safeTransfer(token, owner(), IERC20(token).balanceOf(address(this)));
        }
    }

    function getExactAmount(uint amount) internal view returns(uint) {
        return amount.sub(amount / base_fee_denominator);
    }

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint uniAmountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual ensure(deadline) {
        uint uniAmountOut = _swapExactTokensForTokensSupportingFeeOnTransferTokens(amountIn, uniAmountOutMin, path);
        TransferHelper.safeTransfer(path[path.length - 1], to, getExactAmount(uniAmountOut));
    }

    function swapExactTokensForTokensSupportingFeeOnTransferTokensCrossChain(
        uint amountIn,
        uint uniAmountOutMin,
        address[] calldata path,
        bytes memory to,
        uint deadline,
        uint64 toPoolId,
        uint64 toChainId,
        bytes memory toAssetHash,
        uint polyMinOutAmount,
        uint fee
    ) external virtual ensure(deadline) returns (bool) {
        uint uniAmountOut = _swapExactTokensForTokensSupportingFeeOnTransferTokens(amountIn, uniAmountOutMin, path);
        return _cross(
            path[path.length - 1],
            toPoolId,
            toChainId,
            toAssetHash,
            to,
            getExactAmount(uniAmountOut),
            polyMinOutAmount,
            fee,
            swapperId
        );
    }

    function _swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path
    ) internal virtual returns (uint) {
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(address(this));
        _swapSupportingFeeOnTransferTokens(path, address(this));
        uint amountOut = IERC20(path[path.length - 1]).balanceOf(address(this)).sub(balanceBefore);
        require(amountOut >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        return amountOut;
    }

    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint uniAmountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual payable ensure(deadline) {
        uint uniAmountOut = _swapExactETHForTokensSupportingFeeOnTransferTokens(uniAmountOutMin, path);
        TransferHelper.safeTransfer(path[path.length - 1], to, getExactAmount(uniAmountOut));
    }

    function swapExactETHForTokensSupportingFeeOnTransferTokensCrossChain(
        uint uniAmountOutMin,
        address[] calldata path,
        bytes memory to,
        uint deadline,
        uint64 toPoolId,
        uint64 toChainId,
        bytes memory toAssetHash,
        uint polyMinOutAmount,
        uint fee
    ) external virtual payable ensure(deadline) returns (bool) {
        uint uniAmountOut = _swapExactETHForTokensSupportingFeeOnTransferTokens(uniAmountOutMin, path);
        address fromAssetHash = path[path.length - 1];
        return _cross(
            fromAssetHash,
            toPoolId,
            toChainId,
            toAssetHash,
            to,
            getExactAmount(uniAmountOut),
            polyMinOutAmount,
            fee,
            swapperId
        );
    }

    function _swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint uniAmountOutMin,
        address[] calldata path
    ) internal virtual returns (uint) {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        uint amountIn = msg.value;
        IWETH(WETH).deposit{value: amountIn}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn));
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(address(this));
        _swapSupportingFeeOnTransferTokens(path, address(this));
        uint amountOut = IERC20(path[path.length - 1]).balanceOf(address(this)).sub(balanceBefore);
        require(amountOut >= uniAmountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        return amountOut;
    }

    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint uniAmountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual ensure(deadline) {
        uint amountOut = _swapExactTokensForETHSupportingFeeOnTransferTokens(amountIn, uniAmountOutMin, path);
        uint adjustedAmountOut = getExactAmount(amountOut);
        IWETH(WETH).withdraw(adjustedAmountOut);
        TransferHelper.safeTransferETH(to, adjustedAmountOut);
    }

    function _swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint uniAmountOutMin,
        address[] calldata path
    ) internal virtual returns (uint) {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        uint balanceBefore = IERC20(WETH).balanceOf(address(this));
        _swapSupportingFeeOnTransferTokens(path, address(this));
        uint amountOut = IERC20(WETH).balanceOf(address(this)).sub(balanceBefore);
        require(amountOut >= uniAmountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        return amountOut;
    }

    // **** SWAP (supporting fee-on-transfer tokens) ****
    // requires the initial amount to have already been sent to the first pair
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output));
            uint amountInput;
            uint amountOutput;
            { // scope to avoid stack too deep errors
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
            }
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOutput) : (amountOutput, uint(0));
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
            pair.swap(amount0Out, amount1Out, to, new bytes(0));
        }
    }

    function _cross(
        address fromAssetHash,
        uint64 toPoolId,
        uint64 toChainId,
        bytes memory toAssetHash,
        bytes memory toAddress,
        uint amount,
        uint minOutAmount,
        uint fee,
        uint id
    ) internal returns (bool) {
        // Allow `swapper contract` to transfer `amount` of `fromAssetHash` on belaof of this contract.
        IERC20(fromAssetHash).approve(swapper, amount);

        bool result = ISwapper(swapper).swap(
            fromAssetHash,
            toPoolId,
            toChainId,
            toAssetHash,
            toAddress,
            amount,
            minOutAmount,
            fee,
            id
        );
        require(result, "POLY CROSSCHAIN ERROR");

        return result;
    }
}
