import React, { useState, useEffect } from "react";
import './ViewGoods.css';

const ViewGoods = () => {
  const [goods, setGoods] = useState([]);

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}api/goods`);
        const data = await response.json();
        setGoods(data);
      } catch (error) {
        console.error("Error fetching goods:", error);
      }
    };
    fetchGoods();
  }, []);

  // Parse the JSON string in the name field safely
  const parseGood = (good) => {
    try {
      if (typeof good.name === "string") {
        return JSON.parse(good.name);
      }
      return good.name; // if already an object
    } catch {
      return {}; // fallback empty object if parse fails
    }
  };

  return (
    <div>
      <h2>Available Goods</h2>
      {goods.length === 0 ? (
        <p>No goods available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Expiry Date</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            {goods.map((good) => {
              const parsed = parseGood(good);
              return (
                <tr key={good._id}>
                  <td>{parsed.item || "N/A"}</td>
                  <td>{parsed.quantity || "N/A"}</td>
                  <td>{parsed.expiryDate || "N/A"}</td>
                  <td>{parsed.weight || "N/A"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewGoods;
