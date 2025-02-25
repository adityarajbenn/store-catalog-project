import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductLists = ({ selectedStores }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (selectedStores.length > 0) {
      axios.get(`http://localhost:5000/products?storeIds=${selectedStores.join(',')}`)
        .then(res => setProducts(res.data))
        .catch(err => console.error('Error fetching products:', err));
    }
  }, [selectedStores]);

  return (
    <div>
      <h3>Products</h3>
      {products?.map(product => (
        <div key={product._id}>
          <p>{product.name}</p>
          <p>Price: {product.price}</p>
          <a href={`/product/${product._id}`}>View Details</a>
        </div>
      ))}
    </div>
  );
};

export default ProductLists;
