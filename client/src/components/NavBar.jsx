import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from "../redux/userSlice";
import { Link, useNavigate } from 'react-router-dom';

{/*Top navigation bar*/}
const NavBar = () => {
  const [isHoveredSearch, setIsHoveredSearch] = useState(false);
  const [isHoveredLogout, setIsHoveredLogout] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <nav style={{ 
        width: '100%', 
        height: '70px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#171717',
        position:'sticky', 
        top: 0,
        zIndex: 2
    }}>
        <div style={{
            backgroundImage: 'url("https://wallpapercave.com/wp/wp4464940.jpg")',
            filter: 'blur(1px)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1
        }}></div>
        {/*Main navbar container*/}
        <div style={{ width:'100%',height: '30%',display: 'flex', justifyContent: 'center', alignItems:'center'}}>
            {/*Logo div*/}
            <div style={{ flex: 1,display: 'flex', justifyContent: 'flex-start' }}>
                <Link to="/">
                <img src="http://localhost:5000/images/logo.png" alt="Logo" style={{ width: 'auto', paddingLeft:'20px', height: '30px', cursor: 'pointer' }} />
                </Link>
            </div>
            {/*Flex div to seperate logo, search bar and logout button into three columns*/}
            <div style={{ flex: 2, display: 'flex', justifyContent: 'center' }}>
                {/*Searchbar div*/}
                <div style={{ display: 'flex', height: '47px', width: '400px', overflow: 'hidden', border: '1px solid grey',borderRadius: '11px', backgroundColor: 'white' }}>
                    <input className="focus:outline-none" type="text" style={{ flex: '1', padding: '15px', backgroundColor: 'transparent', border: 'none', fontSize:'1.1rem', fontWeight:'500' }} />
                    <div style={{ width: '20%', display: 'flex', paddingRight:'5px', alignItems: 'center',  justifyContent: 'right', backgroundColor: 'white' }}>
                        <button 
                            onMouseEnter={() => setIsHoveredSearch(true)}
                            onMouseLeave={() => setIsHoveredSearch(false)}
                            style={{ 
                                width: '100%', 
                                height: '75%', 
                                backgroundColor: isHoveredSearch ? '#F0F0F0' : '#F7F7F7', 
                                color: '#171717',
                                padding: '8px', 
                                fontSize: '0.95rem',
                                fontWeight: 'bold', 
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid #D6D6D6',
                            }}>
                            Search
                        </button>
                    </div>
                </div>
            </div>
            {/*Logout button container*/}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ paddingRight: '9px', height: '35px' }}>
                    <button 
                        onMouseEnter={() => setIsHoveredLogout(true)}
                        onMouseLeave={() => setIsHoveredLogout(false)}
                        onClick={() => {
                            dispatch(logout());
                            navigate('/login');
                        }}
                        style={{ width: '80px', height: '100%', backgroundColor: isHoveredLogout ? '#eeeeee' : '#F7F7F7',  color: '#171717', padding: '3px 5px', fontWeight: 'bold', borderRadius: '8px', border: '1px solid grey' }}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    </nav>
  );
};

export default NavBar;