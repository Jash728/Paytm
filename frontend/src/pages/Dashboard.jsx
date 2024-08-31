import  { useState, useEffect } from 'react';
import { AppBar } from '../components/AppBar';
import { Balance } from '../components/Balance';
import Users from '../components/Users';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  const userInfoString = useSelector((store) => store.userInfo);
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null; // Parse the JSON string
  const token = userInfo ? userInfo.token : null;
  
  const getBalance = async () => {
    // const token = JSON.parse(localStorage.getItem('signedInUser')).token;
   
    try {
      const response = await fetch("https://paytm-yuzv.onrender.com/api/v1/account/balance", {
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
