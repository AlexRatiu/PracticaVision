import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditDrink() {
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
    if (!drink.category) {
      setError('Category is required');
      return;
    }

    axios.put(`http://localhost:5233/Drink/UpdateDrink`, drink, {
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
    <div>
      <h2>Edit Drink</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Drink Name:</label>
          <input
            type="text"
            name="name"
            value={drink.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Alcohol Percentage:</label>
          <input
            type="number"
            name="alcoholPercentage"
            value={drink.alcoholPercentage}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={drink.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={drink.category}
            onChange={handleChange}
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Update Drink</button>
      </form>
    </div>
  );
}

export default EditDrink;
