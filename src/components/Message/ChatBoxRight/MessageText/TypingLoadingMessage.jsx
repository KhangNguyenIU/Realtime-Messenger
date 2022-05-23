import { USER_ON_TYPING_SOUND } from 'constants';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { playSound, stopSound } from 'slices/Common/sound.slice';
import { detectWhoIsTyping } from 'utils';

/**
 * @author
 * @function TypingLoadingMessage
 **/

export const TypingLoadingMessage = ({isTypingList}) => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(playSound({sound: USER_ON_TYPING_SOUND, play: true, playInLoop: true}))

        return ()=> dispatch(stopSound())
    },[])

  return (
    <React.Fragment>
      <div className="message-content is-typing">
        <div className="message-typing-wrapper">
          <div className="message-typing">
            <div className="dot-flashing"></div>
          </div>
          <p  className="is-typing-text" style={{color: 'white'}}>
          {detectWhoIsTyping(isTypingList)}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};
