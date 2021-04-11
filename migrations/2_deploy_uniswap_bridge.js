const O3SwapUniBridge = artifacts.require("O3SwapUniBridge");

module.exports = function (deployer) {
    WETH = "0xc778417E063141139Fce010982780140Aa0cD5Ab"
    UniSwapFactory = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"
    polySwapperV2 = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
    polySwapperId = 1

    deployer.deploy(O3SwapUniBridge, WETH, UniSwapFactory, polySwapperV2, polySwapperId);
};
