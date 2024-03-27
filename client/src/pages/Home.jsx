import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../components/NavBar";
import NavButton from '../components/NavButton';
import SubmitButton from '../components/SubmitButton';
import UploadButton from '../components/UploadButton';
import UserFeed from '../components/UserFeed';
import {setPosts} from '../redux/postSlice';
// https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg
//discord https://static.vecteezy.com/system/resources/previews/006/892/625/original/discord-logo-icon-editorial-free-vector.jpg

// Home Page
const Home = () => {
    const user = useSelector((state) => state.user);
    const posts = useSelector((state) => state.posts);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();
    const UserData = user.user;
    
    console.log(user,posts);

    
    const getAllPosts = async () => {
        const response = await fetch("http://localhost:5000/posts", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            dispatch(setPosts({ posts: data }));
        } else {
            // Display error if not okay
            const err = await response.json();
            setErrorMessage(err.message);
        }
        
    };

    useEffect(() => {
        // Get post and feed data from server
        getAllPosts();
    }, []); // Only run once when page loads

    return (
        <div className="home">
            {/*Place navbar at top of page*/}
            <NavBar />
            {/*Background page*/}
            <div className="background h-screen bg-[#f1f2f7] flex justify-center">
                {/*Columns for profile, feed and recommended friends*/}
                <div className="content flex w-11/12 mt-6">
                    {/*Profile column*/}
                    <div className="profile w-1/4 bg-white p-6 rounded-xl mr-4 flex flex-col items-center shadow-lg" style={{height:'530px',position:'sticky', top: 100}}>
                        {/*User profile avatar image wiith auto width scaling*/}
                        <div className="avatar w-40 h-40 rounded-full bg-gray-200 shadow-lg border border-gray-200 flex items-center justify-center" style={{ border: '2px solid grey', backgroundImage: `url(http://localhost:5000/images/${UserData.ProfilePicture})`, backgroundSize: 'cover', backgroundPosition: 'center' }} aria-label="Avatar Image">
                        </div>
                        <h2 className="text-2xl font-bold mb-2">{UserData.FirstName} {UserData.LastName}</h2>
                        <p className="text-gray-500">{UserData.Bio}</p>
                        <h3 className="text-xl font-bold mt-4 mb-2 pt-6">Socials</h3>
                        {/*User Discord tag card*/}
                        <div className="socials flex items-center rounded-2xl border border-gray-300 " style={{height:'77px',width:'230px', background: 'linear-gradient(30deg, rgba(80,50,250,0.7) 0%, rgba(0,0,0,0.1) 100%)', backdropFilter: 'blur(10px)',border: '1px solid grey',}}>
                            <img src="https://static.vecteezy.com/system/resources/previews/006/892/625/original/discord-logo-icon-editorial-free-vector.jpg" alt="Discord" className="w-1/3 h-full rounded-3xl p-2.5"/>
                            <div className="text-gray-500 text-white font-bold  stroke-slate-50" style={{fontSize: '1.05em', textShadow: '-1px 0 #242424, 0 2px #242424, 1px 0 #242424, 0 -1px #242424', wordBreak: 'break-all', marginRight: '1%'}}>
                                @{UserData.Discord}
                            </div>
                        </div>
                        <NavButton buttonText="Edit Profile" URL={"/editProfile"} style={{ marginTop:'25px', border: '1px solid #D6D6D6', borderRadius: '10px',width:'170px',height:'40px', textShadow: '0px 0 #171717, 0 0px #171717, 0px 0 #171717, 0 0px #171717' }} backgroundColor={'#171717'} hoverColor={'#000000'} />
                        
                    </div>
                    {/*Post feed column*/}
                    <div className="feed w-1/2 bg-transparent rounded-xl mx-4 shadow-lg" style={{marginRight:'1%', marginLeft:'1%', height:'250px'}}>
                        <div className="feed bg-white rounded-xl" style={{width:'100%', height:'100%', paddingTop:'25px',paddingLeft:'25px',paddingRight:'25px'}}>
                            <form style={{height:'100%',width:'100%'}}>
                                <div className="" style={{height:'60%'}} >
                                    <textarea className="focus:outline resize-none w-full mb-4 border border-gray-400 p-2 bg-[#f0f2f5]" type="text" placeholder="What's on your mind?" style={{paddingLeft:'12px', paddingTop:'10px', height:'100%', fontSize:'18px', borderRadius:'12px', outlineColor:'#d9d9d9', outlineWidth:'2px', outlineStyle:'none', border: '0px solid #aeaeae'}} />
                                </div>
                                <div style={{width:'100%', height:'30%', paddingTop:'15px', display: 'flex', justifyContent:'center'}}>
                                    <div className="" style={{width:'60%', height:'100%', display: 'flex', alignItems:'center'}} >
                                        <UploadButton buttonText="Upload Photo" style={{width:'40%', border: '1px solid #D6D6D6', borderRadius: '10px', textShadow: '0px 0 #171717, 0 0px #171717, 0px 0 #171717, 0 0px #171717' }} backgroundColor={'#33a24e'} hoverColor={'#2e8f46'} />
                                        <div style={{flexGrow: 1}}></div>
                                        <SubmitButton buttonText="Post" style={{ width:'40%', border: '1px solid #D6D6D6', borderRadius: '10px', textShadow: '0px 0 #171717, 0 0px #171717, 0px 0 #171717, 0 0px #171717' }} backgroundColor={'#0866ff'} hoverColor={'#095de7'} />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <UserFeed posts={posts.posts} />
                        {/*Posts go here*/}
                    </div>
                    {/*Friend recommendation column*/}
                    <div className="suggested w-1/4 bg-white p-6 rounded-xl ml-4 shadow-lg" style={{height:'430px',position:'sticky', top: 100}}>
                        <h2 className="text-2xl font-bold mb-4 text-center justify-center">Suggested followers</h2>
                        {/*Suggested friends go here*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;