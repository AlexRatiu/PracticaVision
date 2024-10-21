import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddDrink() {
    const containerStyle = {
        padding: '20px',
        maxWidth: '40vw',
        margin: '0 auto',
        background: 'linear-gradient(to bottom right, #f9f9f9, #d0ffd0)', 
        borderRadius: '12px', 
        boxShadow: '0 0 .25rem rgba(0, 255, 0, 0.5), -.125rem -.125rem 1rem rgba(34, 139, 34, 0.5), .125rem .125rem 1rem rgba(0, 128, 0, 0.5)', 
        border: '2px solid rgba(0, 255, 0, 0.2)', 
        transition: 'box-shadow .2s ease-in-out', 
      };
      
      const formGroupStyle = {
        marginBottom: '15px',
      };
      
      const labelStyle = {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#06402B', 
        textShadow: '1px 1px 2px rgba(0, 128, 0, 0.5)', 
      };
      
      const inputStyle = {
        width: '100%',
        padding: '8px',
        borderRadius: '8px', 
        border: '1px solid #90EE90', 
        boxSizing: 'border-box',
        boxShadow: '0 0 5px rgba(0, 128, 0, 0.3)', 
        transition: 'box-shadow .2s ease-in-out', 
      };

      const headingStyle = {
        textAlign: 'center',
        fontSize: '2rem',
        marginBottom: '20px',
        color: '#333',
        textShadow: '0 0 .25rem rgba(0, 255, 0, 0.5), -.125rem -.125rem 1rem rgba(34, 139, 34, 0.5), .125rem .125rem 1rem rgba(0, 128, 0, 0.5)',
    }; 
    
      const buttonStyle = {
        background: 'linear-gradient(to bottom right, #06402B, #90EE90)',
        border: '0',
        borderRadius: '12px',
        color: '#FFFFFF',
        cursor: 'pointer',
        display: 'inline-block',
        fontFamily: '-apple-system,system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
        fontSize: '16px',
        fontWeight: '500',
        lineHeight: '2.5',
        outline: 'transparent',
        padding: '0 1rem',
        textAlign: 'center',
        transition: 'box-shadow .2s ease-in-out',
        touchAction: 'manipulation',
        whiteSpace: 'nowrap',
        boxShadow: 'none'
      };

      const buttonHoverStyle = {
        boxShadow: '0 0 .25rem rgba(0, 255, 0, 0.5), -.125rem -.125rem 1rem rgba(34, 139, 34, 0.5), .125rem .125rem 1rem rgba(0, 128, 0, 0.5)'
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
      <h2 style = {headingStyle}>Add New Drink</h2>
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
            <label style={labelStyle}>
                Category:
            </label>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={inputStyle}
            >
                <option value="0">Water</option>
                <option value="1">Coffee</option>
                <option value="2">Tea</option>
                <option value="3">Juice</option>
                <option value="4">Soda</option>
                <option value="5">Beer</option>
                <option value="6">Wine</option>
            </select>
        </div>
        {error && <div style={errorStyle}>{error}</div>}
        <button
        type='submit'
        style={buttonStyle}
        onMouseOver={(e) => (e.target.style.boxShadow = buttonHoverStyle.boxShadow)}
        onMouseOut={(e) => (e.target.style.boxShadow = buttonStyle.boxShadow)}
      >
        Add drink
      </button>
      </form>
    </div>
  );
}

export default AddDrink;
