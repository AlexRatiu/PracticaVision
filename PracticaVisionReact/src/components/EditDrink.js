import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditDrink() {
    const containerStyle = {
        padding: '20px',
        maxWidth: '40vw',
        margin: '0 auto',
        background: 'linear-gradient(to bottom right, #f9f9f9, #d0e7ff)', 
        borderRadius: '12px', 
        boxShadow: '0 0 .25rem rgba(0, 0, 255, 0.5), -.125rem -.125rem 1rem rgba(30, 144, 255, 0.5), .125rem .125rem 1rem rgba(70, 130, 180, 0.5)',
        border: '2px solid rgba(0, 0, 255, 0.2)', 
      };
      
      const formGroupStyle = {
        marginBottom: '15px',
      };
      
      const labelStyle = {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#00008B', 
        textShadow: '1px 1px 2px rgba(0, 128, 255, 0.5)', 
      };

      const headingStyle = {
        textAlign: 'center',
        fontSize: '2rem',
        marginBottom: '20px',
        color: '#333',
        textShadow: '0 0 .25rem rgba(0, 0, 255, 0.5), -.125rem -.125rem 1rem rgba(30, 144, 255, 0.5), .125rem .125rem 1rem rgba(70, 130, 180, 0.5)'
      }; 
      
      const inputStyle = {
        width: '100%',
        padding: '8px',
        borderRadius: '8px', 
        border: '1px solid #90EE90', 
        boxSizing: 'border-box',
        boxShadow: '0 0 .25rem rgba(0, 0, 255, 0.5), -.125rem -.125rem 1rem rgba(30, 144, 255, 0.5), .125rem .125rem 1rem rgba(70, 130, 180, 0.5)',
      };
    
      const buttonStyle = {
        background: 'linear-gradient(to bottom right, #00008B, #ADD8E6)',
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
        marginRight: '10px',
        boxShadow: 'none'
      };

      const buttonHoverStyle = {
        boxShadow: '0 0 .25rem rgba(0, 0, 255, 0.5), -.125rem -.125rem 1rem rgba(30, 144, 255, 0.5), .125rem .125rem 1rem rgba(70, 130, 180, 0.5)'
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
      <h2 style={headingStyle}>Edit Drink</h2>
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
            <label style={labelStyle}>
                Category:
            </label>
            <select
                name="category"
                value={drink.category}
                onChange={handleChange}
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
        Edit drink
      </button>
      </form>
    </div>
  );
}

export default EditDrink;
