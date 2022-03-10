const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
const apiKey = fs.readFileSync(".apiKey").toString();
const infura = fs.readFileSync(".infura").toString();


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },

    mumbai: {
      provider: () => new HDWalletProvider(mnemonic, `wss://polygon-mumbai.infura.io/ws/v3/${infura}`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      pollingInterval: 30000,
      networkCheckTimeout: 100000,
      skipDryRun: true
    }
  },

  plugins: ['truffle-plugin-verify'],

  api_keys: {
    polygonscan: apiKey
  },

  compilers: {
    solc: {
      version: "0.8.12",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};