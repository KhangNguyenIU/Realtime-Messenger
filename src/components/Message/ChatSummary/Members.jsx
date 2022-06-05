import { Avatar, Badge, Stack } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import { styled } from '@mui/material/styles';
/**
 * @author
 * @function Members
 **/

const StyledBadge = styled(Badge)(({ theme }, isonline) => ({
  '& .MuiBadge-badge': {
    display: isonline === 'true' ? 'flex' : 'none',
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

export const Members = (props) => {
  const currentRoom = useSelector((state) => state.currentRoom);
  return (
    <div className="members">
      <div className="members-header">
        <span>Members</span>
      </div>
      <div className="members-list">
        {currentRoom?.participants?.map((member, index) => (
          <div className="member-item" key={index}>
            <Stack direction="row" spacing={2}>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                color="secondary"
                isonline={member?.isOnline.toString()}
              >
                <Avatar
                  sx={{ width: 36, height: 36 }}
                  src={member?.avatar}
                  alt="group-avatar"
                />
              </StyledBadge>
            </Stack>

            <div>
              <span className="user-name">{member?.username}</span>
              <span className="user-status">
                {member?.isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
