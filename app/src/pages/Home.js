import React, { useState } from 'react';
import axios from 'axios';

function Home() {
  const [walletAddress, setWalletAddress] = useState('');
  const [receiverAddress, setReceiverAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [network, setNetwork] = useState(0);
  const [offsetType, setOffsetType] = useState('transaction');
  const [offsetAmount, setOffsetAmount] = useState(0);

  const handleOffset = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/offset', {
        walletAddress,
        receiverAddress,
        amount,
        network,
        offsetType,
        offsetAmount,
      });

      if (response.data.success) {
        alert('Transaction successful! Offset Receipt: ' + response.data.receiptId);
      } else {
        alert('Transaction failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error during offset:', error);
    }
  };

  return (
    <div>
      <h1>Carbon Offset Application</h1>
      <div>
        <label>Wallet Address:</label>
        <input type="text" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} />
      </div>
      <div>
        <label>Receiver Address:</label>
        <input type="text" value={receiverAddress} onChange={(e) => setReceiverAddress(e.target.value)} />
      </div>
      <div>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div>
        <label>Network:</label>
        <input type="number" value={network} onChange={(e) => setNetwork(e.target.value)} />
      </div>
      <div>
        <label>Offset Type:</label>
        <select value={offsetType} onChange={(e) => setOffsetType(e.target.value)}>
          <option value="transaction">Transaction</option>
          <option value="custom">Custom</option>
        </select>
      </div>
      {offsetType === 'custom' && (
        <div>
          <label>Offset Amount:</label>
          <input type="number" value={offsetAmount} onChange={(e) => setOffsetAmount(e.target.value)} />
        </div>
      )}
      <button onClick={handleOffset}>Offset Carbon</button>
    </div>
  );
}

export default Home;
