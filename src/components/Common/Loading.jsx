import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import { LOADING_GENERAL } from 'constants';

export default function Loading() {
  const [open, setOpen] = React.useState(true);
  const loading = useSelector(state =>state.loading)
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading.show && loading.type === LOADING_GENERAL}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}