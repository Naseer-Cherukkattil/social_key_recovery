require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { ethers, Contract } = require("ethers");
const PubKey_IPFS = require("./contracts/PubKey2IPFS.json");

//Network config details for Binance Smart Chain
const privateKeys = [`${process.env.PRIVATE_KEY_B}`];
const bscTest_url = `${process.env.BSCTEST_URL_B}`;
const networkID = process.env.NETWORK_ID_B;

//Network config for Hyperledger Besu
const privateKey = [`${process.env.PRIVATE_KEY}`];
const besuUrl = `${process.env.BESU_URL}`;

// Build connection to Blockchain from Backend
const getBlockchain = async () => 
    new Promise( async (resolve, reject) => {
        // let provider = await new HDWalletProvider (
        //     privateKeys,
        //     bscTest_url
        //   );
          let provider = await new HDWalletProvider (
            privateKey,
            besuUrl
          );

        if(provider) {
            provider = new ethers.providers.Web3Provider(provider);
            const signer = await provider.getSigner();
            const { chainId } = await provider.getNetwork()
            const simpleMapping = new Contract(
                PubKey_IPFS.networks[chainId].address,
                PubKey_IPFS.abi,
                signer
            );
            
            resolve({simpleMapping});
            return;
        }
        reject('No Wallet Connection');
    });

module.exports = getBlockchain;
