import React, { useState } from 'react';

// Button component with submit function for completing forms
const UserFeed = ({ posts }) => {

    

    return (
        <>
        {posts.map(
            ({
              _id,
              UserId,
              BodyText,
              Image,
              Comments,
              Likes,
              createdAt,
              updatedAt,
            }) => (
                <div className="feed bg-white rounded-xl" style={{width:'100%', height:'100%', marginTop:'25px', paddingTop:'25px',paddingLeft:'25px',paddingRight:'25px'}}>
                    <form style={{height:'100%',width:'100%'}}>
                        <div className="" style={{height:'60%'}} >
                            <textarea className="focus:outline resize-none w-full mb-4 border border-gray-400 p-2 bg-[#f0f2f5]" type="text" placeholder="What's on your mind?" style={{paddingLeft:'12px', paddingTop:'10px', height:'100%', fontSize:'18px', borderRadius:'12px', outlineColor:'#d9d9d9', outlineWidth:'2px', outlineStyle:'none', border: '0px solid #aeaeae'}} />
                        </div>
                        <div style={{width:'100%', height:'30%', paddingTop:'15px', display: 'flex', justifyContent:'center'}}>
                            <p>{BodyText}</p>
                        </div>
                    </form>
                </div>
                    
              
            )
          )}
          </>
    );
};

export default UserFeed;