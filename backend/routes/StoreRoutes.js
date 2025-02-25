// routes/storeRoutes.js
const express = require('express');
const router = express.Router();
const Store = require('../models/Store');

// Get all stores
router.get('/', async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new store
router.post('/', async (req, res) => {
  const { name, location } = req.body;
  try {
    const newStore = new Store({ name, location });
    await newStore.save();
    res.status(201).json(newStore);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a store
router.delete('/:id', async (req, res) => {
  try {
    await Store.findByIdAndDelete(req.params.id);
    res.json({ message: 'Store deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
