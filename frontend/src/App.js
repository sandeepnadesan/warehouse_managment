  import React, { useState } from 'react';
  import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
  import HomePage from './components/HomePage';
  import AboutPage from './components/AboutPage';
  import ContactPage from './components/ContactPage';
  import ScanGoods from './components/ScanGoods';
  import ViewGoods from './components/ViewGoods';  // Import ViewGoods component
  import Navbar from './components/Navbar'; // Import Navbar component
  import './App.css';

  function App() {
    const [goodsList, setGoodsList] = useState([]); // State to manage the list of goods

    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/scan-goods" element={<ScanGoods />} />
          <Route path="/view-goods" element={<ViewGoods goodsList={goodsList} />} /> {/* Add route for ViewGoods */}
        </Routes>
      </Router>
    );
  }

  export default App;
