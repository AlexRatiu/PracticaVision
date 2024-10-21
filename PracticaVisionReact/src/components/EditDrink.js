import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditDrink() {
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


  const { drinkId } = useParams();  
  const [drink, setDrink] = useState({
    name: '',
    alcoholPercentage: '',
    price: '',
    category: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5233/Drink/GetDrinkById?id=${drinkId}`)
      .then(response => setDrink(response.data))
      .catch(error => console.error('Error fetching drink:', error));
  }, [drinkId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!drink.name) {
      setError('Drink name is required');
      return;
    }
    if (drink.alcoholPercentage === '' || isNaN(drink.alcoholPercentage)) {
      setError('Valid alcohol percentage is required');
      return;
    }
    if (!drink.price || isNaN(drink.price)) {
      setError('Valid price is required');
      return;
    }
    if (drink.category === '' || isNaN(drink.category)) {
      setError('Category is required');
      return;
    }

    const updatedDrink = {
        ...drink,
        category: parseInt(drink.category), 
      };

    axios.put(`http://localhost:5233/Drink/UpdateDrink`, updatedDrink, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(() => {
      navigate('/drinks');  
    })
    .catch(error => {
      console.error('Error updating drink:', error);
      setError('Failed to update drink. Please try again.');
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDrink(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div style={containerStyle}>
      <h2>Edit Drink</h2>
      <form onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Drink Name:</label>
          <input
            type="text"
            name="name"
            value={drink.name}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Alcohol Percentage:</label>
          <input
            type="number"
            name="alcoholPercentage"
            value={drink.alcoholPercentage}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Price:</label>
          <input
            type="number"
            name="price"
            value={drink.price}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Category(0-Water, 1-Coffee, 2-Tea, 3-Juice, 4-Soda, 5-Beer, 6-Wine):</label>
          <input
            type="number"
            name="category"
            value={drink.category}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        {error && <div style={errorStyle}>{error}</div>}
        <button type="submit" style={buttonStyle}>Update Drink</button>
      </form>
    </div>
  );
}

export default EditDrink;
