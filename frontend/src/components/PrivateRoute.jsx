import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const userInfoString = useSelector((store) => store.userInfo);
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null; 
  const username = userInfo ? userInfo.user : null;
  return username? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
