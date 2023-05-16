Carbon-Cosmos/
├── client/ 
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── App.js
│   │   │   ├── OffsetTransactionForm.js
│   │   │   ├── CarbonCreditsList.js
│   │   │   └── UserTransactions.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── package-lock.json
├── server/
│   ├── api/
│   │   ├── routes/
│   │   │   ├── transactionRoutes.js
│   │   │   └── userRoutes.js
│   │   ├── controllers/
│   │   │   ├── transactionController.js
│   │   │   └── userController.js
│   │   └── middleware/
│   │       ├── auth.js
│   │       └── error.js
│   ├── blockchain/
│   │   ├── carbonCreditContract.js
│   │   ├── transactionContract.js
│   │   └── receiptContract.js
│   ├── db/
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Analytics.js
│   │   ├── index.js
│   │   └── sequelize.js
│   ├── services/
│   │   ├── transactionService.js
│   │   └── userService.js
│   ├── utils/
│   │   └── helpers.js
│   ├── app.js
│   ├── package.json
│   └── package-lock.json
├── tests/
│   ├── transaction.test.js
│   └── user.test.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
