import React, { useState } from "react";


import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const WriteToBlockchain = () => {
  const headingStyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
  };
  const [publicKey, setPublicKey]= useState('');
    const [IPFSHash, setIPFSHash] = useState('');
    const [txHash, setTxHash] = useState("");
    const [loadingTx, setLoadingTx] = useState('');
     
    const URL = `${process.env.REACT_APP_URL}`;

  //Write Button clicked
  const writeBlockchain = async (e) => {
    e.preventDefault();
    setLoadingTx("loading");
  try {
  await fetch(`${URL}write`,{
    method:"POST",
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      public_Key:`${publicKey}`,
      IPFS_Hash:`${IPFSHash}`
    })
  })
  .then(res=>res.json())
  .then(data=>{
      console.log("Tx hash",data.hash)
      setTxHash(`${data.hash}`);

    });
  }catch (err){
    console.log("err",err);
  }
  setLoadingTx("done");
  }

  return (
    <Form.Group>
      <h5 style={headingStyle}> Write Into Blockchain:</h5>
      <Form.Group className="mb-3" controlId="formissuerDID">
        <Form.Control
          value={publicKey}
          onChange={(e) => setPublicKey(e.target.value)}
          placeholder="Public Key"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formschemaID">
        <Form.Control
          value={IPFSHash}
          onChange={(e) => setIPFSHash(e.target.value)}
          placeholder="IPFS Hash"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAssuranceLevel">
        <Button variant="outline-primary" onClick={writeBlockchain}>
          Send
        </Button>{" "}
      </Form.Group>

      <Form.Control
        type="text"
        placeholder="Result: Transaction Hash"
        value={
          loadingTx
            ? loadingTx === "loading"
              ? "Please wait..."
              : `Success! Transation Hash: ${txHash}`
            : null
        }
        readOnly
      />
    </Form.Group>
  );
};

export default WriteToBlockchain;