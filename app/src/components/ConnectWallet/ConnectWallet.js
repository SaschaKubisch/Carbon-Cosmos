import React, { useState } from 'react';

const ConnectWallet = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [connected, setConnected] = useState(false);

  const connectWallet = () => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.enable()
        .then((accounts) => {
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setConnected(true);
          } else {
            alert('No accounts found. Please create an account first.');
          }
        })
        .catch((error) => {
          console.error('Failed to connect wallet:', error);
        });
    } else {
      alert('Wallet connection is not supported on this device/browser. Please use a compatible browser with wallet support.');
    }
  };

  return (
    <div>
      {!connected ? (
        <div>
          <h1>Connect Wallet</h1>
          <button onClick={connectWallet}>Connect with Wallet</button>
        </div>
      ) : (
        <div>
          <h1>Connected Wallet</h1>
          <p>Wallet Address: {walletAddress}</p>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
