import React, { useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {
  Avatar,
  Button,
  DialogContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import { Box } from '@mui/system';
import { useSelector } from 'react-redux';

/**
 * @author
 * @function ForwardMessageModal
 **/

export const ForwardMessageModal = ({
  openDialog,
  handleCloseDialog,
  chatRooms,
  socket,
  forwardMessage,
}) => {
  const GroupForward = ({ room, socket, forwardMessage }) => {
    const user = useSelector((state) => state.auth.user);
    const [isForwarded, setForwared] = useState(false);

    const handleClick = (e) => {
      e.preventDefault();
      if (socket && forwardMessage !== '' && !isForwarded) {
        let messagePacket = {
          chatRoomId: room._id,
          message: forwardMessage,
          postedBy: user._id,
        };

        socket.emit('send-message', messagePacket);
        setForwared(true);
      }
    };
    return (
      <React.Fragment>
        <ListItem>
          <Box
            display="flex"
            alignItems="center"
            width="100%"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <ListItemAvatar>
                <Avatar src={room.avatar} alt="group-avatar"></Avatar>
              </ListItemAvatar>
              <ListItemText primary={room.name} />
            </Box>
            <Button 
            onClick={handleClick}>
                {!isForwarded ? "Send" : <CheckIcon/>}
                </Button>
          </Box>
        </ListItem>
      </React.Fragment>
    );
  };
  return (
    <div>
      <Dialog
        scroll="paper"
        onClose={handleCloseDialog}
        open={openDialog}
        maxWidth="xs"
      >
        <DialogTitle sx={{ textAlign: 'center' }}>Forward message</DialogTitle>
        <Divider />
        <DialogContent dividers={true}>
          <List>
            {!!chatRooms.length &&
              chatRooms.map((room, index) => (
                <GroupForward
                  room={room}
                  key={index}
                  socket={socket}
                  forwardMessage={forwardMessage}
                />
              ))}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
};
