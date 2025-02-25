const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const { ObjectId } = mongoose.Types;


// Get products by storeId with regex search and filters
router.get('/store/:storeId', async (req, res) => {
    try {
      const { storeId } = req.params;
      const { search, category, minPrice, maxPrice } = req.query;
  
      let query = {
        'stores.storeId': ObjectId(storeId), // Cast storeId correctly
        'stores.available': true
      };
  
      if (search) {
        query = {
          ...query,
          name: { $regex: search, $options: 'i' }
        };
      }
  
      if (category) {
        query.category = category;
      }
  
      if (minPrice || maxPrice) {
        query.price = {
          ...(minPrice ? { $gte: Number(minPrice) } : {}),
          ...(maxPrice ? { $lte: Number(maxPrice) } : {})
        };
      }
  
      const products = await Product.find(query);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// ✅ GET: Fetch all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

router.post('/', async (req, res) => {
    const { name, category, storeId, storeName, price, available } = req.body;
  
    try {
      // Check if the product with the same name already exists
      const existingProduct = await Product.findOne({ name });
  
      if (existingProduct) {
        // If the product exists, check if the store already exists in the product
        const storeExists = existingProduct.stores.some(store => store.storeId === storeId);
  
        if (storeExists) {
          return res.status(400).json({ message: 'Store already exists for this product.' });
        }
  
        // Add the new store with price details to the existing product
        existingProduct.stores.push({ storeId, storeName, price, available });
        await existingProduct.save();
        return res.status(200).json({ message: 'Store added to existing product', product: existingProduct });
      } else {
        // If the product doesn't exist, create a new product
        const newProduct = new Product({
          name,
          category,
          stores: [{ storeId, storeName, price, available }]
        });
        await newProduct.save();
        return res.status(201).json({ message: 'New product created', product: newProduct });
      }
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ message: 'Error adding product', error: error.message });
    }
  });

// Compare products across stores  
  router.get('/compare/:itemName', async (req, res) => {
    try {
      const { itemName } = req.params;
      const results = await Product.find({ name: itemName });
      const comparisons = results.map(result => ({
        name: result.name,
        price: result.price,
        store: result.stores.map(store => ({
          storeId: store.storeId,
          available: store.available
        }))
      }));
  
      res.json(comparisons);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Search for products by keyword in name or description
  router.get('/search/:keyword', async (req, res) => {
    try {
      const { keyword } = req.params;
  
      const products = await Product.find({
        $or: [
          { name: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } }
        ]
      });
  
      res.json(products);
    } catch (error) {
      console.error('Search error:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Filter products by category and price range
  router.get('/filter', async (req, res) => {
    try {
      const { category, minPrice, maxPrice } = req.query;
      const filterCriteria = {};
  
      if (category) filterCriteria['category'] = category;
      if (minPrice) filterCriteria['price'] = { $gte: parseFloat(minPrice) };
      if (maxPrice) {
        if (!filterCriteria['price']) {
          filterCriteria['price'] = { $lte: parseFloat(maxPrice) };
        } else {
          filterCriteria['price'].$lte = parseFloat(maxPrice);
        }
      }
  
      const products = await Product.find(filterCriteria);
      res.json(products);
    } catch (error) {
      console.error('Filter error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  router.delete('/deleteAll', async (req, res) => {
    try {
      await Product.deleteMany({});
      res.json({ message: 'All products deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting products', error: error.message });
    }
  });


module.exports = router;
