import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const BackButton = ({ navigateTo = '/' }) => {
    const [isHoveredBack, setIsHoveredBack] = useState(false);
    const navigate = useNavigate();

    return (
        <button
            onMouseEnter={() => setIsHoveredBack(true)}
            onMouseLeave={() => setIsHoveredBack(false)}
            onClick={() => navigate(navigateTo)}
            className='items-left justify-center text-center'
            style={{ 
                width: '120px', 
                height: '45px', 
                backgroundColor: isHoveredBack ? '#b5b5b5' : '#d6d6d6', 
                color: isHoveredBack ? 'white' : 'white', 
                padding: '8px', 
                fontWeight: 'bold', 
                borderRadius: '50px',
                fontSize: '1.1rem',
                display: 'flex',
                       
                border: '1px solid #B6B6B6',
                textShadow: isHoveredBack ? '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black' : '-1px 0 #575757, 0 1px #575757, 1px 0 #575757, 0 -1px #575757',
                alignSelf: 'flex-start'
            }}
        >
            Back
        </button>
    );
};

export default BackButton;