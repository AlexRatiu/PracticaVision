import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Drinks() {
    const containerStyle = {
        padding: '20px',
        maxWidth: '40vw',
        margin: '0 auto',
        background: 'linear-gradient(to bottom right, #f9f9f9, #d0d0ff)', 
        borderRadius: '12px', 
        boxShadow: '0 0 .25rem rgba(128, 0, 128, 0.5), -.125rem -.125rem 1rem rgba(75, 0, 130, 0.5), .125rem .125rem 1rem rgba(138, 43, 226, 0.5)',
        border: '2px solid rgba(128, 0, 128, 0.2)', 
      };
    
      const headingStyle = {
        textAlign: 'center',
        fontSize: '2rem',
        marginBottom: '20px',
        color: '#333',
        textShadow: '0 0 .25rem rgba(128, 0, 128, 0.5), -.125rem -.125rem 1rem rgba(148, 0, 211, 0.5), .125rem .125rem 1rem rgba(186, 85, 211, 0.5)',
    };      
    
      const addButtonStyle = {
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
    
      const addButtonHoverStyle = {
        boxShadow: '0 0 .25rem rgba(0, 255, 0, 0.5), -.125rem -.125rem 1rem rgba(34, 139, 34, 0.5), .125rem .125rem 1rem rgba(0, 128, 0, 0.5)'
    };
    
      const listStyle = {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#06402B', 
};
    
      const listItemStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        margin: '10px 0',
        background: 'white', 
        borderRadius: '5px',
        boxShadow: '0 0 .25rem rgba(128, 0, 128, 0.5), -.125rem -.125rem 1rem rgba(75, 0, 130, 0.5), .125rem .125rem 1rem rgba(138, 43, 226, 0.5)',
      };
    
      const deleteButtonStyle = {
        background: 'linear-gradient(to bottom right, #8B0000, #FFB6C1)',
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
    
      const deleteButtonHoverStyle = {
        boxShadow: '0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem rgba(239, 71, 101, 0.5), .125rem .125rem 1rem rgba(255, 154, 90, 0.5)'
      };
    
      const editButtonStyle = {
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
    
      const editButtonHoverStyle = {
        boxShadow: '0 0 .25rem rgba(0, 0, 255, 0.5), -.125rem -.125rem 1rem rgba(30, 144, 255, 0.5), .125rem .125rem 1rem rgba(70, 130, 180, 0.5)'
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
      <button
        style={addButtonStyle}
        onMouseOver={(e) => (e.target.style.boxShadow = addButtonHoverStyle.boxShadow)}
        onMouseOut={(e) => (e.target.style.boxShadow = addButtonStyle.boxShadow)}
        onClick={() => window.location.href = `/drinks/new`}

      >
        Add new drink
      </button>
      <ul style={listStyle}>
        {drinks.map((drink) => (
          <li key={drink.id} style={listItemStyle}>
            <span>{drink.name}</span>
            <div>
              <button
                style={editButtonStyle}
                onMouseOver={(e) => (e.target.style.boxShadow = editButtonHoverStyle.boxShadow)}
                onMouseOut={(e) => (e.target.style.boxShadow = editButtonStyle.boxShadow)}
                onClick={() => window.location.href = `/drinks/${drink.id}`}

              >
                Edit
              </button> 
              <button
                style={deleteButtonStyle}
                onMouseOver={(e) => (e.target.style.boxShadow = deleteButtonHoverStyle.boxShadow)}
                onMouseOut={(e) => (e.target.style.boxShadow = deleteButtonStyle.boxShadow)}
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
