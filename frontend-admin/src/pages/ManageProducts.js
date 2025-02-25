import React, { useEffect, useState } from 'react';
import axios from '../api/api';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Manage Products</h2>
      <ProductForm />
      <ProductList products={products} />
    </div>
  );
};

export default ManageProducts;
