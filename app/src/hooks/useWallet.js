import { useState, useEffect } from 'react';
import Web3 from 'web3';
import axios from 'axios';

const useWallet = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      try {
        const accounts = await window.ethereum.enable();
        setAccounts(accounts);
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("Ethereum browser extension is not installed");
    }
  };

  const sendFunds = async (receiverAddress, amount, receiverNetwork, offsetType, offsetAmount) => {
    setLoading(true);
    try {
      const transactionData = {
        receiverAddress,
        amount,
        receiverNetwork,
        offsetType,
        offsetAmount,
      };
      const response = await axios.post('https://carbon-offset-api.com/offset-transaction', transactionData);
      return response.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      const fetchTransactions = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`https://carbon-offset-api.com/transactions/${accounts[0]}`);
          setTransactions(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchTransactions();
    }
  }, [accounts]);

  return { connectWallet, sendFunds, transactions, loading, error };
};

export default useWallet;
