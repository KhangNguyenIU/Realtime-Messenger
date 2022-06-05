import React from 'react';
import { useSelector } from 'react-redux';


import { Avatar } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
/**
 * @author
 * @function
 **/

export const GroupHeader = (props) => {
  const currentRoom = useSelector((state) => state.currentRoom);
  return (
    <div className="tool-part">
      <Avatar
        className="avatar"
        src={currentRoom?.avatar}
        alt="group-avatar"
        sx={{ width: 100, height: 100 }}
      />
      <p className="group-name">{currentRoom?.name}</p>

      <ToolButtons />
    </div>
  );
};


const ToolButtons =()=>{
    return (
        <div className="tool-buttons">
          <div>
            <NotificationsNoneOutlinedIcon />
          </div>

          <div>
            <GroupAddOutlinedIcon />
          </div>

          <div>
            <InfoOutlinedIcon />
          </div>

          <div>
            <LogoutOutlinedIcon />
          </div>
        </div>
    )
}