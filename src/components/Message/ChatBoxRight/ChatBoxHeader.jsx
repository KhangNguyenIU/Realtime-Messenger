import React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { Avatar, AvatarGroup } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSelector } from 'react-redux';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
/**
 * @author
 * @function ChatBoxHeader
 **/

export const ChatBoxHeader = () => {
    const groupInfo = useSelector(state=>state.currentRoom);
    console.log(groupInfo);
  return (
    <div className="chatbox-header">
      <div className="chatbox-header-info">
        <Avatar alt="group-avater" src={groupInfo?.avatar} />
        <div className="group-header-info">
          <span className='group-name'>{groupInfo?.name}</span>
          <span className='group-member-numbers'>{groupInfo?.participants?.length} Members</span>
        </div>
      </div>

      {
          groupInfo?.autoDelete && (
            <div className='chatbox-header-clock'>
                <AccessAlarmsIcon sx={{color: 'white'}}/>
                <span style={{color:'white'}}>{groupInfo.duration} ms</span>
            </div>
          )
      }
      <div className="chatbox-tool-info">
        <SearchIcon />
        <MoreHorizIcon />
        <AvatarGroup max={2}>
            {
                groupInfo?.participants?.map((item,index)=>(
                    <Avatar size={20} key={index} src={item.avatar} />
                ))
            }
        </AvatarGroup>
      </div>
    </div>
  );
};
