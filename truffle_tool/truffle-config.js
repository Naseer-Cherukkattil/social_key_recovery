require('dotenv').config()
const path = require("path");
const HDWalletProvider = require('@truffle/hdwallet-provider');

//const privateKeys = ['0x + PRIVATE_KEY];
//const mnemonic = '';

//BSC blockchain
const privateKeys = [`${process.env.PRIVATE_KEY_BSC}`];

//Hyperledger Besu
const privateKey = `${process.env.PRIVATE_KEY_BESUWALLET}`;
const provider = new HDWalletProvider(privateKey, `${process.env.BESUWALLET_API_URL}`);


module.exports = {

  contracts_build_directory: path.join(__dirname, "../backend/contracts"),
  

  networks: {
   
    besuWallet: {
      provider: () => provider,
      network_id: "*",
    },

    // eth: {
    //   provider: () => new HDWalletProvider(
    //     privateKeys, 
    //     'ETH_NODE_URL'
    //   ),
    //   network_id: 1,
    //   skipDryRun: true
    // },
    // ethTestnet: {
    //   provider: () => new HDWalletProvider(
    //     privateKeys,
    //     'ETH_NODE_URL'
    //   ),
    //   network_id: 5,
    //   skipDryRun: true
    // },

    // bsc: {
    //   provider: () => new HDWalletProvider(
    //     privateKeys,
    //     'https://bsc-dataseed.binance.org/'
    //   ),
    //   network_id: 56,
    //   skipDryRun: true
    // },

    bscTestnet: {
      provider: () => new HDWalletProvider (
        privateKeys,
        `${process.env.BSCTST_API_URL}`
      ),
      network_id: 97,
      skipDryRun: true
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
       version: ">=0.4.22 <0.9.0",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },
};
