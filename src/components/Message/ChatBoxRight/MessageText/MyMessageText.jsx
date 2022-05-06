import React from 'react';

/**
* @author
* @function MyMessageText
Message that writen by own user
**/

export const MyMessageText = ({ message }) => {
  return <div className="my-message">
    <div className='my-message-content'>
    {message.message}
    </div>
  </div>;
};
