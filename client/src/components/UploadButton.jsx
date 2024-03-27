import React, { useState,useRef } from 'react';

// Button component with submit function for completing forms
const UploadButton = ({ buttonText, style, backgroundColor, hoverColor }) => {
    const [isHovered, setIsHovered] = useState(false);
    const hiddenFileInput = useRef(null);
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
        textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
    };
    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    return (
        <div style={{...defaultStyle, ...style}}>
            <button
                onClick={handleClick}
                className='col-span-1 mx-auto items-center justify-center text-center'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                >
                {buttonText}
            </button>
            <input type="file" name="myfile" style={{display: 'none'}} ref={hiddenFileInput}/>
        </div>
    );
};

export default UploadButton;