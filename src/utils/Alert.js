import React from 'react';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
// import Alert from '@material-ui/lab/Alert';
// function Transition(props) {
//   return <Slide direction="up" {...props} />
// }

export default function Alert({
   handleClose,
   handleSubmit,
   isOpen,
   hasTwoButtons = false,
   submitButtonText,
   title,
   text,
   status,
}) {
   return (
      <div
         style={{
            backgroundColor: '#FFFFFF',
            color: '#000000',
         }}>
         <Dialog
            open={isOpen}
            PaperProps={{
               style: {
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
               },
            }}
            // transition={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby='alert-dialog-slide-title'
            aria-describedby='alert-dialog-slide-description'>
            <DialogTitle style={{ fontWeight: 'bold' }}>
               {status == 200 ? 'Success' : status >= 400 ? 'Warning' : title}
            </DialogTitle>

            <DialogContent style={{ minWidth: 300 }}>
               <DialogContentText>
                  {text == 'Invalid token'
                     ? text + ' or Session out, please do login again.'
                     : text}
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               {hasTwoButtons ? (
                  <Button
                     id='button'
                     style={{ fontWeight: 'bold' }}
                     onClick={handleClose}
                     variant='raised'
                     color='primary'>
                     {'CANCEL'}
                  </Button>
               ) : null}
               <Button
                  id='button'
                  style={{ fontWeight: 'bold' }}
                  onClick={handleSubmit}
                  color='primary'>
                  {submitButtonText}
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}
