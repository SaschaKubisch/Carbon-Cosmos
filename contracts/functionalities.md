Carbon Offset contract (carbon_offset/src/contract.rs): This contract would handle the carbon offset calculations, credit selection, and transaction management. It would interact with the Carbon Credit Bridge contract to burn the required carbon credits for offsetting.

Carbon Credit Bridge contract (carbon_credit_bridge/src/contract.rs): This contract would manage the wrapping and unwrapping of Regen NCT tokens, bridging them to the carbon credit pool. It should handle the process of burning carbon credits when an offsetting transaction occurs.

NFT Receipt contract (nft_receipt/src/contract.rs): This contract would generate NFT receipts for each offsetting transaction. It should store the carbon offset proof, transaction type, and transaction details within the NFT's metadata.

These three main contracts should interact with each other to facilitate the desired functionality of your DApp. For example, the Carbon Offset contract could call the Carbon Credit Bridge contract to burn the required credits and then call the NFT Receipt contract to generate an NFT receipt.

Remember to implement unit tests for each contract to ensure the correctness and security of your smart contracts. Additionally, you can develop the Carbon Offset API, database system, monitoring and analytics tools, testing and QA processes, deployment infrastructure, version control, and continuous integration, as well as documentation and support, to create a robust and versatile B2B carbon offsetting solution.