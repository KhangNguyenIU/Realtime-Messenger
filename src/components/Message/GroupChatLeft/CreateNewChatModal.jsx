import React, { useState, useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {
  Avatar,
  Button,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  TextField,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import userService from 'services/user/user.service';
import { Add, Remove } from '@mui/icons-material';
import chatroomService from 'services/chatroom/chatroom.service';
import { showNotification } from 'slices/Common/notification.slice';
import { hideLoading, showLoading } from 'slices/Common/loading.slice';

/**
 * @author
 * @function CreateNewChatModal
 **/

export const CreateNewChatModal = ({ openDialog, handleCloseDialog ,getChatRooms}) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [userList, setUserlist] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
const dispatch = useDispatch()
  useEffect(() => {
    getUserListData();
  }, []);



  const checkCanSubmit = () => {
    //   console.log(selectedUser , text)
    return selectedUser.length > 0 && text.length > 0
  };
  const getUserListData = async () => {
    try {
      const res = await userService.getUsersList();
      if (res) {
        setLoading(false);
        setUserlist(res.data.users);
      }
    } catch (error) {
      // console.log(error)
    }
  };

  const onSubmit = async ()=>{
    try {
        dispatch(showLoading())
        let body ={
            name: text,
            participants: selectedUser
        }
      const res = await chatroomService.createChatroom(body);
      if(res){
        handleCloseDialog();
        dispatch(showNotification({message: 'Chatroom created successfully' , type: 'success'}))
        getChatRooms(false)
        dispatch(hideLoading())
      }
    } catch (error) {
        dispatch(showNotification({message: "Cannot create chatroom now, please try again later", type: 'error'}))
        dispatch(hideLoading())

    }
  }
  return (
    <div>
      <Dialog
        scroll="paper"
        onClose={handleCloseDialog}
        open={openDialog}
        maxWidth="md"
      >
        <DialogTitle sx={{ textAlign: 'center' }}>
          Create new chat room
        </DialogTitle>
        <Divider />
        <DialogContent dividers={true}>
          <TextField
            id="standard-basic"
            label="Group Name"
            variant="standard"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <List>
            {loading ? (
              <div style={{ display: 'flex' }}>
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={40}
                  height={40}
                />
                <Skeleton
                  animation="wave"
                  width="60%"
                  height={40}
                  sx={{ marginLeft: '1rem' }}
                />
              </div>
            ) : (
              userList.map((user, index) => (
                <UserDisplay
                  user={user}
                  key={index}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              ))
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button disabled={!checkCanSubmit()} onClick={onSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const UserDisplay = ({ user, selectedUser, setSelectedUser }) => {
  const handleClick = (e) => {
    const index = selectedUser.indexOf(user._id);
    // console.log(index)
    if (index === -1) {
      setSelectedUser([...selectedUser, user._id]);
    } else {
      let tempt = [...selectedUser];
      tempt.splice(index, 1);
      setSelectedUser([...tempt]);
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
          <Box display="flex" alignItems="center" sx={{ width: '200px' }}>
            <ListItemAvatar>
              <Avatar src={user.avatar} alt="group-avatar"></Avatar>
            </ListItemAvatar>
            <ListItemText primary={user?.username} />
          </Box>
          <IconButton onClick={handleClick}>
            {selectedUser.includes(user._id) ? <Add /> : <Remove />}
          </IconButton>
        </Box>
      </ListItem>
    </React.Fragment>
  );
};
