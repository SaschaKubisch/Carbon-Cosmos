import React from 'react';
import useWallet from '../hooks/useWallet';

const ConnectWallet = () => {
  const { wallet, connect, disconnect } = useWallet();

  return (
    <div>
      {!wallet ? (
        <div>
          <h1>Connect Wallet</h1>
          <button onClick={connect}>Connect with Wallet</button>
        </div>
      ) : (
        <div>
          <h1>Connected Wallet</h1>
          <p>Wallet Address: {wallet.address}</p>
          <button onClick={disconnect}>Disconnect Wallet</button>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
