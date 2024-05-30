import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { isWidthUp } from '@material-ui/core/withWidth';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../../components/UserManagement/actions/index';
import Grid from '@material-ui/core/Grid';
import AlertDialog from '../../utils/warning';
import { getPostCodes } from '../../components/Hotel/actions';
import { getAllUsers } from '../../components/UserManagement/actions/index';
import { getJwtToken } from '../../config';
const useStyles = makeStyles((theme) => ({
   header: {
      // fontWeight: 500,
      minWidth: 0,
      // fontSize: 18,
      // flexGrow: -1,
   },
   grow: {
      flexGrow: 1,
   },

   HeadIconNotf: {
      right: '70px',
      height: '100%',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   HeadIcon: {
      right: '20px',
      height: '100%',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   HeadIconDrop: {
      right: '2px',
      height: '100%',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '5px',
   },
}));

function HeaderNav(props) {
   const classes = useStyles();
   const [warning, setWarning] = React.useState(false);
   let userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
   if (!userDetails) {
      window.location = '/login';
   }
   const handleClose = () => {
      setWarning(false);
   };

   const handleLogout = () => {
      setWarning(false);
      sessionStorage.removeItem('userDetails');
      sessionStorage.clear();
      // props.logOut();
   };

   React.useEffect(() => {
      props.getPostCodes();
   }, []);
   React.useEffect(() => {
      props.getAllUsers();
   }, []);
   let getAlluser = props.usersList.users;
   let username;
   getAlluser.forEach(element => {
      if(element.email === getJwtToken().email){
         username = element.fullname;
      }
      
   });
   return (
      <>
         <div className={classes.grow} />
         <Typography noWrap variant='button' color={'primary'}>
            {userDetails ? username : ''}
         </Typography>
         <div>
            <Grid
               container
               wrap='nowrap'
               // direction="row"
               justify='flex-end'
               alignItems='center'
               spacing={2}>
               <Grid item xs={12}>
                  <Button
                     variant='contained'
                     color='primary'
                     style={{ marginLeft: 10 }}
                     // disableFocusRipple={true}
                     // disableRipple={true}
                     onClick={() => {
                        setWarning(true);
                     }}>
                     Log out
                  </Button>
               </Grid>
            </Grid>
            {warning ? (
               <AlertDialog
                  title='Log out'
                  open={warning}
                  onClose={handleClose}
                  onOK={handleLogout}
                  message={'Are you sure you wish to Log out?'}
               />
            ) : null}
         </div>
      </>
   );
}
const mapStateToProps = (state) => {
   return {
      usersList: state.users,
   };
};
const mapDispatchToProps = (dispatch) => {
   return {
      logOut: () => dispatch(logOut()),
      getPostCodes: () => dispatch(getPostCodes()),
      getAllUsers: () => dispatch(getAllUsers())
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNav);
