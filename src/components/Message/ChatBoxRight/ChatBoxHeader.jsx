import React from 'react';
import InfoIcon from '@mui/icons-material/Info';
/**
 * @author
 * @function ChatBoxHeader
 **/

export const ChatBoxHeader = ({ groupInfo }) => {
  return (
    <div className="chatbox-header">
      <div className='chatbox-header-info'>
        <img alt="group-avater" src={groupInfo?.avatar} />
        <p style={{color: 'white'}}>{groupInfo?.name}</p>
      </div>
      <div className="chatbox-tool-info">
        <InfoIcon sx={{ color: 'white' }} />
      </div>
    </div>
  );
};
