const PubKey2IPFS = artifacts.require("PubKey2IPFS.sol");

module.exports = function (deployer) {
  deployer.deploy(PubKey2IPFS);
};
