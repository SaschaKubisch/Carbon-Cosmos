import React, { useState } from 'react';

const TransactionDetails = () => {
  const [receiverAddress, setReceiverAddress] = useState('');
  const [amount, setAmount] = useState('');

  const handleReceiverAddressChange = (e) => {
    setReceiverAddress(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle the form submission here
    console.log('Transaction details submitted:', receiverAddress, amount);
  };

  return (
    <div>
      <h1>Transaction Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Receiver Address:</label>
          <input type="text" value={receiverAddress} onChange={handleReceiverAddressChange} />
        </div>
        <div>
          <label>Amount:</label>
          <input type="number" value={amount} onChange={handleAmountChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TransactionDetails;
