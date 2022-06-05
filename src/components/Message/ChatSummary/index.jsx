import React, { useRef, useEffect, useState } from 'react';

import { FunctionList } from './FunctionList';
import useToggle from 'hooks/useToggle';
import { GroupHeader } from './GroupHeading';
import { Members } from './Members';
import { Gallery } from './Gallery';
/**
 * @author
 * @function ChatSummary
 **/

export const ChatSummary = ({ removeRooms, chatSummaryRef }) => {
  const galleryRef = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

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
      <GroupHeader />
      <Gallery chatSummaryRef={chatSummaryRef}/>
      <Members />
      <FunctionList removeRooms={removeRooms} />
    </React.Fragment>
  );
};
