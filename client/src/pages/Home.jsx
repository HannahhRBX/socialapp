import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";
// https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg
//discord https://static.vecteezy.com/system/resources/previews/006/892/625/original/discord-logo-icon-editorial-free-vector.jpg
const Home = () => {
    const user = useSelector((state) => state.user);
    const UserData = user.user;
    console.log(user);
    //console.log(user.token);
    return (
        <div className="home">
            <NavBar />
            <div className="background h-screen bg-[#f1f2f7] flex justify-center">
                <div className="content flex w-11/12 mt-6">
                    <div className="profile w-1/4 h-3/5 bg-white p-6 rounded-xl mr-4 flex flex-col items-center">
                        <div className="avatar w-40 h-40 rounded-full bg-gray-200 mb-4 shadow-lg border border-gray-200 flex items-center justify-center">
                            <img src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" alt="Avatar" className="w-full h-full rounded-full"/>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">{UserData.FirstName}</h2>
                        <p className="text-gray-500">{UserData.Bio}</p>
                        <h3 className="text-xl font-bold mt-4 mb-2 pt-6">Socials</h3>
                        <div className="socials w-full h-20px flex items-center rounded-2xl border border-gray-300" style={{background: 'linear-gradient(30deg, rgba(128,0,128,0.7) 0%, rgba(0,0,0,0.7) 100%)', backdropFilter: 'blur(10px)'}}>
                            
                        <img src="https://static.vecteezy.com/system/resources/previews/006/892/625/original/discord-logo-icon-editorial-free-vector.jpg" alt="Discord" className="w-1/3 h-full rounded-3xl p-2.5"/>
                            <p className="text-2xl text-white font-bold mb-2 stroke-slate-50" style={{textShadow: '-1px 0 black, 0 2px black, 1px 0 black, 0 -1px black'}}>@{UserData.Discord}</p>
                        </div>
                    </div>
                    <div className="feed w-1/2 bg-white p-6 rounded-xl mx-4">
                        <input  className="focus:outline-none w-full p-2 mb-4 border rounded-lg" type="text" placeholder="What's on your mind?" />
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