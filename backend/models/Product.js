const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  stores: [
    {
      storeId: { type: String, required: true },
      storeName: { type: String, required: true },
      price: { type: Number, required: true },
      available: { type: Boolean, default: false }
    }
  ]
});

module.exports = mongoose.model('Product', productSchema);
