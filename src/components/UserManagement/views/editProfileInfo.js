//import basic react, router required files
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateUserInfo, updateOneUserInfo } from '../actions';

//Importing Material UI files as per need
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
   TextField,
   FormLabel,
   AppBar,
   Tabs,
   Tab,
   Typography,
   TextareaAutosize,
   Paper,
   Box,
   Button,
   Dialog,
   Radio,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useLocation } from 'react-router-dom';
//Importing reactstrap functions required
import { Row, Form, FormGroup, Label, Input, Col, FormText } from 'reactstrap';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Formik } from 'formik';
import { object, ref, string, boolean } from 'yup';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Spinner from '../../../utils/Spinner';
import Alert from '../../../utils/Alert';
import { getJwtToken } from '../../../config';
//Handling function for the Material UI Tabs
function TabPanel(props) {
   const { children, value, index, ...other } = props;

   return (
      <Typography
         component='div'
         role='tabpanel'
         hidden={value !== index}
         id={`full-width-tabpanel-${index}`}
         aria-labelledby={`full-width-tab-${index}`}
         {...other}>
         {/* Box is the body under the tab (tab hidden here) */}
         <Box p={3}>{children}</Box>
      </Typography>
   );
}

TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.any.isRequired,
   value: PropTypes.any.isRequired,
};

//Customised styling is implemented
const useStyles = makeStyles((theme) => ({
   root: {
      backgroundColor: theme.palette.background.paper,
      margin: theme.spacing(1),
   },
   button: {
      margin: theme.spacing(1),
   },
   MuiAppBar: {
      root: {
         height: '10px',
      },
   },
   MuiPaper: {
      elevation4: {
         boxShadow: 'none',
      },
   },
   dailog: {
      backgroundColor: '#FFFFFF',
      color: '#000000',
   },
   paper: {
      elevation4: {
         boxShadow: 'none',
      },
      backgroundColor: '#FFFFFF',
      color: '#000000',
   },
}));

//Function to render Add logo sub component
function EditProfileInfo(props) {
   const classes = useStyles();
   const theme = useTheme();
   const [error, setError] = React.useState(true);
   const [value, setValue] = React.useState(0);
   const [open, setOpen] = React.useState(false);
   var str = useLocation().search;
   const userData = str.substring(str.lastIndexOf('?') + 1, str.length).split('-');

   const [userType, setUserType] = React.useState(false);

   React.useEffect(() => {
      if (userData[2] && userData[2] == getJwtToken().email) {
         setUserType(true);
      } else {
         setUserType(false);
      }
   }, []);
   //---------------------------------------------------
   const _handleClose = () => {};
   const onClick = () => {
      setError(false);

      if (props.users.status == 422) {
         props.history.push('/login');
      } else if (props.users.status == 200) {
         props.history.push('/userManagement');
      }
   };

   const _handleSubmit = ({
      fullName,
      role,
      email,
      newPass,
      confirmPass,
      setSubmitting,
      resetForm,
   }) => {
      if (userData[2] == getJwtToken().email) {
         props.updateOneUserInfo({ fullname: fullName });
         // setError(true);
         // setSubmitting(false);
      } else {
         props.updateUserInfo({
            fullName,
            role,
            email,
            id: userData[0],
         });
         setError(true);
         setSubmitting(false);
      }
   };

   const onCancel = () => {
      props.history.push('/userManagement');
   };
   //-----------------------
   return (
      <div>
         <Link to={`/userManagement`}>
            <ArrowBackIcon></ArrowBackIcon>
            <Typography variant='button' gutterBottom>
               Back
            </Typography>
         </Link>
         <br />
         <br />
         <Typography variant='h5' style={{ marginLeft: 20 }} gutterBottom>
            Edit User Info
         </Typography>

         {/* ------------------------------Tab desinging in Material UI------------------------------ */}
         <div className={classes.root}>
            <AppBar position='static' color='default'></AppBar>
            {/* ------------------------------Tabs contents in reactstrap------------------------------ */}
            <TabPanel value={value} index={0} dir={theme.direction}>
               <Formik
                  className={classes.root}
                  initialValues={{
                     fullName: userData[1],
                     email: userData[2],
                     role: userData[3] === '1' ? 'Admin' : 'User',
                  }}
                  validationSchema={object().shape({
                     fullName: string()
                        .matches(/^\w*[a-zA-Z]\w*[0-9.@_\\/-\w\s]+$/, 'Please enter valid name')
                        .required('Name is required')
                        .trim(),
                     email: string().required('Email is Required'),
                  })}
                  onSubmit={({ fullName, email, role }, { setSubmitting, resetForm }) =>
                     _handleSubmit({
                        fullName,
                        email,
                        role,
                        setSubmitting,
                        resetForm,
                     })
                  }
                  render={(props) => {
                     const {
                        values,
                        touched,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isValid,
                        isSubmitting,
                     } = props;
                     return isSubmitting ? (
                        <Spinner />
                     ) : (
                        // <Paper className={classes.paper}>
                        <div>
                           <form className='form' onSubmit={handleSubmit}>
                              <Row>
                                 <Col md={4}>
                                    <FormControl fullWidth margin='dense'>
                                       <TextField
                                          required
                                          variant='outlined'
                                          margin='normal'
                                          fullWidth
                                          label='Full Name'
                                          id='fullName'
                                          name='fullName'
                                          autoComplete='fullname'
                                          value={values.fullName}
                                          onChange={(e) => {
                                             handleChange(e);
                                          }}
                                          onBlur={handleBlur}
                                          error={Boolean(touched.fullName && errors.fullName)}
                                          helperText={
                                             touched.fullName && errors.fullName
                                                ? errors.fullName
                                                : ''
                                          }
                                       />
                                    </FormControl>
                                 </Col>
                              </Row>
                              <Row>
                                 <Col md={4}>
                                    <FormControl fullWidth margin='dense'>
                                       <TextField
                                          disabled
                                          required
                                          variant='outlined'
                                          margin='normal'
                                          fullWidth
                                          label='Email'
                                          id='email'
                                          name='email'
                                          type='email'
                                          autoComplete='email'
                                          value={values.email}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          error={Boolean(touched.email && errors.email)}
                                          helperText={
                                             touched.email && errors.email ? errors.email : ''
                                          }
                                       />
                                    </FormControl>
                                 </Col>
                              </Row>
                              {!userType && (
                                 <Row>
                                    <Col md={4}>
                                       <FormGroup>
                                          <Label for='radio-button-demo'> Select User Type</Label>{' '}
                                          <br />
                                          <RadioGroup
                                             aria-label='show'
                                             value={values.role}
                                             onChange={handleChange}
                                             row>
                                             <FormControlLabel
                                                value='Admin'
                                                name='role'
                                                control={<Radio id='role' color='primary' />}
                                                label='Admin'
                                                labelPlacement='top'
                                             />
                                             <FormControlLabel
                                                value='User'
                                                name='role'
                                                control={<Radio id='role' color='primary' />}
                                                label='User'
                                                labelPlacement='top'
                                             />
                                          </RadioGroup>
                                       </FormGroup>
                                    </Col>
                                 </Row>
                              )}

                              <Row>
                                 <Col md={4}>
                                    <Button
                                       fullWidth
                                       id='button'
                                       type='submit'
                                       variant='contained'
                                       color='primary'
                                       style={{
                                          backgroundColor: '#266199',
                                          color: '#FFFFFF',
                                          marginBottom: 10,
                                       }}
                                       // disabled={true}
                                       disabled={Boolean(!isValid)}
                                       // style={{ margin: '16px' }}
                                    >
                                       {'Update User Details'}
                                    </Button>
                                 </Col>
                              </Row>
                              <Row>
                                 <Col md={4}>
                                    <Button
                                       fullWidth
                                       id='cancelButton'
                                       onClick={onCancel}
                                       color='default'>
                                       Cancel
                                    </Button>
                                 </Col>
                              </Row>
                           </form>
                           {/* {_renderModal()} */}
                        </div>
                        // </Paper>
                     );
                  }}
               />
               {/* ------------------------------Tabs contents in reactstrap ends------------------------------ */}
            </TabPanel>
         </div>
         {props.users.error && error ? (
            <Alert
               isOpen={props.users.error}
               onClose={_handleClose}
               hasTwoButtons={false}
               handleSubmit={onClick}
               status={props.users.status}
               title={
                  props.users.message == 'User successfully updated.' ||
                  props.users.message == 'Profile successfully updated.'
                     ? 'Success'
                     : 'Warning!'
               }
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
      updateUserInfo: (user) => dispatch(updateUserInfo(user)),
      updateOneUserInfo: (user) => dispatch(updateOneUserInfo(user)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileInfo);
