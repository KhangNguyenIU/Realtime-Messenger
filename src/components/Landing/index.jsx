import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import messageService from 'services/message/message.service';
import ChatIcon from '@mui/icons-material/Chat';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import LogoutIcon from '@mui/icons-material/Logout';
import { signoutUser } from 'slices/Auth/auths.slice';
/**
 * @author
 * @function LandingComponent
 **/

export const LandingComponent = ({ socket }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  return (
    <div className="main">
      <div className="left" style={{ zIndex: '9999' }}>
        <div className="hero">
          <div className="hero-title">
            {!user
              ? 'Hey, are you ready to chat with your friends?'
              : `Hey, ${user.username} Welcome back!`}
          </div>

          <div className="hero-content">
            {!user
              ? 'Sign in to start chatting with your friends'
              : 'Let checkout your newest message'}
          </div>

          <div>
            {!user ? (
              <button className="button" onClick={() => navigate('/auth')}>
                Sign in
              </button>
            ) : (
              <div>
                <IconButton onClick={() => navigate('/message')}>
                  <ChatIcon
                    className="navigate-tool"
                    sx={{ fontSize: '3rem', color: 'white' }}
                  />
                </IconButton>
                <IconButton onClick={()=>dispatch(signoutUser())}>
                  <LogoutIcon sx={{ fontSize: '3rem', color: 'white' }} />
                </IconButton>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="right">
        <div className="abstract">
          <div
            className="hero-figure-box hero-figure-box-01"
            data-rotation="45deg"
          >
            <div
              className="hero-figure-box hero-figure-box-02"
              data-rotation="-45deg"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
