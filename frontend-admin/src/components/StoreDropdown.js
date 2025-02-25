import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StoreDropdown = ({ selectedStores, setSelectedStores }) => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/stores`)
      .then(res => setStores(res.data))
      .catch(err => console.error('Error fetching stores:', err));
  }, []);

  const handleStoreChange = (event) => {
    const { value, checked } = event.target;
    if (value === 'All') {
      setSelectedStores(checked ? stores.map(store => store._id) : []);
    } else {
      setSelectedStores(prev =>
        checked ? [...prev, value] : prev.filter(id => id !== value)
      );
    }
  };

  return (
    <div>
      <h3>Select Stores</h3>
      <label>
        <input type="checkbox" value="All" onChange={handleStoreChange} />
        All Stores
      </label>
      {stores?.map(store => (
        <label key={store._id}>
          <input type="checkbox" value={store._id} onChange={handleStoreChange} />
          {store.name}
        </label>
      ))}
    </div>
  );
};

export default StoreDropdown;
