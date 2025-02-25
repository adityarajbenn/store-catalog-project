import React, { useEffect, useState } from 'react';
import axios from '../api/api';
import StoreForm from '../components/StoreForm';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const ManageStores = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    axios.get('/stores')
      .then(res => setStores(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Manage Stores</h2>
      <StoreForm />
      
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {stores?.map(store => (
          <Grid item xs={12} sm={6} md={4} key={store._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{store.name}</Typography>
                <Typography color="textSecondary">{store.location}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ManageStores;
