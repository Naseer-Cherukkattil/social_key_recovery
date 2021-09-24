// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract PubKey2IPFS {
    
    struct pubKey_IPFS {
        string pubKey;
        string ipfsHash;
    }
    
    //Map Public Key -> IPFS Hash -> For social recovery purpose
    mapping ( address => pubKey_IPFS) public ipfsHash;
   
    //Write public key and hash into the ledger
    function set(string memory publicKey, string memory ipfs_Hash) public {
         ipfsHash[msg.sender].pubKey = publicKey;
         ipfsHash[msg.sender].ipfsHash = ipfs_Hash;
    }

    
    //Read Public key and Hash
            function getIPFS_Hash() public view returns (string memory, string memory) {
                string memory _publicKey = ipfsHash[msg.sender].pubKey;
                string memory _ipfsHash = ipfsHash[msg.sender].ipfsHash;
        return (_publicKey, _ipfsHash);
    }

}   
