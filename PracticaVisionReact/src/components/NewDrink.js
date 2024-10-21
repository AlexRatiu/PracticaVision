import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddDrink() {
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
    if (!category.trim()) {
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
    React.createElement('div', null,
      React.createElement('h2', null, 'Add New Drink'),
      React.createElement('form', { onSubmit: handleSubmit },
        React.createElement('div', null,
          React.createElement('label', null, 'Drink Name:'),
          React.createElement('input', {
            type: 'text',
            value: name,
            onChange: (e) => setName(e.target.value)
          }),
          error && React.createElement('div', { style: { color: 'red' } }, error) 
        ),
        React.createElement('div', null,
          React.createElement('label', null, 'Alcohol Percentage:'),
          React.createElement('input', {
            type: 'number',
            value: alcohol,
            onChange: (e) => setAlcohol(e.target.value)
          }),
          error && React.createElement('div', { style: { color: 'red' } }, error) 
        ),
        React.createElement('div', null,
          React.createElement('label', null, 'Price:'),
          React.createElement('input', {
            type: 'number',
            value: price,
            onChange: (e) => setPrice(e.target.value)
          }),
          error && React.createElement('div', { style: { color: 'red' } }, error) 
        ),
        React.createElement('div', null,
          React.createElement('label', null, 'Category:'),
          React.createElement('input', {
            type: 'number',
            value: category,
            onChange: (e) => setCategory(e.target.value)
          }),
          error && React.createElement('div', { style: { color: 'red' } }, error) 
        ),
        React.createElement('button', { type: 'submit' }, 'Add Drink')
      )
    )
  );
}

export default AddDrink;