import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container } from '@mui/material';

const dummyData = [
  {
    name: "Laptop",
    category: "Electronics",
    stores: [
      { storeId: "store1", storeName: "Tech World", price: 1000, available: true },
      { storeId: "store2", storeName: "Gadget Store", price: 3000, available: true },
      { storeId: "store3", storeName: "Digital Zone", price: 5000, available: true }
    ]
  }
];

const ProductDetail = () => {
  const { name } = useParams();
  const product = dummyData.find(item => item.name === name);

  return (
    <Container>
      {product ? (
        <>
          <Typography variant="h4">{product.name}</Typography>
          <Typography>Category: {product.category}</Typography>
          <Typography variant="h6">Prices at different stores:</Typography>
          <ul>
            {product.stores.map((store) => (
              <li key={store.storeId}>
                Store: {store.storeName}, Price: ${store.price}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <Typography>Product not found.</Typography>
      )}
    </Container>
  );
};

export default ProductDetail;
