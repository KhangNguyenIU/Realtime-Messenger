import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { showNotification } from "slices/Common/notification.slice";

/**
 * @author Khang Duy
 * @function Notification
 **/

export const Notification = () => {
  const noti = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(showNotification({ show: false }));
  };


  return (
    <div>
      <Snackbar
        open={noti.show}
        autoHideDuration={noti.duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={noti.type}
          sx={{ width: "100%" }}
        >
          {noti.message}
        </Alert>
      </Snackbar>

    </div>
  );
};
