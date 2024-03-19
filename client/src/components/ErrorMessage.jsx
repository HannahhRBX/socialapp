import React from 'react';

const ErrorMessage = ({ message }) => {
    return (
        
        <h2 className="col-span-2 text-md font-bold" style={{color: '#ff2121', marginBottom: '-10px', textAlign:'center'}}>
            {message}
        </h2>
    );
};

export default ErrorMessage;