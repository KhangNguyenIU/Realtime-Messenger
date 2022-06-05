import React, { useState, useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {
  Button,
  DialogContent,
  Divider,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import { showNotification } from 'slices/Common/notification.slice';
import { hideLoading, showLoading } from 'slices/Common/loading.slice';

import Box from '@mui/material/Box';
import chatroomService from 'services/chatroom/chatroom.service';


/**
 * @author
 * @function LeaveChatModal
 **/

export const LeaveChatModal = ({
  openDialog,
  handleCloseDialog,
  removeRooms
}) => {
  const dispatch = useDispatch();
    const currentChat = useSelector((state) => state.currentRoom);
  const leaveChat = async () => {
    try {
      dispatch(showLoading());
      const res = await chatroomService.leaveChatroom(currentChat?._id);
      if (res) {
        console.log(res)
        removeRooms(currentChat?._id);
        dispatch(
          showNotification({
            type: 'success',
            message: 'Leave chat successfully',
          })
        );
        dispatch(hideLoading());
        handleCloseDialog();
      }
    } catch (error) {
      dispatch(
        showNotification({
          type: 'error',
          message: 'Cannot leave room, please try later',
        })
      );
      dispatch(hideLoading());
      handleCloseDialog();
    }
  };

  return (
    <div>
      <Dialog
        scroll="paper"
        onClose={handleCloseDialog}
        open={openDialog}
        maxWidth="md"
      >
        <DialogTitle sx={{ textAlign: 'center' }}>
          Are you sure to leave this chat room?
        </DialogTitle>
        <Divider />
        <DialogContent dividers={true}>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleCloseDialog}
            >
              Cancel
            </Button>

            <Button 
            variant="outlined" 
            color="primary"
            onClick={leaveChat}
            >
              Leave
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};
