
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";
import React, { useState, useEffect } from 'react';

const LoginForm = () => {
  const { user } = useSelector((state) => state.user);
  const form = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = form;
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const onSubmit = async (data) => {
    const sendLogin = async (data) => {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        const loggedIn = await response.json();
        dispatch(login({ user: loggedIn.user, token: loggedIn.token, edit: false }));
        console.log(loggedIn.user, user);
        navigate("/");
      }else{
        const err = await response.json();
        setErrorMessage(err.message);
      }
    };
    sendLogin(data);
  };

  return (
    <div className="bg-[#c9d0ff] min-h-screen flex items-center justify-center bg-cover bg-center" style={{backgroundImage: 'url("https://img.freepik.com/premium-vector/abstract-smooth-blur-purple-blue-color-gradient-background-website-banner-graphic-design_120819-893.jpg")'}}>
      <div className="bg-[#ffffff] p-8 rounded shadow-2xl w-96">
        <h2 className="text-4xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 text-sm font-medium">Email</label>
            <input type="text" placeholder="email@example.com" id="email" name="email" className="mt-1 p-2 w-full border rounded-md"
              {...register("email", {
                required: "Email is required!",
              })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 text-sm font-medium">Password</label>
            <input type="password" placeholder="Password" id="password" name="password" className="mt-1 p-2 w-full border rounded-md"
              {...register("password", {
                required: "Password is required!",
              })}
            />
          </div>
          {errorMessage && <h2 className="mb-2 text-md font-bold text-center" style={{color: '#ff2121'}}>{errorMessage}</h2>}

          <div className="mb-1 flex items-center justify-center">
            <button type="submit" className="bg-[#5ec1ff] text-white p-3 w-1/2 rounded-md hover:bg-blue-600 ">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
