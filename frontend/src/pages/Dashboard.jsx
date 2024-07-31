import React, { useState, useEffect } from 'react';
import { AppBar } from '../components/AppBar';
import { Balance } from '../components/Balance';
import Users from '../components/Users';

const Dashboard = () => {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
    
    // console.log(token);
  const getBalance = async () => {
    const token = JSON.parse(localStorage.getItem('signedInUser')).token;
    try {
      const response = await fetch("http://localhost:3000/api/v1/account/balance", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Check if the token is correctly set
        }
      });
      if (response.ok) {
        const data = await response.json();
        setBalance(data.balance);
      } else {
        const errorData = await response.text();
        setError(`Error: ${response.statusText}`);
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div>
      <AppBar />
      <div className="p-4">
        <div className="m-8">
            <Balance value={Math.floor(balance)} />
            <Users/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
