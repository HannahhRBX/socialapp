import React, { useState } from 'react';
import { Textfit } from 'react-textfit';
import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import { useNavigate } from 'react-router-dom';
import NavButton from '../components/NavButton';
import SubmitButton from '../components/SubmitButton';
// https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg
//discord https://static.vecteezy.com/system/resources/previews/006/892/625/original/discord-logo-icon-editorial-free-vector.jpg
const Home = () => {
    const user = useSelector((state) => state.user);
    const [isHoveredEdit, setIsHoveredEdit] = useState(false);
    const UserData = user.user;
    const navigate = useNavigate();
    console.log(user);
    //console.log(user.token);
    

    return (
        <div className="home">
            <NavBar />
            <div className="background h-screen bg-[#f1f2f7] flex justify-center">
                <div className="content flex w-11/12 mt-6">
                    <div className="profile w-1/4 h-3/5 bg-white p-6 rounded-xl mr-4 flex flex-col items-center">
                        <div className="avatar w-40 h-40 rounded-full bg-gray-200 mb-4 shadow-lg border border-gray-200 flex items-center justify-center">
                            <img src={`http://localhost:5000/images/${UserData.ProfilePicture}`} alt="Avatar" className="w-full h-full rounded-full"/>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">{UserData.FirstName} {UserData.LastName}</h2>
                        <p className="text-gray-500">{UserData.Bio}</p>
                        <h3 className="text-xl font-bold mt-4 mb-2 pt-6">Socials</h3>
                        <div className="socials flex items-center rounded-2xl border border-gray-300" style={{height:'77px',width:'230px', background: 'linear-gradient(30deg, rgba(80,50,250,0.7) 0%, rgba(0,0,0,0.1) 100%)', backdropFilter: 'blur(10px)',border: '1px solid grey',}}>
                            <img src="https://static.vecteezy.com/system/resources/previews/006/892/625/original/discord-logo-icon-editorial-free-vector.jpg" alt="Discord" className="w-1/3 h-full rounded-3xl p-2.5"/>
                            <div className="text-gray-500 text-white font-bold  stroke-slate-50" style={{fontSize: '1.05em', textShadow: '-1px 0 #242424, 0 2px #242424, 1px 0 #242424, 0 -1px #242424', wordBreak: 'break-all', marginRight: '1%'}}>
                                @{UserData.Discord}
                            </div>
                        </div>
                        <NavButton buttonText="Edit Profile" URL={"/editProfile"} style={{ marginTop:'25px', border: '1px solid #D6D6D6', borderRadius: '10px',width:'170px',height:'40px', textShadow: '0px 0 #171717, 0 0px #171717, 0px 0 #171717, 0 0px #171717' }} backgroundColor={'#171717'} hoverColor={'#000000'} />
                        
                    </div>
                    <div className="feed w-1/2 bg-white p-6 rounded-xl mx-4">
                        {/*<input  className="focus:outline-none w-full p-2 mb-4 border rounded-lg" type="text" placeholder="What's on your mind?" />*/}
                        {/* Posts go here */}
                    </div>
                    <div className="suggested w-1/4 bg-white p-6 rounded-xl ml-4">
                        <h2 className="text-2xl font-bold mb-4 text-center justify-center">Suggested followers</h2>
                        {/* Suggested followers go here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;