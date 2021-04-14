const O3SwapETHUniswapBridge = artifacts.require("O3SwapETHUniswapBridge");
const O3SwapBSCPancakeBridge = artifacts.require("O3SwapBSCPancakeBridge");


const weth_mainnet = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const weth_testnet = "0xc778417E063141139Fce010982780140Aa0cD5Ab";

const wbnb_mainnet = "";
const wbnb_testnet = "0x094616f0bdfb0b526bd735bf66eca0ad254ca81f";


const poly_swapper_eth_mainnet = "";
const poly_swapper_eth_ropsten = "0x8Baa27e659F55249bb36113346980BFFABC53AeF";

const poly_swapper_bsc_mainnet = "0x3ec481143d688442E581aD7116Bf1ECC76669cfa";
const poly_swapper_bsc_testnet = "0x51FfD5196e3945c4CE25101eEB7f4062b97B9A1A";

const poly_heco_swapper_mainnet = "";
const poly_heco_swapper_testnet = "";


module.exports = function (deployer, network, accounts) {
    switch (network) {
        // Mainnet
        case "eth_uniswap_mainnet":
            deployETHUniswapMainnet(deployer); break;
        case "bsc_pancake_mainnet":
            deployBSCPancakeMainnet(deployer); break;
        // Testnet
        case "eth_uniswap_ropsten":
            deployETHUniswapRopsten(deployer); break;
        case "bsc_pancake_testnet":
            deployBSCPancakeTestnet(deployer); break;
    }
};

function deployETHUniswapMainnet(deployer) {
    ensureMainnet();
    var WETH = weth_mainnet;
    var UniSwapFactory = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
    var polySwapper = poly_swapper_eth_mainnet;
    var polySwapperId = 1;

    deployer.deploy(O3SwapETHUniswapBridge, WETH, UniSwapFactory, polySwapper, polySwapperId);
}

function deployBSCPancakeMainnet(deployer) {
    ensureMainnet();
    var WBNB = wbnb_mainnet;
    var pancakeFactory = "";
    var polySwapper = poly_swapper_bsc_mainnet;
    var polySwapperId = 1;

    deployer.deploy(O3SwapBSCPancakeBridge, WBNB, pancakeFactory, polySwapper, polySwapperId);
}

function deployETHUniswapRopsten(deployer) {
    ensureNotMainnet();

    var WETH = weth_testnet;
    var UniSwapFactory = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
    var polySwapper = poly_swapper_eth_ropsten;
    var polySwapperId = 1;

    deployer.deploy(O3SwapETHUniswapBridge, WETH, UniSwapFactory, polySwapper, polySwapperId);
}

function deployBSCPancakeTestnet(deployer) {
    ensureNotMainnet();

    var WBNB = wbnb_testnet;
    var pancakeFactory = "0xd417A0A4b65D24f5eBD0898d9028D92E3592afCC";
    var polySwapper = poly_swapper_bsc_testnet;
    var polySwapperId = 1;

    deployer.deploy(O3SwapBSCPancakeBridge, WBNB, pancakeFactory, polySwapper, polySwapperId);
}

function ensureMainnet(network) {
    if (!network.includes("mainnet")) {
        console.log(`ERROR!!! You're deploying contracts into non-mainnet network. Current network = ${network}`);
        process.exit(1);
    }
}

function ensureNotMainnet(network) {
    if (network.includes("mainnet")) {
        console.log(`ERROR!!! You're deploying contracts into mainnet. Current network = ${network}`);
        process.exit(1);
    }
}
