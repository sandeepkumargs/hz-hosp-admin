import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { connect } from 'react-redux';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { deleteUser } from '../actions';
import AlertDialog from '../../../utils/warning';
import Alert from '../../../utils/Alert';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
   typography: {
      padding: theme.spacing(2),
   },
}));

function MoreActions(props) {
   const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
   const classes = useStyles();
   const [error, setError] = React.useState(true);
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [warning, setWarning] = React.useState(false);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
      setWarning(false);
   };

   const deleteHandler = () => {
      const id = props.tableMeta.rowData[0];
      props.deleteUser({
         id,
         jwt_token: userDetails.jwt_token,
      });
      setAnchorEl(null);
      setWarning(false);
   };
   const open = Boolean(anchorEl);
   const id = open ? 'simple-popover' : undefined;
   const _handleClose = () => {};
   const onClick = () => {
      setError(false);

      if (props.users.status == 422) {
         props.history.push('/login');
      }
   };
   const history = useHistory();
   return (
      <div>
         <MoreVertIcon
            aria-describedby={id}
            variant='contained'
            color='primary'
            onClick={handleClick}>
            Open Popover
         </MoreVertIcon>
         <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            transformOrigin={{
               vertical: 'top',
               horizontal: 'left',
            }}>
            <Typography variant='button'>
               <Button
                  id='button'
                  color='primary'
                  className={classes.typography}
                  onClick={() => {
                     history.push(
                        `/editProfileInfo?${
                           props.tableMeta.rowData[0] +
                           '-' +
                           props.tableMeta.rowData[1] +
                           '-' +
                           props.tableMeta.rowData[2] +
                           '-' +
                           props.tableMeta.rowData[3]
                        }`
                     );
                  }}
                  fullWidth>
                  <EditOutlinedIcon className='iconStyle' /> &nbsp; Edit profile info
               </Button>
               <br></br>
               <Button
                  id='button'
                  color='primary'
                  className={classes.typography}
                  onClick={() => {
                     history.push(
                        `/changePassword?${
                           props.tableMeta.rowData[0] +
                           '-' +
                           props.tableMeta.rowData[1] +
                           '-' +
                           props.tableMeta.rowData[2] +
                           '-' +
                           props.tableMeta.rowData[3]
                        }`
                     );
                  }}
                  fullWidth>
                  <LockOpenOutlinedIcon className='iconStyle' /> Change Password
               </Button>
               <br></br>
               {userDetails.email !== props.tableMeta.rowData[2] ? (
                  <Button
                     id='button'
                     fullWidth
                     style={{
                        // backgroundColor: "transparent",
                        // paddingLeft: 25,
                        padding: 13,
                     }}
                     // // className='iconStyle'
                     color='secondary'
                     onClick={() => {
                        setWarning(true);
                     }}>
                     <DeleteOutlineIcon /> Delete
                  </Button>
               ) : null}
            </Typography>
         </Popover>
         {warning ? (
            <AlertDialog
               title='Delete'
               open={warning}
               onClose={handleClose}
               onOK={deleteHandler}
               message={'Are you sure about deleting account?'}
            />
         ) : null}
         {props.users.error && error ? (
            <Alert
               isOpen={props.users.error}
               onClose={_handleClose}
               hasTwoButtons={false}
               handleSubmit={onClick}
               status={props.users.status}
               title='User Management'
               text={props.users.message}
               submitButtonText='OK'
            />
         ) : null}
      </div>
   );
}
const mapStateToProps = (state) => {
   return {
      users: state.users,
   };
};
const mapDispatchToProps = (dispatch) => {
   return {
      deleteUser: (user) => dispatch(deleteUser(user)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoreActions);
