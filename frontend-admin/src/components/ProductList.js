import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const ProductList = ({ products }) => {
  return (
    <Grid container spacing={2} sx={{ marginTop: 2 }}>
      {products?.map(product => (
        <Grid item xs={12} sm={6} md={4} key={product._id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography color="textSecondary">{product.category}</Typography>

              {/* Display Store Names and Prices */}
              {product.stores?.length > 0 && (
                <Typography variant="body2">
                  {product.stores.map(store => ` ${store.storeName}: ₹${store.price}`).join(' | ')}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
