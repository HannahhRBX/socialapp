import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isHoveredSearch, setIsHoveredSearch] = useState(false);
  const [isHoveredLogout, setIsHoveredLogout] = useState(false);

  return (
    <nav style={{ 
        width: '100%', 
        height: '70px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'rgba(255, 255, 255, 0.7)'
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
        <div style={{ display: 'flex', justifyContent: 'space-around', width: 'auto' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
            <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
            <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link>
        </div>
        <div style={{ display: 'flex', height: '60%', width: '300px', overflow: 'hidden', border: '1px solid grey',borderRadius: '50px', backgroundColor: 'white' }}>
            <input type="text" style={{ flex: '1', padding: '5px', backgroundColor: 'transparent', border: 'none' }} />
            <div style={{ width: '50%', display: 'flex', paddingRight:'5px', alignItems: 'center',  justifyContent: 'right', backgroundColor: 'white' }}>
            <button 
                onMouseEnter={() => setIsHoveredSearch(true)}
                onMouseLeave={() => setIsHoveredSearch(false)}
                style={{ 
                    width: '80%', 
                    height: '80%', 
                    backgroundColor: isHoveredSearch ? '#9A9A9A' : '#E9E9E9', 
                    color: isHoveredSearch ? 'white' : 'black', 
                    padding: '8px', 
                    fontWeight: 'bold', 
                    borderRadius: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #B6B6B6'
                }}>
                Search
            </button>
            </div>
        </div>
        <div style={{ paddingRight: '9px', height: '60%' }}>
            <button 
                onMouseEnter={() => setIsHoveredLogout(true)}
                onMouseLeave={() => setIsHoveredLogout(false)}
                style={{ width: '100px', height: '100%', backgroundColor: isHoveredLogout ? 'grey' : 'white', color: isHoveredLogout ? 'white' : 'black', padding: '3px 5px', fontWeight: 'bold', borderRadius: '50px', border: '1px solid grey' }}>
                Logout
            </button>
        </div>
    </nav>
  );
};

export default NavBar;