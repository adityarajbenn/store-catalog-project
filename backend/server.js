const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const storeRoutes = require('./routes/storeRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 60000, // Increase connection timeout
  socketTimeoutMS: 60000 // Increase socket timeout
})
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Register routes
app.use('/stores', storeRoutes);
app.use('/products', productRoutes);

// Test API to verify server connectivity
app.get('/health', (req, res) => {
  res.json({ status: 'API is working!' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
