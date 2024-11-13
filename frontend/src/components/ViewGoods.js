import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewGoods.css';

function ViewGoods() {
  const [goodsList, setGoodsList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const response = await axios.get('https://warehouse-managment-4lzo.onrender.com/api/goods');
        setGoodsList(response.data);
      } catch (err) {
        console.error('Error fetching goods:', err);
        setError('Failed to fetch goods');
      }
    };
    fetchGoods();
  }, []);

  return (
    <div className="view-goods-container">
      <h2>Available Goods</h2>
      {error && <p className="error-message">{error}</p>}
      <table className="goods-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Weight</th>
            <th>Expiry Date</th>
            <th>Stock Amount</th>
          </tr>
        </thead>
        <tbody>
          {goodsList.map(good => (
            <tr key={good._id}>
              <td>{good.name}</td>
              <td>{good.weight}</td>
              <td>{new Date(good.expiryDate).toLocaleDateString()}</td>
              <td>{good.stockAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewGoods;
