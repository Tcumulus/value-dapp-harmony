## Setup:

1. npm install
2. npm start

Make sure to have Metamask installed and the Harmony Testnet added!

### To deploy your own contracts:

1. Add your private key and mnemonic code in the .env.example file and rename it to .env
2. Run: truffle deploy --reset --network testnet
3. Copy the contract address into App.js contractAddress const
4. Copy Storage.json files inside /build/contracts to src/abis

![Demo](/src/images/demo.PNG)
