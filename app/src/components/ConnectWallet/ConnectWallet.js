import React, { useState } from 'react';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';

const ConnectWallet = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [connected, setConnected] = useState(false);
  const [walletConnect, setWalletConnect] = useState(null);

  const connectWallet = async () => {
    if (!walletConnect) {
      const connector = new WalletConnect({ bridge: 'https://bridge.walletconnect.org' });
      setWalletConnect(connector);

      if (!connector.connected) {
        await connector.createSession();
        QRCodeModal.open(connector.uri, () => {
          console.log('QR Code Modal closed');
        });
      }

      connector.on('connect', (error, payload) => {
        if (error) {
          throw error;
        }

        const { accounts } = payload.params[0];
        setWalletAddress(accounts[0]);
        setConnected(true);

        QRCodeModal.close();
      });
    }
  };

  return (
    <div>
      {!connected ? (
        <div>
          <h1>Connect Wallet</h1>
          <button onClick={connectWallet}>Connect with Trust Wallet</button>
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
