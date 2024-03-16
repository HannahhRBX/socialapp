import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import { useNavigate } from 'react-router-dom';
import { updateProfile } from "../redux/userSlice";
import BackButton from "../components/BackButton";

// https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg
//discord https://static.vecteezy.com/system/resources/previews/006/892/625/original/discord-logo-icon-editorial-free-vector.jpg
const ChangePassword = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const form = useForm({ mode: "onChange" });
    const dispatch = useDispatch();
    
    const [isHoveredPassword, setIsHoveredPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const UserData = user.user;
    const { register, handleSubmit } = form;
    
    console.log(user);
    //console.log(user.token);
    

    const onSubmit = async (data) => {
        const sendChangePassword = async (data) => {
            const response = await fetch("http://localhost:5000/changePassword", {
            method: "POST",
            headers: { "Content-Type": "application/json","Authorization":"Bearer "+user.token },
            body: JSON.stringify({
                id: UserData._id, // Assuming the user's id is stored in UserData._id),
                ...data,
                }),
            });
            if (response.ok) {
                const updatedUser = await response.json();
                dispatch(updateProfile({ user: updatedUser }));
                //console.log(loggedIn.user, user);
                setErrorMessage(null);
                navigate("/editProfile");
            } else {
                const err = await response.json();
                setErrorMessage(err.message);
                console.log(err.message);
            }
         
        };
        sendChangePassword(data);
    };

    return (
        <div className="home">
            <NavBar />
            <div className="background h-screen bg-[#f1f2f7] flex justify-center">
                <div className="content flex  mt-6 justify-center" style={{ width:'600px',height:'630px' }}>
                    <div className="shadow-lg profile bg-white p-6 rounded-xl mr-4 flex flex-col items-center justify-center" style={{width:'100%', height: '100%'}}>
                        <BackButton navigateTo="/editProfile" />
                        <div className="avatar w-40 h-40 rounded-full bg-gray-200 shadow-lg border border-gray-200 flex items-center justify-center" style={{ border: '2px solid grey' }}>
                            <img src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" alt="Avatar" className="w-full h-full rounded-full"/>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className=" grid grid-cols-1 gap-4 m-8" >
                            
                            
                            <div className="col-span-1  mx-auto" style={{ width:'250px' }}>
                                <h2 className="text-xl font-bold text-center ">Current Password</h2>
                                <input type="password" placeholder="Current Password" className="focus:outline w-full mx-auto rounded-2xl border border-gray-400 p-2" style={{ paddingLeft: '15px', overflow: 'hidden', border: '1px solid grey',borderRadius: '15px', backgroundColor: 'white' }}  
                                {...register("CurrentPassword", {
                                    required: "Password is required!",
                                })}
                                />
                            </div>
                            <div className="col-span-1  mx-auto" style={{ width:'250px' }}>
                                <h2 className="text-xl font-bold text-center ">New Password</h2>
                                <input type="password" placeholder="New Password" className="focus:outline w-full mx-auto rounded-2xl border border-gray-400 p-2" style={{ paddingLeft: '15px', overflow: 'hidden', border: '1px solid grey',borderRadius: '15px', backgroundColor: 'white' }}  
                                {...register("NewPassword", {
                                    required: "New Password is required!",
                                })}
                            />
                            </div>
                            <div className="col-span-1  mx-auto" style={{ width:'250px' }}>
                                <h2 className="text-xl font-bold text-center ">Confirm Password</h2>
                                <input type="password" placeholder="Confirm Password" className="focus:outline w-full mx-auto rounded-2xl border border-gray-400 p-2" style={{ paddingLeft: '15px', overflow: 'hidden', border: '1px solid grey',borderRadius: '15px', backgroundColor: 'white' }}  
                                {...register("ConfirmPassword", {
                                    required: "Confirm Password is required!",
                                })}
                                
                                />
                            </div>
                            {errorMessage && <h2 className="text-md font-bold text-center" style={{color: '#ff2121', marginBottom: '-18px'}}>{errorMessage}</h2>}

                            <button 
                            type="submit"
                            className='col-span-1 mx-auto items-center justify-center text-center'
                            onMouseEnter={() => setIsHoveredPassword(true)}
                            onMouseLeave={() => setIsHoveredPassword(false)}
                            
                            style={{ 
                                
                                width: '210px', 
                                height: '45px', 
                                backgroundColor: isHoveredPassword ? '#C86111' : '#FF801D', 
                                color: isHoveredPassword ? 'white' : 'white', 
                                padding: '8px', 
                                fontWeight: 'bold', 
                                borderRadius: '50px',
                                fontSize: '1.1rem',
                                display: 'flex',
                                marginTop: '10px',
                                border: '1px solid #B6B6B6',
                                textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
                            }}>
                            Update Password
                        </button>
                        </form>
                        
                        
                        
                        
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;