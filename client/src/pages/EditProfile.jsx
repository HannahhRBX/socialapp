import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import { useNavigate } from 'react-router-dom';
import { updateProfile } from "../redux/userSlice";
import BackButton from "../components/BackButton";

// https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg
//discord https://static.vecteezy.com/system/resources/previews/006/892/625/original/discord-logo-icon-editorial-free-vector.jpg
const EditProfile = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const form = useForm({ mode: "onChange" });
    const dispatch = useDispatch();
    const [isHoveredUpdate, setIsHoveredUpdate] = useState(false);
    const [isHoveredBack, setIsHoveredBack] = useState(false);
    const [isHoveredPassword, setIsHoveredPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const UserData = user.user;
    const { register, handleSubmit, setValue } = form;
    
    //console.log(user);
    //console.log(user.token);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [discord, setDiscord] = useState("");
    const [profilePicture, setProfilePicture] = useState("");

    useEffect(() => {
        setFirstName(UserData.FirstName);
        setLastName(UserData.LastName);
        setBio(UserData.Bio);
        setDiscord(UserData.Discord);
        setProfilePicture(UserData.ProfilePicture);

        setValue("FirstName",UserData.FirstName);
        setValue("LastName",UserData.LastName);
        setValue("Bio",UserData.Bio);
        setValue("Discord",UserData.Discord);
        setValue("ProfilePicture",UserData.ProfilePicture);
    }, [UserData,setValue]);

    const onSubmit = async (data) => {
        const sendChangeProfile = async (data) => {
            const response = await fetch("http://localhost:5000/editProfile", {
            method: "POST",
            headers: { "Content-Type": "application/json","Authorization":"Bearer "+user.token },
            body: JSON.stringify({
                id: UserData._id, // Assuming the user's id is stored in UserData._id),
                ...data,
                }),
            });
            console.log(data,response)
            if (response.ok) {
                const updatedUser = await response.json();
                dispatch(updateProfile({ user: updatedUser }));
                //console.log(loggedIn.user, user);
                setErrorMessage(null);
                navigate("/");
            } else {
                const err = await response.json();
                setErrorMessage(err.message);
                console.log(err.message);
            }
         
        };
        sendChangeProfile(data);
    };

    return (
        <div className="home">
            <NavBar />
            <div className="background h-screen bg-[#f1f2f7] flex justify-center">
                <div className="content flex  mt-6 justify-center" style={{ width:'650px',height:'830px' }}>
                    <div className="shadow-lg profile bg-white p-6 rounded-xl mr-4 flex flex-col items-center justify-center" style={{width:'100%', height: '100%'}}>
                        <BackButton navigateTo="/" />
                        <div className="avatar w-40 h-40 rounded-full bg-gray-200 mb-4 shadow-lg border border-gray-200 flex items-center justify-center" style={{ border: '2px solid grey' }}>
                            <img src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" alt="Avatar" className="w-full h-full rounded-full"/>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4" style={{width:'80%'}}>
                            <div className="col-span-2 w-3/5 mx-auto">
                                <h2 className="text-xl font-bold text-center ">Profile Picture</h2>
                                <input 
                                    type="file"
                                    className="w-full mx-auto rounded-2xl border border-gray-400 p-2 focus:outline" 
                                    style={{ paddingLeft: '15px', overflow: 'hidden', border: '1px solid grey',borderRadius: '15px', backgroundColor: 'white' }} 
                                    {...register("ProfilePicture")}
                                    onChange={(e) => setProfilePicture(e.target.value)}
                                />
                            </div>

                            <div className="col-span-1">
                                 <h2 className="text-xl font-bold text-center">First Name</h2>
                                  <input type="text" value={firstName} placeholder="First Name" className="rounded-2xl border border-gray-400 p-2 focus:outline w-full" style={{ paddingLeft: '15px', overflow: 'hidden', border: '1px solid grey',borderRadius: '15px', backgroundColor: 'white' }} 
                                  {...register("FirstName", {
                                      required: "First Name is Required!",
                                  })}
                                   onChange={(e) => setFirstName(e.target.value)}
                                 />
                            </div>
                            <div className="col-span-1">
                                <h2 className="text-xl font-bold text-center">Last Name</h2>
                                <input type="text" value={lastName} placeholder="Last Name" className="rounded-2xl border border-gray-400 p-2 focus:outline w-full" style={{ paddingLeft: '15px', overflow: 'hidden', border: '1px solid grey',borderRadius: '15px', backgroundColor: 'white' }} 
                                {...register("LastName", {
                                    required: "Last Name is Required!",
                                })}
                                onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="col-span-2">
                                <h2 className="text-xl font-bold text-center">Bio</h2>
                                <textarea 
                                    value={bio}
                                    placeholder="Bio" 
                                    className="col-span-2 resize-none h-[9rem] w-full rounded-2xl border border-gray-400 p-2 focus:outline" 
                                    style={{ paddingLeft: '15px', overflow: 'hidden', border: '1px solid grey',borderRadius: '15px', backgroundColor: 'white' }}
                                    {...register("Bio")}
                                    onChange={(e) => setBio(e.target.value)}
                                />
                            </div>
                            <div className="col-span-2 w-3/5 mx-auto">
                                <h2 className="text-xl font-bold text-center ">Discord Username</h2>
                                <input type="text" value={discord} placeholder="" className="focus:outline w-full mx-auto rounded-2xl border border-gray-400 p-2" style={{ paddingLeft: '15px', overflow: 'hidden', border: '1px solid grey',borderRadius: '15px', backgroundColor: 'white' }}  
                                {...register("Discord",)}
                                onChange={(e) => setDiscord(e.target.value)}
                                />
                            </div>
                            {errorMessage && <h2 className="col-span-2 text-md font-bold" style={{color: '#ff2121', marginBottom: '-10px', textAlign:'center'}}>{errorMessage}</h2>}

                            <button
                                type="submit"
                                onMouseEnter={() => setIsHoveredUpdate(true)}
                                onMouseLeave={() => setIsHoveredUpdate(false)}
                                className='col-span-2 mx-auto items-center justify-center text-center'
                                style={{ 
                                    width: '120px', 
                                    height: '45px', 
                                    backgroundColor: isHoveredUpdate ? '#2F3A4D' : '#4A6AA5', 
                                    color: isHoveredUpdate ? 'white' : 'white', 
                                    padding: '8px', 
                                    fontWeight: 'bold', 
                                    borderRadius: '50px',
                                    fontSize: '1.1rem',
                                    display: 'flex',
                                    marginTop: '5px',
                                    
                                    border: '1px solid #B6B6B6',
                                    textShadow: !isHoveredUpdate ? '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black' : 'none'
                                }}>
                                Update
                            </button>
                        </form>
                        
                        
                        
                        <button 
                            onMouseEnter={() => setIsHoveredPassword(true)}
                            onMouseLeave={() => setIsHoveredPassword(false)}
                            onClick={
                                () => {
                                navigate('/changePassword');
                            }}
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
                                margin: '5px',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid #B6B6B6',
                                textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
                            }}>
                            Change Password
                        </button>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default EditProfile;