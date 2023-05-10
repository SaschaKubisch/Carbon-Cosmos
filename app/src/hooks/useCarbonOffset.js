import React, { useState } from 'react';
import axios from 'axios';

function UseCarbonOffset() {
  const [receiverAddress, setReceiverAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [receiverNetwork, setReceiverNetwork] = useState(0);
  const [offsetType, setOffsetType] = useState("transaction");
  const [offsetAmount, setOffsetAmount] = useState(0);
  const [carbonCreditType, setCarbonCreditType] = useState("regen");

  const handleOffsetTransaction = async () => {
    try {
      const response = await axios.post('/api/offset-transaction', {
        receiverAddress,
        amount,
        receiverNetwork,
        offsetType,
        offsetAmount,
        carbonCreditType
      });

      if (response.data.status === "success") {
        // handle success case
        console.log(response.data.message);
      } else {
        // handle error case
        console.log(response.data.message);
      }
    } catch (error) {
      // handle network error
      console.error(error);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Receiver Address"
        onChange={(e) => setReceiverAddress(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="number"
        placeholder="Receiver Network"
        onChange={(e) => setReceiverNetwork(e.target.value)}
      />
      <select
        value={offsetType}
        onChange={(e) => setOffsetType(e.target.value)}
      >
        <option value="transaction">Transaction</option>
        <option value="custom">Custom</option>
      </select>
      {offsetType === "custom" && (
        <input
          type="number"
          placeholder="Offset Amount"
          onChange={(e) => setOffsetAmount(e.target.value)}
        />
      )}
      <select
        value={carbonCreditType}
        onChange={(e) => setCarbonCreditType(e.target.value)}
      >
        <option value="regen">Regen</option>
        {/* Add other types of carbon credits here */}
      </select>
      <button onClick={handleOffsetTransaction}>Offset Transaction</button>
    </div>
  );
}

export default UseCarbonOffset;
