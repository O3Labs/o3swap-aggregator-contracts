const O3SwapETHUniswapBridge = artifacts.require("O3SwapETHUniswapBridge");
const O3SwapBSCPancakeBridge = artifacts.require("O3SwapBSCPancakeBridge");
const O3SwapHecoMdexBridge = artifacts.require("O3SwapHecoMdexBridge");
const O3SwapPolygonQuickSwapBridge = artifacts.require("O3SwapPolygonQuickSwapBridge");
const O3SwapArbitrumSushiBridge = artifacts.require("O3SwapArbitrumSushiBridge");


const weth_eth_mainnet = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const weth_eth_testnet = "0xc778417E063141139Fce010982780140Aa0cD5Ab";
const wbnb_mainnet = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
const wbnb_testnet = "0x094616f0bdfb0b526bd735bf66eca0ad254ca81f";
const wht_mainnet = "0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f";
const wht_testnet = "0x7af326b6351c8a9b8fb8cd205cbe11d4ac5fa836";
const wmatic_mainnet = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
const wmatic_testnet = "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889";
const weth_arbitrum_mainnet = "0x82af49447d8a07e3bd95bd0d56f35241523fbab1";
const weth_arbitrum_testnet = "0xb47e6a5f8b33b3f17603c83a0535a9dcd7e32681";

const poly_swapper_eth_mainnet = "0x02e20ca05e38cbdf1a6235a7acdd34efc0434caa";
const poly_swapper_eth_ropsten = "0x8Baa27e659F55249bb36113346980BFFABC53AeF";
const poly_swapper_bsc_mainnet = "0x3ec481143d688442E581aD7116Bf1ECC76669cfa";
const poly_swapper_bsc_testnet = "0x51FfD5196e3945c4CE25101eEB7f4062b97B9A1A";
const poly_swapper_heco_mainnet = "0x70f4d1176f9276ab4B31658f58F7473858F2b550";
const poly_swapper_heco_testnet = "0x0488ADd7e3D4C58acb8DF7c487dAfC48e3224833";
const poly_swapper_polygon_mainnet = "0xabc248c717fA0A9a78ff4Bf48A316c9e241A82C4";
const poly_swapper_polygon_testnet = "0x1B0C55be400e2a7D924032B257Fbc75Bbfd256E7";
const poly_swapper_arbitrum_mainnet = "0x7E418a9926c8D1cbd09CC93E8051cC3BbdfE3854";
const poly_swapper_arbitrum_testnet = "0xffffffffffffffffffffffffffffffffffffffff"; // Placeholder

const uniswap_eth_mainnet_factory = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
const uniswap_eth_testnet_factory = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
const pancake_bsc_mainnet_factory = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
const pancake_bsc_testnet_factory = "0xd417A0A4b65D24f5eBD0898d9028D92E3592afCC";
const mdex_heco_mainnet_factory = "0xb0b670fc1F7724119963018DB0BfA86aDb22d941";
const mdex_heco_testnet_factory = "0x42bF55Dfd95bbA679F2B0230A526ff407fd0498C";
const sushi_eth_mainnet_factory = "0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac";
const sushi_eth_testnet_factory = "0xc35DADB65012eC5796536bD9864eD8773aBc74C4";
const quickswap_polygon_mainnet_factory = "0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32";
const quickswap_polygon_testnet_factory = "";
const sushi_arbitrum_mainnet_factory = "0xc35DADB65012eC5796536bD9864eD8773aBc74C4";
const sushi_arbitrum_testnet_factory = "0xffffffffffffffffffffffffffffffffffffffff"; // Placeholder

module.exports = function (deployer, network, accounts) {
    switch (network) {
        // Mainnet
        case "eth_mainnet_uniswap":
            deployETHUniswapMainnet(deployer, network); break;
        case "bsc_mainnet_pancake":
            deployBSCPancakeMainnet(deployer, network); break;
        case "heco_mainnet_mdex":
            deployHecoMdexMainnet(deployer, network); break;
        case "polygon_mainnet_quickswap":
            deployPolygonQuickSwapMainnet(deployer, network); break;
        case "arbitrum_mainnet_sushi":
            deployArbitrumSushiMainnet(deployer, network); break;

        // Testnet
        case "eth_ropsten_uniswap":
            deployETHUniswapRopsten(deployer, network); break;
        case "bsc_testnet_pancake":
            deployBSCPancakeTestnet(deployer, network); break;
        case "heco_testnet_mdex":
            deployHecoMdexTestnet(deployer, network); break;
        case "polygon_testnet_quickswap":
            deployPolygonQuickSwapTestnet(deployer, network); break;
        case "arbitrum_testnet_sushi":
            deployArbitrumSushiTestnet(deployer, network); break;
    }
};

/* ------------------------------
            Mainnet
------------------------------ */

function deployETHUniswapMainnet(deployer, network) {
    ensureMainnet(network);

    var WETH = weth_eth_mainnet;
    var UniSwapFactory = uniswap_eth_mainnet_factory;
    var polySwapper = poly_swapper_eth_mainnet;
    var polySwapperId = 1;

    deployer.deploy(O3SwapETHUniswapBridge, WETH, UniSwapFactory, polySwapper, polySwapperId);
}

function deployPolygonQuickSwapMainnet(deployer, network) {
    ensureMainnet(network);

    var WMATIC = wmatic_mainnet;
    var quickSwapFactory = quickswap_polygon_mainnet_factory;
    var polySwapper = poly_swapper_polygon_mainnet;
    var polySwapperId = 1;

    deployer.deploy(O3SwapPolygonQuickSwapBridge, WMATIC, quickSwapFactory, polySwapper, polySwapperId);
}

function deployArbitrumSushiMainnet(deployer, network) {
    ensureMainnet(network);

    var WETH = weth_arbitrum_mainnet;
    var sushiFactory = sushi_arbitrum_mainnet_factory;
    var polySwapper = poly_swapper_arbitrum_mainnet;
    var polySwapperId = 1;

    deployer.deploy(O3SwapArbitrumSushiBridge, WETH, sushiFactory, polySwapper, polySwapperId);
}

function deployBSCPancakeMainnet(deployer, network) {
    ensureMainnet(network);
    var WBNB = wbnb_mainnet;
    var pancakeFactory = pancake_bsc_mainnet_factory;
    var polySwapper = poly_swapper_bsc_mainnet;
    var polySwapperId = 1;

    deployer.deploy(O3SwapBSCPancakeBridge, WBNB, pancakeFactory, polySwapper, polySwapperId);
}

function deployHecoMdexMainnet(deployer, network) {
    ensureMainnet(network);

    deployer.deploy(
        O3SwapHecoMdexBridge,
        wht_mainnet,
        mdex_heco_mainnet_factory,
        poly_swapper_heco_mainnet,
        1
    );
}

/* ------------------------------
            Testnet
------------------------------ */

function deployETHUniswapRopsten(deployer, network) {
    ensureNotMainnet(network);

    var WETH = weth_eth_testnet;
    var UniSwapFactory = uniswap_eth_testnet_factory;
    var polySwapper = poly_swapper_eth_ropsten;
    var polySwapperId = 1;

    deployer.deploy(O3SwapETHUniswapBridge, WETH, UniSwapFactory, polySwapper, polySwapperId);
}

function deployPolygonQuickSwapTestnet(deployer, network) {
    ensureNotMainnet(network);

    var WMATIC = wmatic_testnet;
    var quickSwapFactory = quickswap_polygon_testnet_factory;
    var polySwapper = poly_swapper_polygon_testnet;
    var polySwapperId = 1;

    deployer.deploy(O3SwapPolygonQuickSwapBridge, WMATIC, quickSwapFactory, polySwapper, polySwapperId);
}

function deployArbitrumSushiTestnet(deployer, network) {
    ensureNotMainnet(network);

    var WETH = weth_arbitrum_testnet;
    var sushiFactory = sushi_arbitrum_testnet_factory;
    var polySwapper = poly_swapper_arbitrum_testnet;
    var polySwapperId = 1;

    deployer.deploy(O3SwapArbitrumSushiBridge, WETH, sushiFactory, polySwapper, polySwapperId);
}

function deployBSCPancakeTestnet(deployer, network) {
    ensureNotMainnet(network);

    var WBNB = wbnb_testnet;
    var pancakeFactory = pancake_bsc_testnet_factory;
    var polySwapper = poly_swapper_bsc_testnet;
    var polySwapperId = 1;

    deployer.deploy(O3SwapBSCPancakeBridge, WBNB, pancakeFactory, polySwapper, polySwapperId);
}

/* ------------------------------
            Utility
------------------------------ */

function deployHecoMdexTestnet(deployer, network) {
    ensureNotMainnet(network);

    deployer.deploy(
        O3SwapHecoMdexBridge,
        wht_testnet,
        mdex_heco_testnet_factory,
        poly_swapper_heco_testnet,
        1
    );
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
