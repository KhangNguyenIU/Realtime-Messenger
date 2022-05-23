import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { stringCut } from 'utils';
import { useSelector } from 'react-redux';
import { Avatar, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { TYPE_TEXT } from 'constants';
import { TYPE_IMAGE } from 'constants';
/**
 * @author
 * @function GroupMessage
 **/

const MAX_LENTH_DISPLAY = 20;

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export const GroupMessage = ({ groupInfo, handleClick, socket }) => {
  const user = useSelector((state) => state.auth.user);
  const [isReaded, setIsReaded] = useState(true);
  console.log(groupInfo);
  useEffect(() => {
    //default case when data is not already loaded
    if (!groupInfo?.messages[0]?.readByRecipients) {
      setIsReaded(true);
      return;
    }

    // check when data is aldready loaded
    let checkReaded = groupInfo?.messages[0]?.readByRecipients?.find(
      (x) => x.readByUserId === user._id
    )
      ? true
      : false;
    setIsReaded(checkReaded);
  }, [socket, groupInfo, user]);

  return (
    <div className="wrapper">
      <div
        className={`group-chat-wrapper ${!isReaded && 'is-not-readed'}`}
        onClick={() => handleClick(groupInfo)}
      >
        <div className="img-box">
          <Stack direction="row" spacing={2}>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar
                sx={{ width: 46, height: 46 }}
                src={groupInfo?.avatar}
                alt="group-avatar"
              />
            </StyledBadge>
          </Stack>
        </div>
        <div className="group-info">
          <div className="group-name">
            <span className="name-text">
              {stringCut(groupInfo.name, MAX_LENTH_DISPLAY)}
            </span>
            <span className="time-text">12h20</span>
          </div>
      
          <DisplayMessageContent message={groupInfo?.messages[0]} />
        </div>
      </div>
    </div>
  );
};

// *This compoent diplay message content due to the type of message
const DisplayMessageContent = ({ message }) => {
  // console.log(message)
  const mess = useMemo(() => {
    if (message?.type === TYPE_TEXT) {
      return stringCut(message?.message, MAX_LENTH_DISPLAY);
    }
    if (message?.type === TYPE_IMAGE) {
      return message?.postedBy?.username + ' sent an image';
    }
  }, [message]);

  return <div className="group-last-message">{mess}</div>;
};

GroupMessage.propTypes = {
  groupInfo: PropTypes.object,
};
