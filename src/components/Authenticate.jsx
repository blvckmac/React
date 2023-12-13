// src/components/Authenticate.jsx
import React, { useState } from 'react';

const Authenticate = ({ token }) => {
  const [apiResponse, setApiResponse] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null); 

  const handleAuthenticate = async () => {
    try {
      const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', {
        method: 'GET', 
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`, 
        },
      });

      if (response.ok) {
        const result = await response.json();
        setApiResponse(result);
        setSuccessMessage(result.message);

        if(result.data && result.data.username)
        console.log('Authentication successful!,result.data.username');

      } else {
        throw new Error('Failed to authenticate');
      }
    } catch (error) {
      console.error('Error during authentication:', error.message);
      setError(error.message);
    }
  };

  return (
    
    <div>
      <h2>Authenticate</h2>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      {apiResponse && <p>API Response: {JSON.stringify(apiResponse)}</p>}
      <button onClick={handleAuthenticate}>Authenticate Token</button>

    </div>
  );
};

export default Authenticate;
