import { useState } from 'react';
import { connectWallet, disconnectWallet } from '../services/walletAPI';

function useWallet() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const connect = async () => {
    setLoading(true);
    try {
      const walletData = await connectWallet();
      setWallet(walletData);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  const disconnect = async () => {
    setLoading(true);
    try {
      await disconnectWallet();
      setWallet(null);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { wallet, loading, error, connect, disconnect };
}

export default useWallet;
