import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Drinks() {
    const containerStyle = {
        padding: '20px',
        maxWidth: '50vw',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      };
    
      const headingStyle = {
        textAlign: 'center',
        fontSize: '2rem',
        marginBottom: '20px',
        color: '#333',
      };
    
      const addButtonStyle = {
        display: 'inline-block',
        marginBottom: '20px',
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        textAlign: 'center',
        transition: 'background-color 0.3s ease',
      };
    
      const addButtonHoverStyle = {
        backgroundColor: '#45a049',
      };
    
      const listStyle = {
        listStyleType: 'none',
        padding: '0',
      };
    
      const listItemStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        margin: '10px 0',
        backgroundColor: '#fff',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      };
    
      const deleteButtonStyle = {
        padding: '5px 10px',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
      };
    
      const deleteButtonHoverStyle = {
        backgroundColor: '#d32f2f',
      };
    
      const editButtonStyle = {
        marginRight: '10px',
        padding: '5px 10px',
        backgroundColor: '#2196F3',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '3px',
        transition: 'background-color 0.3s ease',
      };
    
      const editButtonHoverStyle = {
        backgroundColor: '#1976d2',
      };


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

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Drinks List</h2>
      <Link
        to="/drinks/new"
        style={addButtonStyle}
        onMouseOver={(e) => (e.target.style.backgroundColor = addButtonHoverStyle.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = addButtonStyle.backgroundColor)}
      >
        Add new drink
      </Link>
      <ul style={listStyle}>
        {drinks.map((drink) => (
          <li key={drink.id} style={listItemStyle}>
            <span>{drink.name}</span>
            <div>
              <Link
                to={`/drinks/${drink.id}`}
                style={editButtonStyle}
                onMouseOver={(e) => (e.target.style.backgroundColor = editButtonHoverStyle.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = editButtonStyle.backgroundColor)}
              >
                Edit
              </Link>
              <button
                style={deleteButtonStyle}
                onMouseOver={(e) => (e.target.style.backgroundColor = deleteButtonHoverStyle.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = deleteButtonStyle.backgroundColor)}
                onClick={() => handleDelete(drink.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Drinks;
