import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import PropTypes from 'prop-types';
import React from 'react';

AlertDialog.propTypes = {
  open: PropTypes.bool,
  onAccept: PropTypes.func,
  onClose: PropTypes.func,
};

AlertDialog.defaultProps = {
  open: false,
  onAccept: null,
  onClose: null,
};

function AlertDialog({ open, onAccept, onClose }) {
  const handleClose = () => {
    onClose?.();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <WarningRoundedIcon />
          {'Warning!'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove the product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => onAccept?.()} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialog;
