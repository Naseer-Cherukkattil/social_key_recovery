import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


const ReadFromBlockchain = () => {
  const headingStyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
  };

  const [publicKey, setPublicKey]= useState('');
  const [IPFSHash, setIPFSHash] = useState('');
  const [loadingRd, setLoadingRd] = useState();
 
  const URL = `${process.env.REACT_APP_URL}`;



    //Read Button Clicked
    const readButton = async (e)=>{
        e.preventDefault();
        setLoadingRd("loading")
      try {
      await fetch(`${URL}read`)
      .then ( res => res.json())
      .then ((res) => {
        JSON.stringify(res)
        console.log(`Public Key: ${res.public_Key} and IPFS Hash: ${res.IPFS_Hash}` )
        setPublicKey(res.public_Key);
        setIPFSHash(res.IPFS_Hash);
        setLoadingRd('done');
      })
      
    }catch (err){
        console.log("err",err);
      }
      
      }

      
  return (
    <Form.Group>
      <h5 style={headingStyle}> Retrieve Public Key and IPFS:</h5>
      <Form.Group className="mb-3" controlId="buttons">
        <Button variant="outline-primary" onClick={readButton}>
          Retreive
        </Button>{" "}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Result: Public Key"
          value={
            loadingRd
              ? loadingRd === "loading"
                ? "Please wait..."
                : `Public Key: ${publicKey}`
              : null
          }
          readOnly
        />
          <Form.Control
          type="text"
          placeholder="Result: IPFS Hash"
          value={
            loadingRd
              ? loadingRd === "loading"
                ? "Please wait..."
                : `IPFS Hash: ${IPFSHash}`
              : null
          }
          readOnly
        />
      </Form.Group>
    </Form.Group>
  );
};

export default ReadFromBlockchain;