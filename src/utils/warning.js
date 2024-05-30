import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {
   const { onClose, onOK, open, title, message, ...other } = props;

   return (
      <div>
         <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
               style: {
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
               },
            }}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'>
            <DialogTitle id='alert-dialog-title'>{title ? title : 'Warning'}</DialogTitle>
            <DialogContent>
               <DialogContentText id='alert-dialog-description'>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={onClose} color='primary' autoFocus>
                  cancel
               </Button>
               <Button onClick={onOK} color='primary'>
                  OK
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}
