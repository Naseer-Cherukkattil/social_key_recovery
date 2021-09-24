const SimpleStorage = artifacts.require('PubKey2IPFS.sol');

contract('PubKey2IPFS', ()=> {
    it('Should update data', async()=> {
        const storage = await SimpleStorage.new();
        await storage.set("publicKey", "IPFS_Hash");
        const data = await storage.getIPFS_Hash();
        const result = JSON.stringify (data);
        assert(result === '{"0":"publicKey","1":"IPFS_Hash"}');
    });
});