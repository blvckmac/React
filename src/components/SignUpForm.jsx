// src/components/SignUpForm.jsx
import React, { useState } from 'react';

const SignUpForm = ({setToken}) => {
        // State variables for form inputs
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(false);

        async function handleSubmit (event) {
            event.preventDefault();
            if (username.length < 8) {
                setError('Username must be at least eight characters long.');
                return;
              }
          
              if (password.length < 6) {
                setError('Password must be at least six characters long.');
                return;
              }
          

            try{  
                setLoading(true);
                // Make a fetch request
      const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup',
       {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ username, password }), // Convert data to JSON string
      });
      if (response.ok) {
        const result = await response.json();
        setToken(result.token); 
        console.log('User registered successfully!');
      } else {
        // If the response status is not OK, throw an error
        throw new Error('Failed to register user');
      }  
            }catch (error) {
                setError(error.message);
              } finally{
                setLoading(false)
              }
          };

  return (
    <div>
      <h2>Sign Up</h2>
{error && <p>{error}</p>}
<form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            label="Enter your username"
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            label="Enter your password"
            required
          />
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

    </div>
  );
};

export default SignUpForm;
