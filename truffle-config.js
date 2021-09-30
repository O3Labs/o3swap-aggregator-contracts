const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');

const privateKey = fs.readFileSync('./.private_key', {encoding: 'utf8', flag: 'r' });

// Define networks.
const eth_mainnet_rpc = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
const network_eth_mainnet = {
  provider: () => new HDWalletProvider(privateKey, eth_mainnet_rpc),
  network_id: 1,
  gas: 5500000,
  gasPrice: 75000000000, // 75 Gwei
  confirmations: 0,
  timeoutBlocks: 200,
  skipDryRun: false
};

const eth_ropsten_rpc = 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
const network_eth_ropsten = {
    provider: () => new HDWalletProvider(privateKey, eth_ropsten_rpc),
    network_id: 3,
    gas: 550000,
    gasPrice: 40000000000, // 40 Gwei
    confirmations: 0,
    timeoutBlocks: 200,
    skipDryRun: false
};

const bsc_mainnet_rpc = 'https://bsc-dataseed1.binance.org';
const network_bsc_mainnet = {
  provider: () => new HDWalletProvider(privateKey, bsc_mainnet_rpc),
  network_id: 56,
  gas: 5500000,
  confirmations: 0,
  timeoutBlocks: 200,
  skipDryRun: false
};

const bsc_testnet_rpc = 'https://data-seed-prebsc-1-s1.binance.org:8545';
const network_bsc_testnet = {
  provider: () => new HDWalletProvider(privateKey, bsc_testnet_rpc),
  network_id: 97,
  gas: 5500000,
  confirmations: 0,
  timeoutBlocks: 200,
  skipDryRun: false
};

const heco_mainnet_rpc = 'https://http-mainnet.hecochain.com';
const network_heco_mainnet = {
  provider: () => new HDWalletProvider(privateKey, heco_mainnet_rpc),
  network_id: 128,
  gas: 5500000,
  confirmations: 0,
  timeoutBlocks: 200,
  skipDryRun: false
};

const heco_testnet_rpc = 'https://http-testnet.hecochain.com';
const network_heco_testnet = {
  provider: () => new HDWalletProvider(privateKey, heco_testnet_rpc),
  network_id: 256,
  gas: 5500000,
  confirmations: 1,
  timeoutBlocks: 200,
  skipDryRun: false
};

const polygon_mainnet_rpc = 'https://rpc-mainnet.maticvigil.com';
const network_polygon_mainnet = {
  provider: () => new HDWalletProvider(privateKey, polygon_mainnet_rpc),
  network_id: 137,
  gas: 550 * 10000,
  gasPrice: 3 * 10**9,
  confirmations: 0,
  timeoutBlocks: 200,
  skipDryRun: false
};

const polygon_testnet_rpc = 'https://rpc-mumbai.maticvigil.com';
const network_polygon_testnet = {
  provider: () => new HDWalletProvider(privateKey, polygon_testnet_rpc),
  network_id: 80001,
  gas: 550 * 10000,
  gasPrice: 30 * 10**9,
  confirmations: 2,
  timeoutBlocks: 200,
  skipDryRun: false
};

const arbitrum_mainnet_rpc = 'https://arb1.arbitrum.io/rpc';
const network_arbitrum_mainnet = {
  provider: () => new HDWalletProvider(privateKey, arbitrum_mainnet_rpc),
  network_id: 42161,
  gas: 12000*10000,
  gasPrice: 2 * 10**9,
  confirmations: 0,
  timeoutBlocks: 200,
  skipDryRun: false
};

const arbitrum_testnet_rpc = 'https://rinkeby.arbitrum.io/rpc';
const network_arbitrum_testnet = {
  provider: () => new HDWalletProvider(privateKey, arbitrum_testnet_rpc),
  network_id: 421611,
  gas: 12000*10000,
  gasPrice: 2 * 10**9,
  confirmations: 0,
  timeoutBlocks: 200,
  skipDryRun: false
};

const network_development = {
  host: "127.0.0.1",
  port: 8545,
  network_id: "*",
};

module.exports = {
  networks: {
    eth_mainnet_uniswap: network_eth_mainnet,
    bsc_mainnet_pancake: network_bsc_mainnet,
    heco_mainnet_mdex: network_heco_mainnet,
    polygon_mainnet_quickswap: network_polygon_mainnet,
    arbitrum_mainnet_sushi: network_arbitrum_mainnet,

    eth_ropsten_uniswap: network_eth_ropsten,
    bsc_testnet_pancake: network_bsc_testnet,
    heco_testnet_mdex: network_heco_testnet,
    polygon_testnet_quickswap: network_polygon_testnet,
    arbitrum_testnet_sushi: network_arbitrum_testnet,

    development: network_development
  },

  api_keys: {
    etherscan: 'MY_API_KEY',
    bscscan: 'MY_API_KEY',
    hecoinfo: 'MY_API_KEY',
    ftmscan: 'MY_API_KEY',
    polygonscan: 'MY_API_KEY',
    arbiscan: 'MY_API_KEY',
  },

  mocha: {
    // timeout: 100000
  },

  compilers: {
    solc: {
      version: "0.6.12",
      settings: {
       optimizer: {
         enabled: true,
         runs: 200
       },
       evmVersion: "istanbul"
      }
    }
  },

  db: {
    enabled: false
  }
};
