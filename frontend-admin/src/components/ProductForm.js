import React, { useState, useEffect } from 'react';
import axios from '../api/api';

const ProductForm = ({ onProductAdded }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState({});
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    axios.get('/stores')
      .then(res => setStores(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !category || !price || !selectedStore.storeId || !selectedStore.storeName) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/products`, {
          name,
          category,
          storeId: selectedStore.storeId,
          storeName: selectedStore.storeName,
          price: price,
          available: available
        });

      console.log('Product added:', response.data);
      alert('Product successfully added!');
      
      // Reset form
      setName('');
      setCategory('');
      setPrice('');
      setSelectedStore({});
      setAvailable(false);

      // Call the parent function to update the product list
      onProductAdded();
      
    } catch (error) {
      console.error('Error adding product:', error.response?.data || error.message);
      alert('Failed to add product. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      
      <select onChange={(e) => {
        const selectedIndex = e.target.selectedIndex;
        const selectedName = e.target.options[selectedIndex].text;
        setSelectedStore({ storeId: e.target.value, storeName: selectedName });
      }}>
        <option value="">Select Store</option>
        {stores?.map(store => (
          <option key={store._id} value={store._id}>{store.name}</option>
        ))}
      </select>
      
      <label>
        <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} />
        Available for Delivery
      </label>
      
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
