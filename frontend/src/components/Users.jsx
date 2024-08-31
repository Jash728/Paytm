import React, { useEffect, useState } from "react";
import axios from "axios";
import User from "./User";
import { useSelector } from 'react-redux';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const userInfoString = useSelector((store) => store.userInfo);
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null; // Parse the JSON string
  const token = userInfo ? userInfo.token : null;
  useEffect(() => {
    
    axios.get("https://paytm-yuzv.onrender.com/api/v1/user/bulk?filter=" + filter , {
        headers: {
          'Authorization': `Bearer ${token}` // Ensure yourToken is valid
        }})
        .then(response => {
            setUsers(response.data.user)
        })
}, [filter])
  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
        <div>
            {users.map(user => <User key={user._id} user={user}/>)}
        </div>
      </div>
    </>
  );
};

export default Users;
