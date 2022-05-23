import React from 'react';
import { GroupMessage } from './GroupMessage';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
/**
 * @author
 * @function GroupMessageList
 **/

export const GroupMessageList = ({
  chatRooms,
  setCurrentChatRoom,
  currentChatRoom,
  socket,
}) => {
    
  const handleClick = (chatRoom) => {
    if (socket && currentChatRoom) {
      socket.emit('leaveRoom', currentChatRoom._id);
    }
    setCurrentChatRoom(chatRoom);
  };

  return (
    <React.Fragment>
      <div className='left-wrapper'>
        <div className="group-search">
          <SearchIcon className='icon'/>
          <input type="text" placeholder='Search...'/>
        </div>

        <div className="message-divider">
            <div className="message-divider-text">
                <span>Messages</span>
                <KeyboardArrowDownIcon className='icon'/>
            </div>
            <RestartAltIcon className='restart-icon'/>
        </div>
        <div className='group-list'>
          {!!chatRooms.length &&
            chatRooms.map((room, index) => (
              <GroupMessage
                socket={socket}
                key={index}
                groupInfo={room}
                handleClick={handleClick}
              />
            ))}
        </div>
      </div>
    </React.Fragment>
  );
};
