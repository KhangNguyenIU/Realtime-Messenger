import React, { useEffect, useMemo, useState } from 'react';

import useComponentSize from 'hooks/useComponentSize';
import { useDispatch, useSelector } from 'react-redux';
import messageService from 'services/message/message.service';
import { showNotification } from 'slices/Common/notification.slice';
import { Skeleton } from '@mui/material';
/**
 * @author
 * @function Gallery
 **/

const GAP = 40;

export const Gallery = ({ chatSummaryRef }) => {
  //   console.log(parentRef);
  const dispatch = useDispatch();
  const currentRoom = useSelector((state) => state.currentRoom);
  const { width, height } = useComponentSize(chatSummaryRef);
  const imageWidth = useMemo(() => Math.floor(width / 3) - GAP, [width]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentRoom?._id) {
      getImages();
    }
  }, [currentRoom]);
  const getImages = async () => {
    try {
      setLoading(true);
      const response = await messageService.getImagesOfConversation(
        currentRoom._id
      );
      if (response) {
        setLoading(false);
        setImages(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(
        showNotification({ message: 'Error in loading media', type: 'error' })
      );
    }
  };
  return (
    <React.Fragment>
      <div className="gallery">
          {
              loading ?? (
                <Skeleton variant="rectangular" width={imageWidth}
                height={imageWidth} />
                
              )
          }
        {!!images.length &&
          images.slice(0,2).map((img, index) => (
            <div key={index} className="item">
              <img
                src={img.message}
                alt="media"
                width={imageWidth}
                height={imageWidth}
              />
            </div>
          ))}

        {images?.length > 2 && (
          <div
            className="item number"
            style={{ width: imageWidth, height: imageWidth ,maxWidth:'350px',maxHeight:'350px'}}
          >
            +{images.length}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
