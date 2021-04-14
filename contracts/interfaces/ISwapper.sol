// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0;

interface ISwapper {
    function swap(
        address fromAssetHash,
        uint64 toPoolId,
        uint64 toChainId,
        bytes calldata toAssetHash,
        bytes calldata toAddress,
        uint amount,
        uint minOutAmount,
        uint fee,
        uint id
    ) external payable returns (bool);
}
