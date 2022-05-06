import { MessageComponent } from 'components/Message';
import React from 'react';
import PropTypes from 'prop-types';
/**
 * @author
 * @function MessagePage
 **/

export const MessagePage = ({socket}) => {
  return (
    <div>
      <MessageComponent socket={socket}/>
    </div>
  );
};

MessagePage.propTypes ={
    socket: PropTypes.object
}
