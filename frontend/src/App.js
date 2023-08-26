import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import MyTokenABI from "./contracts/MyToken.sol/MyToken.json";
import './App.css'; // Import your CSS file for styling

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with the deployed contract address
const contractABI = MyTokenABI.abi;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const myTokenContract = new ethers.Contract(
  contractAddress,
  contractABI,
  provider.getSigner()
);

function App() {
  const [accountAddress, setAccountAddress] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [balance, setBalance] = useState(0);
  const [mintAmount, setMintAmount] = useState("");
  const [burnAmount, setBurnAmount] = useState("");
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);


  async function checkMetaMaskConnection() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        return accounts.length > 0; // Return true if MetaMask is connected
      } catch (error) {
        console.error('Error checking MetaMask connection:', error);
        return false; // Error occurred, assume MetaMask is not connected
      }
    } else {
      return false; // MetaMask is not installed or available
    }
  }
  useEffect(() => {
    async function setup() {
      if (window.ethereum) {
        // Check if MetaMask is connected
        const isConnected = await checkMetaMaskConnection();
        setIsMetaMaskConnected(isConnected);
  
        if (isConnected) {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccountAddress(accounts[0]);
  
          const ownerName = await myTokenContract.getOwnerName();
          setOwnerName(ownerName);
  
          // Fetch the initial balance and set it
          const initialBalance = await myTokenContract.balanceOf(accounts[0]);
          setBalance(initialBalance.toString());
        }
      } else {
        console.error("No Ethereum provider found.");
      }
    }
  
    setup();
  }, []);

  const handleMint = async () => {
    try {
      const tx = await myTokenContract.mint(
        accountAddress,
        ethers.utils.parseUnits(mintAmount, 18)
      );
      await tx.wait();
      const updatedBalance = await myTokenContract.balanceOf(accountAddress);
      setBalance(updatedBalance.toString());
    } catch (error) {
      console.error("Error minting tokens:", error);
    }
  };

  const handleBurn = async () => {
    try {
      const tx = await myTokenContract.burn(
        ethers.utils.parseUnits(burnAmount, 18)
      );
      await tx.wait();
      const updatedBalance = await myTokenContract.balanceOf(accountAddress);
      setBalance(updatedBalance.toString());
    } catch (error) {
      console.error("Error burning tokens:", error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">My Token App</h1>
      {isMetaMaskConnected ? (
        <div className="content">
          <p>Account Address: {accountAddress}</p>
          <p>Owner Name: {ownerName}</p>
          <p>Balance: {balance} Tokens</p>
          <div className="input-container">
            <input
              type="text"
              value={mintAmount}
              onChange={(e) => setMintAmount(e.target.value)}
              placeholder="Enter amount to mint"
            />
            <button className="action-button" onClick={handleMint}>Mint</button>
          </div>
          <div className="input-container">
            <input
              type="text"
              value={burnAmount}
              onChange={(e) => setBurnAmount(e.target.value)}
              placeholder="Enter amount to burn"
            />
            <button className="action-button" onClick={handleBurn}>Burn</button>
          </div>
        </div>
      ) : (
        <p className="not-connected-message">
          MetaMask is not connected. Please connect to use this app.
        </p>
      )}
    </div>
  );
}

export default App;
