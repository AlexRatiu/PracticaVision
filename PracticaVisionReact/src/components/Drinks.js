import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Drinks() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5233/Drink/GetAllDrinks')
      .then(response => setDrinks(response.data))
      .catch(error => console.error('Error fetching drinks:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5233/Drink/DeleteDrink?id=${id}`)
      .then(() => {
        setDrinks(drinks.filter(drink => drink.id !== id));
      })
      .catch(error => console.error('Error deleting drink:', error));
  };

  return React.createElement(
    'div',
    null,
    React.createElement(Link, { to: '/drinks/new' }, 'Add new drink'),
    React.createElement('h2', null, 'Drinks List'),
    React.createElement(
      'ul',
      null,
      drinks.map(drink =>
        React.createElement(
          'li',
          { key: drink.id },
          drink.name,
          React.createElement('button', { onClick: () => handleDelete(drink.id) }, 'Delete')
        )
      )
    )
  );
}

export default Drinks;
