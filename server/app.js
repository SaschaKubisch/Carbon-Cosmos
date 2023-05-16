// Import necessary packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./db/index');

// Import routes
const userRoutes = require('./api/routes/userRoutes');
const transactionRoutes = require('./api/routes/transactionRoutes');

// Initialize Express application
const app = express();

// Middleware setup
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan('combined'));

// Routes setup
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

// Error handling middleware
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Connect to the database and start the server
db.sequelize.sync().then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});
