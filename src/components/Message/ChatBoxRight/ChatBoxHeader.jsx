import React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
/**
 * @author
 * @function ChatBoxHeader
 **/

export const ChatBoxHeader = ({ groupInfo }) => {
  return (
    <div className="chatbox-header">
      <div className="chatbox-header-info">
        {/* <img alt="group-avater" src={groupInfo?.avatar} /> */}
        <Avatar alt="group-avater" src={groupInfo?.avatar} />
        <div className="group-header-info">
          <span className='group-name'>{groupInfo?.name}</span>
          <span className='group-member-numbers'>9 members</span>
        </div>
      </div>
      <div className="chatbox-tool-info">
        {/* <InfoIcon sx={{ color: 'white' }} /> */}
        <SearchIcon />
        <MoreHorizIcon />
      </div>
    </div>
  );
};
