import React from 'react';
import { useSelector } from 'react-redux';
import { MessageText } from './MessageText';
import { MyMessageText } from './MyMessageText';

/**
 * @author
 * @function Message
 **/

export const Message = ({ message , handleOpenDialog,setForwardMessage }) => {
  const user = useSelector((state) => state.auth.user);
  const isMyMessage = message.postedBy._id === user._id;
  
  return (
    <React.Fragment>
      {isMyMessage ? (
        <MyMessageText message={message} />
      ) : (
        <MessageText 
        message={message}
         handleOpenDialog={handleOpenDialog}
         setForwardMessage={setForwardMessage}
         />
      )}
    </React.Fragment>
  );
};
