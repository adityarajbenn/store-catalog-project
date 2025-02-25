import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Select, MenuItem, Typography, Container, Grid, Card, CardContent, Button } from '@mui/material';

const User = () => {
  const [selectedStores, setSelectedStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const stores = selectedStores.length === 0 ? product.stores : product.stores.filter(store => selectedStores.includes(store.storeId));
    return matchesSearch && stores.length > 0;
  }).map(product => {
    const minPrice = Math.min(...product.stores.map(store => store.price));
    const maxPrice = Math.max(...product.stores.map(store => store.price));
    return { ...product, minPrice, maxPrice };
  });

  const handleStoreChange = (event) => {
    const { value } = event.target;
    setSelectedStores(typeof value === 'string' ? value.split(',') : value);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  return (
    <Container>
      {!selectedProduct ? (
        <>
          <Typography variant="h4" gutterBottom>Store Catalog</Typography>
          <Select
            multiple
            value={selectedStores}
            onChange={handleStoreChange}
            displayEmpty
            fullWidth
            renderValue={(selected) => selected.length ? selected.join(', ') : 'All Stores'}
          >
            <MenuItem value="store1">Tech World</MenuItem>
            <MenuItem value="store2">Gadget Store</MenuItem>
            <MenuItem value="store3">Digital Zone</MenuItem>
          </Select>

          <TextField
            fullWidth
            margin="normal"
            label="Search for products..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <ProductList products={filteredProducts} onViewDetails={handleViewDetails} />
        </>
      ) : (
        <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
      )}
    </Container>
  );
};

const ProductList = ({ products, onViewDetails }) => {
  return (
    <Grid container spacing={2}>
      {products.length === 0 ? (
        <Typography variant="h6">No products found.</Typography>
      ) : (
        products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.name}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography>Price: ${product.minPrice} - ${product.maxPrice}</Typography>
                <Button variant="contained" onClick={() => onViewDetails(product)}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

const ProductDetail = ({ product, onBack }) => {
  return (
    <Container>
      <Button variant="contained" onClick={onBack} sx={{ marginBottom: 2 }}>Back</Button>
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
    </Container>
  );
};

export default User;
