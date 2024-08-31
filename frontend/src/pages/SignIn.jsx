import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeUserInfo } from "../utils/userSlice";
import { toast } from "react-toastify";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://paytm-yuzv.onrender.com/api/v1/user/signin",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Store user info and navigate to the dashboard
      dispatch(storeUserInfo(JSON.stringify(response.data)));
      navigate("/dashboard");
      toast.success("Signed in successfully!");
    } catch (error) {
      // Show error notification
      toast.error("User not found or wrong credentials!");
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-100 text-center p-4 h-max px-8">
          <div className=" mb-5">
            <Heading label={"Sign in"} />
            <SubHeading label={"Enter your credentials to access your account"} />
          </div>
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="john@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="123456"
            label={"Password"}
          />
          <div className="pt-4">
            <Button onClick={handleLogin} label={"Sign in"} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/"}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
