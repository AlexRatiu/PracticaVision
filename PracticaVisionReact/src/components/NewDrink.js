import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddDrink() {
    const containerStyle = {
        padding: '20px',
        maxWidth: '40vw',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      };
    
      const formGroupStyle = {
        marginBottom: '15px',
      };
    
      const labelStyle = {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#333',
      };
    
      const inputStyle = {
        width: '100%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
      };
    
      const buttonStyle = {
        padding: '10px 15px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'block',
        margin: '20px auto',
      };
    
      const errorStyle = {
        color: 'red',
        marginTop: '10px',
      };


  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [alcohol, setAlcohol] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Drink name is required');
      return;
    }
    if (!alcohol || isNaN(alcohol)) {
      setError('Valid alcohol percentage is required');
      return;
    }
    if (!price || isNaN(price)) {
      setError('Valid price is required');
      return;
    }
    if (category === '') {
      setError('Category is required');
      return;
    }

    const newDrink = {
      id,
      name,
      alcoholPercentage: parseInt(alcohol),
      price: parseFloat(price),
      category: parseInt(category)
    };

    axios.post('http://localhost:5233/Drink/AddDrink', newDrink, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(() => {
        navigate('/drinks');
      })
      .catch(error => {
        console.error('Error adding drink:', error);
        setError('Failed to add drink. Please try again.');
      });
  };

  return (
    <div style={containerStyle}>
      <h2>Add New Drink</h2>
      <form onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Drink Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Alcohol Percentage:</label>
          <input
            type="number"
            value={alcohol}
            onChange={(e) => setAlcohol(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Category(0-Water, 1-Coffee, 2-Tea, 3-Juice, 4-Soda, 5-Beer, 6-Wine):</label>
          <input
            type="number"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
          />
        </div>
        {error && <div style={errorStyle}>{error}</div>}
        <button type="submit" style={buttonStyle}>Add Drink</button>
      </form>
    </div>
  );
}

export default AddDrink;
