import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const AppBar = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const userInfoString = useSelector((store) => store.userInfo);
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null; // Parse the JSON string
  const usern = userInfo ? userInfo.user : null;
  useEffect(() => {
    setUsername(usern);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">PayTM App</div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
          {username}
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {username && username.charAt(0).toUpperCase()}
          </div>
        </div>
        <button
          className="bg-black text-white rounded-lg p-2 m-2 "
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AppBar;
