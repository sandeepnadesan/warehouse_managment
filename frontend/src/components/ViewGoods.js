import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './ViewGoods.css';
import Chart from 'chart.js/auto';

function ViewGoods() {
  const [goodsList, setGoodsList] = useState([]);
  const [error, setError] = useState(null);
  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);
  const barChartInstance = useRef(null);
  const lineChartInstance = useRef(null);

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

  useEffect(() => {
    if (goodsList.length > 0) {
      // Group data by name (for bar chart)
      const groupedByName = goodsList.reduce((acc, curr) => {
        acc[curr.name] = (acc[curr.name] || 0) + curr.stockAmount;
        return acc;
      }, {});
      const names = Object.keys(groupedByName);
      const stockAmounts = Object.values(groupedByName);

      // Create or update Bar Chart
      if (barChartInstance.current) barChartInstance.current.destroy();
      barChartInstance.current = new Chart(barChartRef.current, {
        type: 'bar',
        data: {
          labels: names,
          datasets: [{
            label: 'Stock by Type',
            data: stockAmounts,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Stock by Type'
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      // Group data by date (for line chart)
      const groupedByDate = goodsList.reduce((acc, curr) => {
        const date = new Date(curr.expiryDate).toLocaleDateString();
        acc[date] = (acc[date] || 0) + curr.stockAmount;
        return acc;
      }, {});
      const dates = Object.keys(groupedByDate);
      const dateStocks = Object.values(groupedByDate);

      // Create or update Line Chart
      if (lineChartInstance.current) lineChartInstance.current.destroy();
      lineChartInstance.current = new Chart(lineChartRef.current, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            label: 'Stock Over Time (by Expiry Date)',
            data: dateStocks,
            fill: false,
            borderColor: 'rgba(255, 99, 132, 1)',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Stock Over Time'
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [goodsList]);

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

      <div style={{ marginTop: '40px' }}>
        <canvas ref={barChartRef}></canvas>
      </div>
      <div style={{ marginTop: '40px' }}>
        <canvas ref={lineChartRef}></canvas>
      </div>
    </div>
  );
}

export default ViewGoods;
