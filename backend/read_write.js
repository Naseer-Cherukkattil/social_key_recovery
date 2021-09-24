const express = require('express');
const router = express.Router();
const getBlockchain = require('./blockchain.js');

//middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    next()
})

//define the home page route
router.get('/', (req,res) => {
    res.send("Welcome to social key recovery set up");
})

// Writing into Distrubted Ledger (Blockchain)
router.post('/write', async function (req, res) {
    const { public_Key, IPFS_Hash } = req.body;
    console.log(req.body);
    let receipt = {};  
    try {
        console.log(public_Key);
        console.log(IPFS_Hash);
        const {simpleMapping}= await getBlockchain();
       
        receipt = await simpleMapping.set(public_Key,IPFS_Hash);
    } catch (err){
        console.log('err', err);
    }
    res.json(receipt);
})

//Reading from Distributed Ledger(Blockchain)
router.get('/read', async function (req, res) {
     let result;
    try {
        const {simpleMapping}= await getBlockchain();
        result = await simpleMapping.getIPFS_Hash();
    } catch (err){
        console.log(err);
    }
    res.json({
        "public_Key": `${result[0]}`,
       "IPFS_Hash": `${result[1]}`
    })
})

//handling error 404
router.use (function(req, res, next) {
    res.send("404: Page not found, please check the URL")
    next();
})

module.exports = router;