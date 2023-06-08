import React, { useState } from 'react';

const OffsetTypes = () => {
  const [selectedOffsetType, setSelectedOffsetType] = useState('');

  const handleOffsetTypeChange = (e) => {
    setSelectedOffsetType(e.target.value);
  };

  return (
    <div>
      <h1>Offset Types</h1>
      <div>
        <label>
          <input
            type="radio"
            value="transaction"
            checked={selectedOffsetType === 'transaction'}
            onChange={handleOffsetTypeChange}
          />
          Transaction
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="custom"
            checked={selectedOffsetType === 'custom'}
            onChange={handleOffsetTypeChange}
          />
          Custom
        </label>
      </div>
      {selectedOffsetType === 'custom' && (
        <div>
          <label>Offset Amount:</label>
          <input type="number" />
        </div>
      )}
    </div>
  );
};

export default OffsetTypes;
