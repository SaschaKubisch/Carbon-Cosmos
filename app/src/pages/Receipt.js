import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Receipt() {
  const [receiptData, setReceiptData] = useState(null);
  const { receiptId } = useParams();

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/receipt/${receiptId}`);

        if (response.data) {
          setReceiptData(response.data);
        }
      } catch (error) {
        console.error('Error fetching receipt:', error);
      }
    };

    fetchReceipt();
  }, [receiptId]);

  if (!receiptData) {
    return <p>Loading receipt...</p>;
  }

  return (
    <div>
      <h1>Carbon Offset Receipt</h1>
      <p>Receipt ID: {receiptData.receiptId}</p>
      <p>Transaction ID: {receiptData.transactionId}</p>
      <p>Carbon Offset Proof: {receiptData.carbonOffsetProof}</p>
      <p>Transaction Type: {receiptData.transactionType}</p>
      <h2>Transaction Details</h2>
      <p>Offset Amount: {receiptData.transactionDetails.offsetAmount}</p>
      <p>Carbon Credit Type: {receiptData.transactionDetails.carbonCreditType}</p>
    </div>
  );
}

export default Receipt;
