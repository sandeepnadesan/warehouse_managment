import React, { useState, useEffect } from "react";

const ViewGoods = () => {
  const [goods, setGoods] = useState([]);
  
  // Fetch goods from the backend API
  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}api/goods`);
        const data = await response.json();
        console.log("Fetched Goods: ", data);
        setGoods(data);
      } catch (error) {
        console.error("Error fetching goods:", error);
      }
    };
    fetchGoods();
  }, []);

  // Parse the JSON string in the name field and return the properties to display
  const parseGoodsData = (goodsData) => {
    try {
      console.log("Raw goodsData.name: ", goodsData.name);  // Log the raw data
      const parsedData = JSON.parse(goodsData.name);  // Attempt to parse the data
      return parsedData;
    } catch (error) {
      console.error("Error parsing goods data: ", error.message);
      return {};  // Return an empty object if parsing fails
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
              const parsedGood = parseGoodsData(good);
              return (
                <tr key={good._id}>
                  <td>{parsedGood.item}</td>
                  <td>{parsedGood.quantity}</td>
                  <td>{parsedGood.expiryDate}</td>
                  <td>{parsedGood.weight}</td>
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
