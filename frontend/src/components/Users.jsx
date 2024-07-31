import React, { useEffect, useState } from "react";
import axios from "axios";
import User from "./User";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('signedInUser')).token;
    axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter , {
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
