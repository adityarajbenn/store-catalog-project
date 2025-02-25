import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from '../api/api';

const StoreForm = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/stores', { name, location });
    window.location.reload();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px' }}>
      <TextField label="Store Name" value={name} onChange={(e) => setName(e.target.value)} required fullWidth />
      <TextField label="Location" value={location} onChange={(e) => setLocation(e.target.value)} required fullWidth />
      <Button type="submit" variant="contained" color="primary">Add Store</Button>
    </Box>
  );
};

export default StoreForm;
