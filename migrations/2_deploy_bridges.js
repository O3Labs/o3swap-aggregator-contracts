const O3SwapETHUniswapBridge = artifacts.require("O3SwapETHUniswapBridge");
const O3SwapBSCPancakeBridge = artifacts.require("O3SwapBSCPancakeBridge");
const O3SwapHecoMdexBridge = artifacts.require("O3SwapHecoMdexBridge");


const weth_mainnet = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const weth_testnet = "0xc778417E063141139Fce010982780140Aa0cD5Ab";

const wbnb_mainnet = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
const wbnb_testnet = "0x094616f0bdfb0b526bd735bf66eca0ad254ca81f";

const wht_mainnet = "0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f";
const wht_testnet = "0x7af326b6351c8a9b8fb8cd205cbe11d4ac5fa836";

const poly_swapper_eth_mainnet = "0x02e20ca05e38cbdf1a6235a7acdd34efc0434caa";
const poly_swapper_eth_ropsten = "0x8Baa27e659F55249bb36113346980BFFABC53AeF";

const poly_swapper_bsc_mainnet = "0x3ec481143d688442E581aD7116Bf1ECC76669cfa";
const poly_swapper_bsc_testnet = "0x51FfD5196e3945c4CE25101eEB7f4062b97B9A1A";

const poly_swapper_heco_mainnet = "0x70f4d1176f9276ab4B31658f58F7473858F2b550";
const poly_swapper_heco_testnet = "0x0488ADd7e3D4C58acb8DF7c487dAfC48e3224833";


const uniswap_eth_mainnet_factory = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
const uniswap_eth_testnet_factory = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
const pancake_bsc_mainnet_factory = "0xBCfCcbde45cE874adCB698cC183deBcF17952812";
const pancake_bsc_testnet_factory = "0xd417A0A4b65D24f5eBD0898d9028D92E3592afCC";
const mdex_heco_mainnet_factory = "0xb0b670fc1F7724119963018DB0BfA86aDb22d941";
const mdex_heco_testnet_factory = "0x42bF55Dfd95bbA679F2B0230A526ff407fd0498C";

module.exports = function (deployer, network, accounts) {
    switch (network) {
        // Mainnet
        case "eth_mainnet_uniswap":
            deployETHUniswapMainnet(deployer, network); break;
        case "bsc_mainnet_pancake":
            deployBSCPancakeMainnet(deployer, network); break;
        case "heco_mainnet_mdex":
            deployHecoMdexMainnet(deployer, network); break;
        // Testnet
        case "eth_ropsten_uniswap":
            deployETHUniswapRopsten(deployer, network); break;
        case "bsc_testnet_pancake":
            deployBSCPancakeTestnet(deployer, network); break;
        case "heco_testnet_mdex":
            deployHecoMdexTestnet(deployer, network); break;
    }
};

/* ------------------------------
            Mainnet
------------------------------ */

function deployETHUniswapMainnet(deployer, network) {
    ensureMainnet(network);

    var WETH = weth_mainnet;
    var UniSwapFactory = uniswap_eth_mainnet_factory;
    var polySwapper = poly_swapper_eth_mainnet;
    var polySwapperId = 1;

    deployer.deploy(O3SwapETHUniswapBridge, WETH, UniSwapFactory, polySwapper, polySwapperId);
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

    var WETH = weth_testnet;
    var UniSwapFactory = uniswap_eth_testnet_factory;
    var polySwapper = poly_swapper_eth_ropsten;
    var polySwapperId = 1;

    deployer.deploy(O3SwapETHUniswapBridge, WETH, UniSwapFactory, polySwapper, polySwapperId);
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
