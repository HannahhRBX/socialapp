import React from "react";
import { useSelector } from "react-redux";
import  NavBar from "../components/NavBar";

const Home = () => {
    const user = JSON.parse(localStorage.getItem('user')) || {};

    console.log(user);

    return (
        <div className="home">
            <NavBar />
            <h2 className="text-4xl font-extrabold">Hello, {user.user.FirstName}</h2>
        </div>
    );
};

export default Home;