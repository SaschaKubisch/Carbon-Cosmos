import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Receipt = ({ match }) => {
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios.get(`/api/transactions/${match.params.transactionId}`);
        setTransaction(response.data);
      } catch (error) {
        console.error('Failed to fetch transaction details:', error);
      }
    };

    fetchTransaction();
  }, [match.params.transactionId]);

  if (!transaction) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Transaction Receipt</h1>
      <h2>Transaction Details</h2>
      <p>Receiver Address: {transaction.receiverAddress}</p>
      <p>Amount: {transaction.amount}</p>
      <p>Offset Type: {transaction.offsetType}</p>

      {/* Add any additional information from the transaction as needed */}

      <h2>User Details</h2>
      <p>User: {transaction.user}</p>

      {/* Add any additional information from the user as needed */}
    </div>
  );
};

export default Receipt;
