import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Offset() {
  const [transaction, setTransaction] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchTransaction();
  }, []);

  const fetchTransaction = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/transaction/${id}`);

      if (response.data) {
        setTransaction(response.data);
      } else {
        alert('Failed to fetch transaction');
      }
    } catch (error) {
      console.error('Error fetching transaction:', error);
    }
  };

  return (
    <div>
      <h1>Offset Transaction Details</h1>
      {transaction ? (
        <div>
          <p><strong>Transaction ID:</strong> {transaction.transactionId}</p>
          <p><strong>Receiver Address:</strong> {transaction.receiverAddress}</p>
          <p><strong>Amount:</strong> {transaction.amount}</p>
          <p><strong>Receiver Network:</strong> {transaction.receiverNetwork}</p>
          <p><strong>Offset Type:</strong> {transaction.offsetType}</p>
          <p><strong>Offset Amount:</strong> {transaction.offsetAmount}</p>
          <p><strong>Carbon Credit Type:</strong> {transaction.carbonCreditType}</p>
          <p><strong>Timestamp:</strong> {new Date(transaction.timestamp).toLocaleString()}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Offset
