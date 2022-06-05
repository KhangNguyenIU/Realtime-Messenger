import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { showNotification } from 'slices/Common/notification.slice';
import { hideLoading, showLoading } from 'slices/Common/loading.slice';
import chatroomService from 'services/chatroom/chatroom.service';
import { updateChatroom } from 'slices/Chatroom/chatroom.slice';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {
  Button,
  DialogActions,
  DialogContent,
  Divider,
} from '@mui/material';


/**
 * @author
 * @function TimeModal
 **/

export const TimeModal = ({ openDialog, handleCloseDialog, setChecked }) => {
  
  const [value, setValue] = useState(30);
  const dispatch = useDispatch();
  const currentChat = useSelector((state) => state.currentRoom);
  const turnAutoDeleteOn = async () => {
    if (currentChat) {
      dispatch(showLoading());
      try {
        const res = await chatroomService.turnAutoDelete(currentChat._id, {
          autoDelete: true,
          duration: value * 100,
        });

        if (res) {
          dispatch(
            showNotification({
              message: 'Auto delete turn on',
              type: 'success',
            })
          );
          dispatch(updateChatroom({ autoDelete: true, duration: value * 100 }));
          dispatch(hideLoading());
          handleCloseDialog();
          setChecked(true);
        }
      } catch (error) {
        dispatch(
          showNotification({
            message: 'Error in turn auto delete on',
            type: 'error',
          })
        );
        dispatch(hideLoading());
      }
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
          Set expire time for message
        </DialogTitle>
        <Divider />
        <DialogContent dividers={true}>
          <Box sx={{ width: 300, height: 100, mt: 10 }}>
            <Slider
              aria-label="Custom marks"
              defaultValue={30}
              step={10}
              valueLabelDisplay="auto"
              onChange={(e, val) => setValue(val)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={turnAutoDeleteOn}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
