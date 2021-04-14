const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');

const privateKey = fs.readFileSync('./.private_key', {encoding: 'utf8', flag: 'r' });

// Define networks.
const eth_mainnet_rpc = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
const network_eth_mainnet = {
  provider: () => new HDWalletProvider(privateKey, eth_mainnet_rpc),
  network_id: 1,
  gas: 5500000,
  confirmations: 0,
  timeoutBlocks: 200,
  skipDryRun: false,
  production: true
};

const eth_ropsten_rpc = 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
const network_eth_ropsten = {
    provider: () => new HDWalletProvider(privateKey, eth_ropsten_rpc),
    network_id: 3,
    gas: 5500000,
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
  skipDryRun: false,
  production: true
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

const network_development = {
  host: "127.0.0.1",
  port: 8545,
  network_id: "*",
 };

module.exports = {
  networks: {
    eth_uniswap_mainnet: network_eth_mainnet,
    bsc_pancake_mainnet: network_bsc_mainnet,

    eth_uniswap_ropsten: network_eth_ropsten,
    bsc_pancake_testnet: network_bsc_testnet,

    development: network_development
  },

  mocha: {
    // timeout: 100000
  },

  compilers: {
    solc: {
      version: "0.6.12",
      // settings: {
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },

  db: {
    enabled: false
  }
};
