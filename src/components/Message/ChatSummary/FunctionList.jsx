import { Switch } from '@mui/material';
import useToggle from 'hooks/useToggle';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import chatroomService from 'services/chatroom/chatroom.service';
import { updateChatroom } from 'slices/Chatroom/chatroom.slice';
import { hideLoading, showLoading } from 'slices/Common/loading.slice';
import { showNotification } from 'slices/Common/notification.slice';
import { LeaveChatModal } from './LeaveChatModal';
import { TimeModal } from './TimeModal';

/**
 * @author
 * @function FunctionList
 **/

export const FunctionList = ({ removeRooms }) => {
  const [checked, setChecked] = React.useState(false);
  const [toggle, handleOpenToggle, handleCloseToggle] =
    useToggle(false);
  const [openLeaveModal, handleOpenLeaveModal, handleCloseLeaveModal] =
    useToggle(false);
  const currentChat = useSelector((state) => state.currentRoom);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentChat?.autoDelete) {
      setChecked(currentChat?.autoDelete);
    }
  }, [currentChat]);
  
  const handleChangeSwitch = async () => {
    if (checked && currentChat) {
      dispatch(showLoading());
      try {
        const res = await chatroomService.turnAutoDelete(currentChat._id, {
          autoDelete: false,
          duration: 0,
        });
        if (res) {
          dispatch(
            showNotification({
              message: 'Auto delete turn off',
              type: 'success',
            })
          );
          dispatch(updateChatroom({ autoDelete: false, duration: 0 }));
          dispatch(hideLoading());
          setChecked(false);
        }
      } catch (error) {
        dispatch(
          showNotification({
            message: 'Error in turn auto delete off',
            type: 'error',
          })
        );
        dispatch(hideLoading());
      }
    } else {
      handleOpenToggle();
    }
  };
  return (
    <React.Fragment>
      <div className="function-list">
        <div className="function-item">
          <p>Auto delete message</p>
          <Switch checked={checked} onChange={handleChangeSwitch} />
        </div>

        <div className="function-item">
          <p onClick={handleOpenLeaveModal}>Leave the chat</p>
        </div>
      </div>

      <TimeModal
        openDialog={toggle}
        handleCloseDialog={handleCloseToggle}
        setChecked={setChecked}
      />
      <LeaveChatModal
        openDialog={openLeaveModal}
        handleCloseDialog={handleCloseLeaveModal}
        removeRooms={removeRooms}
      />
    </React.Fragment>
  );
};
