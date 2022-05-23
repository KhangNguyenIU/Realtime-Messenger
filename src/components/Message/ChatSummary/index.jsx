import React, { useRef, useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Gallery } from './Gallery';
import { Avatar, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
/**
 * @author
 * @function ChatSummary
 **/

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
export const ChatSummary = ({ groupInfo }) => {
  const galleryRef = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    console.log({ groupInfo });
  });
  useEffect(() => {
    if (galleryRef.current) {
      setDimension({
        width: galleryRef.current.offsetWidth,
        height: galleryRef.current.offsetHeight,
      });
    }
  }, []);
  return (
    <React.Fragment>
      <div className="tool-part">
        <div className="tool-part-header">
          <span>Chat detail</span>
          <CloseIcon />
        </div>
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
      </div>

      <div className="shared-photo">
        <div className="shared-photo-header">
          <span>Shared photos</span>
          <span>See more</span>
        </div>

        <div className="shared-photo-gallery" ref={galleryRef}>
          <Gallery parentRef={galleryRef} />
        </div>
      </div>

      <div className="members">
        <div className="members-header">
          <span>Members</span>
        </div>
        <div className="members-list">
          {groupInfo?.participants?.map((member, index) => (
            <div className="member-item" key={index}>
              <Stack direction="row" spacing={2}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
              color='secondary'
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
                  {member?.status || 'Offline'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};
