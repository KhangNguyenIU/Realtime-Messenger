import React from 'react';
import { GroupMessage } from './GroupMessage';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { IconButton, Tooltip } from '@mui/material';
import { Add } from '@mui/icons-material';
import useToggle from 'hooks/useToggle';
import { CreateNewChatModal } from './CreateNewChatModal';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useDispatch, useSelector } from 'react-redux';
import { setChatroom } from 'slices/Chatroom/chatroom.slice';
import { LOADING_FETCH_MESSAGES } from 'constants';
import { useNavigate } from 'react-router-dom';
/**
 * @author
 * @function GroupMessageList
 **/

export const GroupMessageList = ({
  chatRooms,
  setCurrentChatRoom,
  currentChatRoom,
  socket,
  getChatRooms,
}) => {
  const [toggle, handleOpenToggle, handleCloseToggle, toggleFn] = useToggle();
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const handleClickListItem = (chatRoom) => {
    if (!loading.show && loading.type !== LOADING_FETCH_MESSAGES) {
      if (socket && currentChatRoom) {
        socket.emit('leaveRoom', currentChatRoom._id);
      }
      setCurrentChatRoom(chatRoom);
      dispatch(setChatroom(chatRoom));
    }
  };

  return (
    <React.Fragment>
      <div className="left-wrapper">
        <div className="group-search">
          <SearchIcon className="icon" />
          <input type="text" placeholder="Search..." />
        </div>

        <div className="message-divider">
          <div className="message-divider-text">
            <div>
              <Tooltip placement="right" title="Create new conversation">
                <IconButton onClick={handleOpenToggle}>
                  <Add sx={{ color: 'white' }} />
                </IconButton>
              </Tooltip>
            </div>
            {/* <KeyboardArrowDownIcon className='icon'/> */}
          </div>
          <RestartAltIcon className="restart-icon" />
        </div>
        <div className="group-list">
          <div className="list">
            {!!chatRooms.length &&
              chatRooms.map((room, index) => (
                <GroupMessage
                  socket={socket}
                  key={index}
                  groupInfo={room}
                  handleClick={handleClickListItem}
                />
              ))}
          </div>
        </div>

        <div className="navigation">
          <Tooltip title="Go back" placement="right">
            <IconButton onClick={()=> navigate('/')}>
              <ArrowBackIosIcon sx={{ color: 'white', cursor: 'pointer' }} />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {toggle && (
        <CreateNewChatModal
          handleCloseDialog={handleCloseToggle}
          openDialog={toggle}
          getChatRooms={getChatRooms}
        />
      )}
    </React.Fragment>
  );
};
