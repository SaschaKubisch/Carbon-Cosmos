import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Update to your actual API base URL

const carbonOffsetAPI = {
  offsetTransaction: async (transactionData) => {
    try {
      const response = await axios.post(`${API_URL}/offset-transaction`, transactionData);
      return response.data;
    } catch (error) {
      console.error('Error initiating offset transaction:', error);
      throw error;
    }
  },

  getCarbonCredits: async () => {
    try {
      const response = await axios.get(`${API_URL}/carbon-credits`);
      return response.data;
    } catch (error) {
      console.error('Error fetching carbon credits:', error);
      throw error;
    }
  },

  getTransactions: async (userAddress) => {
    try {
      const response = await axios.get(`${API_URL}/transactions/${userAddress}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  },

  getTransaction: async (transactionId) => {
    try {
      const response = await axios.get(`${API_URL}/transaction/${transactionId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching transaction:', error);
      throw error;
    }
  },

  getReceipt: async (receiptId) => {
    try {
      const response = await axios.get(`${API_URL}/receipt/${receiptId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching receipt:', error);
      throw error;
    }
  },
};

export default carbonOffsetAPI;
