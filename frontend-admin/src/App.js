import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import ManageStores from './pages/ManageStores';
import ManageProducts from './pages/ManageProducts';
import User from './pages/User';
import ProductDetail from './components/ProductDetail';

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Admin Panel</Typography>
          <Button color="inherit" component={Link} to="/stores">Manage Stores</Button>
          <Button color="inherit" component={Link} to="/products">Manage Products</Button>
          <Button color="inherit" component={Link} to="/user">User Section</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/stores" replace />} />
          <Route path="/stores" element={<ManageStores />} />
          <Route path="/products" element={<ManageProducts />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/:name" element={<ProductDetail />} /> 
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
