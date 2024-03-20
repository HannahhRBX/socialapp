import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// BackButton component for navigating back on a form
const BackButton = ({ buttonText, URL, style, backgroundColor, hoverColor }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const defaultStyle = { 
        width: '210px', 
        height: '45px', 
        backgroundColor: isHovered ? hoverColor : backgroundColor, 
        color: 'white', 
        padding: '8px', 
        fontWeight: 'bold', 
        borderRadius: '50px',
        fontSize: '1.1rem',
        display: 'flex',
        marginTop: '10px',
        border: '1px solid #B6B6B6',
        textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start'
    };

    const sendClick = () => {
        navigate(URL);
    };

    return (
        <button 
            onClick={sendClick}
            className='items-left justify-center text-center'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ ...defaultStyle, ...style }}>
            {buttonText}
        </button>
    );
};

export default BackButton;