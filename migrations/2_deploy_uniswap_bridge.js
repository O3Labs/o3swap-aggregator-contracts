const O3SwapUniBridge = artifacts.require("O3SwapUniBridge");

module.exports = function (deployer) {
    // Ropsten Testnet
    WETH = "0xc778417E063141139Fce010982780140Aa0cD5Ab"
    UniSwapFactory = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"
    polySwapperV2 = "0x8Baa27e659F55249bb36113346980BFFABC53AeF"
    polySwapperId = 1

    deployer.deploy(O3SwapUniBridge, WETH, UniSwapFactory, polySwapperV2, polySwapperId);
};
