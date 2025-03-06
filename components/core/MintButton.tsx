import React from "react";
import abi from "./nft-claim.js"
import { ethers } from "ethers";
import { useState,useEffect } from "react";
import {Alert, Button, Col, Input, Space, Typography} from 'antd';
import Confetti from 'react-confetti';




declare let window: {
    removeEventListener(arg0: string, handleResize: () => void): void | { undefined: never; };
    addEventListener(arg0: string, handleResize: () => void): unknown;
    innerHeight: number;
    innerWidth: number;
    ethereum?: ethers.providers.ExternalProvider;
  };


const MintButton = () => {
    const contractAddress = "0x016b08584FaE58d1273dF425486a826a05cfB6cD";
    const [fetching, setFetching] = useState<boolean>(false);
    const [txHash, setTxHash] = useState<string | null>(null);
    const [error, setError] = useState<string | undefined>(undefined);
    const [nftImage, setNftImage] = useState<string | null>(null);
    const [showConfetti, setShowConfetti] = useState<boolean>(false); 
   

    
    
    const handleMint = async () => {
      // Check if MetaMask is installed
      if (!window.ethereum) {
          alert("Please install MetaMask to mint your NFT!");
          alert("metamask present")
          return;
        }

      setFetching(true);
      setError(undefined);
      setTxHash(null);
      setShowConfetti(false);
      setNftImage(null);

        

      try {
          // Request account access if needed
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send('eth_requestAccounts', []);
          const signer = provider.getSigner();
    
          // Create a new instance of your contract
          const contract = new ethers.Contract(contractAddress, abi, signer);
    
          // Call the mintCertificate function
          const transactionResult = await contract.mint({
              gasLimit: 500000, // Adjust as needed
          });
          alert("Transaction submitted. Waiting for confirmation...");
    
          // Wait for the transaction to be mined
          const receipt = await transactionResult.wait();  
          setTxHash(receipt.transactionHash);
          //alert("NFT Minted Successfully!");        

            // ToFetch the minted NFT metadata
            // Get latest token ID
          const tokenId = await contract.getCurrentTokenId();

          // Fetch the NFT metadata URI
          let tokenURI = await contract.tokenURI(tokenId);

          const ipfsGateway = "https://gateway.pinata.cloud/ipfs/";
          if (tokenURI.startsWith("ipfs://")) {
              tokenURI = tokenURI.replace("ipfs://", ipfsGateway);
          }

          // Fetch the metadata
          const metadataResponse = await fetch(tokenURI);
          const metadata = await metadataResponse.json();

          // Set the image URL
          let imageUrl = metadata.image;
          if (imageUrl.startsWith("ipfs://")) {
              imageUrl = imageUrl.replace("ipfs://", ipfsGateway);
          }
          setNftImage(imageUrl);

            // Trigger confetti on successful mint
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 10000);

    

        } catch (error: any) {
          console.error("Minting failed:", error.reason);
          // console.log(error.reason,"error")
          setError(error.message);
          // alert("Minting failed: " + error.message);
        }
        setFetching(false)
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center",textAlign: "center" }}>
        {showConfetti && <Confetti 
        height={window.innerHeight}
        width={window.innerWidth}
        numberOfPieces={300} 
        recycle={false}
        style={{ position: "absolute", top: 0, left: 0 ,zIndex: 9999}}
        />}
         {nftImage && (
            <img
              src={nftImage}
              alt="Minted NFT"
              style={{ width: "200px", height: "200px", marginBottom: "10px", borderRadius: "10px" }}
            />
          )}
      </div>
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
