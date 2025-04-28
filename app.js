const express = require('express') // Import express for creating the server
const mongoose = require('mongoose') // Import Mongoose for MongoDB connection
const cors = require('cors') // Import CORS for cross-origin resource sharing
const Transaction = require('./model') // Import the Transaction model
const app = express() // Create an instance of express

app.use(express.json()) // Parse JSON bodies
app.use(cors({origin: '*'})) // Allow all origins

// MongoDB Connection

mongoose
  .connect(
    'mongodb+srv://user2000:GFmdH0dv1YSt5EwM@cluster0.fv2hjsb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  )
  .then(() => console.log('MongoDB Connected Successfully 🎉'))
  .catch(err => console.error('MongoDB Connection Failed ❌', err))


  // Routes

// POST ➔ Create a new Transaction
app.post('/transactions', async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET ➔ Fetch all Transactions
app.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET BY ID ➔ Fetch a Transaction by ID
app.get('/transactions/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT ➔ Update a Transaction by ID
app.put('/transactions/:id', async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE ➔ Delete a Transaction by ID
app.delete('/transactions/:id', async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Server

app.listen(3000, () => {
  console.log('Server is running in http://localhost:3000/')
})

module.exports = app
