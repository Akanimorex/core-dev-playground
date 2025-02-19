import React from "react";
import abi from "./nft-claim.js"
import { ethers } from "ethers";
import { useState,useEffect } from "react";
import {Alert, Button, Col, Input, Space, Typography} from 'antd';


declare let window: {
    ethereum: ethers.providers.ExternalProvider;
  };

const MintButton = () => {
    const contractAddress = "0x72d321681d588AA0d44354D860A7E6f960F722E5";
    const [fetching, setFetching] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

    
    
    
    const handleMint = async () => {

     // Replace with actual minting logic

        
    // Check if MetaMask is installed
    if (!window.ethereum) {
        alert("Please install MetaMask to mint your NFT!");
        alert("metamask present")
        return;
        }
        setFetching(true);
        setError(undefined);
        setTxHash(null);

        try {
            // Request account access if needed
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            const signer = provider.getSigner();
      
            // Create a new instance of your contract
            const contract = new ethers.Contract(contractAddress, abi, signer);
      
            // Call the mintCertificate function
            const transactionResult = await contract.mintCertificate({
                gasLimit: 500000, // Adjust as needed
            });
            alert("Transaction submitted. Waiting for confirmation...");
      
            // Wait for the transaction to be mined
           const receipt = await transactionResult.wait();  
           setTxHash(receipt.transactionHash);
        //    alert("NFT Minted Successfully!");        


          } catch (error: any) {
            console.error("Minting failed:", error);
            setError(error.message);
            // alert("Minting failed: " + error.message);
          }
          setFetching(false)
    //mintCertificate is the function in the abi
  };

  return (
    <div>
        <Button
        onClick={handleMint}
        loading={fetching}
        disabled={fetching}
        style={{
            padding: "0px 15px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
        }}
        >
        Mint NFT
        </Button>
        {txHash && (
        <Alert
          style={{ marginTop: "1rem" }}
          message="Transaction Successful"
          description={`Transaction Hash: ${txHash}`}
          type="success"
          showIcon
        />
      )}
      {error && (
        <Alert
          style={{ marginTop: "1rem" }}
          message="Error"
          description={error}
          type="error"
          showIcon
        />
      )}
    </div>
  );
};

export default MintButton;
