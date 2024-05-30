/**Rendering of add logo sub component
 *
 */

//import basic react, router required files
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUser } from '../actions';
//Importing Material UI files as per need
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { TextField, FormLabel, AppBar, Typography, Box, Button, Radio } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useLocation } from 'react-router-dom';
//Importing reactstrap functions required
import { Row, Form, FormGroup, Label, Input, Col, FormText } from 'reactstrap';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Formik } from 'formik';
import * as yup from 'yup';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Spinner from '../../../utils/Spinner';
import Alert from '../../../utils/Alert';
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
function AddUser(props) {
   const classes = useStyles();
   const theme = useTheme();
   const [error, setError] = React.useState(true);
   const [value, setValue] = React.useState(0);
   var str = useLocation().search;

   const [state, setState] = React.useState({
      passChangeSuccess: false,
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      isAdmin: '',
   });

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
      props.addUser({
         fullName,
         email,
         password: newPass,
         role,
      });
      setError(true);
      setTimeout(async () => {
         setSubmitting(false);
         setState(() => ({
            passChangeSuccess: true,
         }));
      }, 1000);
   };

   const _handleChange = (event) => {
      setState({
         ...state,
         [event.target.id]: event.target.value,
      });
   };

   const onCancel = () => {
      props.history.push('/userManagement');
   };

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
            Add User
         </Typography>

         {/* ------------------------------Tab desinging in Material UI------------------------------ */}
         <div className={classes.root}>
            <AppBar position='static' color='default'></AppBar>
            {/* ------------------------------Tabs contents in reactstrap------------------------------ */}
            <TabPanel value={value} index={0} dir={theme.direction}>
               <Formik
                  className={classes.root}
                  initialValues={{
                     fullName: '',
                     email: '',
                     role: 'User',
                     newPass: '',
                     confirmPass: '',
                  }}
                  validationSchema={yup.object({
                     fullName: yup
                        .string()
                        .matches(/^\w*[a-zA-Z]\w*[0-9.@_\\/-\w\s]+$/, 'Please enter valid name')
                        .required('Name is required')
                        .trim(),
                     email: yup
                        .string()
                        .email('Please enter valid email')
                        .required('Email is required'),
                     newPass: yup
                        .string()
                        .required('New password is required')
                        .min(8, 'Password should be minimum 8 charaters'),
                     confirmPass: yup
                        .string()
                        .oneOf([yup.ref('newPass')], 'Passwords do not match')
                        .required(' Confirm password is required')
                        .min(8, 'Password should be minimum 8 charaters'),
                     role: yup.string().required('User type is required'),
                  })}
                  onSubmit={(
                     { fullName, email, role, newPass, confirmPass },
                     { setSubmitting, resetForm }
                  ) =>
                     _handleSubmit({
                        fullName,
                        email,
                        role,
                        newPass,
                        confirmPass,
                        setSubmitting,
                        resetForm,
                     })
                  }>
                  {(props) => {
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
                                          value={values.fullName}
                                          onChange={(e) => {
                                             handleChange(e);
                                             _handleChange(e);
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
                                          required
                                          variant='outlined'
                                          margin='normal'
                                          fullWidth
                                          label='Email'
                                          id='email'
                                          name='email'
                                          type='email'
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
                              <Row>
                                 <Col md={4}>
                                    <FormControl
                                       fullWidth
                                       margin='dense'
                                       error={Boolean(touched.newPass && errors.newPass)}>
                                       <TextField
                                          required
                                          variant='outlined'
                                          margin='normal'
                                          fullWidth
                                          label='Password'
                                          id='newPass'
                                          name='newPass'
                                          type='password'
                                          value={values.newPass}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          error={Boolean(touched.newPass && errors.newPass)}
                                          helperText={
                                             touched.newPass && errors.newPass ? errors.newPass : ''
                                          }
                                       />
                                    </FormControl>
                                 </Col>
                              </Row>
                              <Row>
                                 <Col md={4}>
                                    <FormControl
                                       fullWidth
                                       margin='dense'
                                       error={Boolean(touched.confirmPass && errors.confirmPass)}>
                                       <TextField
                                          required
                                          variant='outlined'
                                          margin='normal'
                                          fullWidth
                                          label='Confirm Password'
                                          id='confirmPass'
                                          name='confirmPass'
                                          type='password'
                                          value={values.confirmPass}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          error={Boolean(touched.confirmPass && errors.confirmPass)}
                                          helperText={
                                             touched.confirmPass && errors.confirmPass
                                                ? errors.confirmPass
                                                : ''
                                          }
                                       />
                                    </FormControl>
                                 </Col>
                                 <Col md={4}>
                                    <FormGroup>
                                       <Label for='radio-button-demo'> Select User Type* </Label>{' '}
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
                                    <FormLabel error={Boolean(touched.role && errors.role)}>
                                       {touched.role && errors.role ? errors.role : ''}
                                    </FormLabel>
                                 </Col>
                              </Row>
                              <Row>
                                 <Col md={2}>
                                    <Button
                                       fullWidth
                                       id='cancelButton'
                                       variant='contained'
                                       onClick={onCancel}
                                       color='default'>
                                       Cancel
                                    </Button>
                                 </Col>
                                 <Col md={2}>
                                    <Button
                                       id='addButton'
                                       fullWidth
                                       type='submit'
                                       variant='contained'
                                       color='primary'
                                       style={{ backgroundColor: '#266199', color: '#FFFFFF' }}
                                       disabled={Boolean(!isValid || isSubmitting)}>
                                       {'Add '}
                                    </Button>
                                 </Col>
                              </Row>
                           </form>
                           {/* {_renderModal()} */}
                        </div>
                        // </Paper>
                     );
                  }}
               </Formik>
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
               title={'Create User'}
               text={props.users.message}
               submitButtonText='OK'
            />
         ) : null}
         {/* {props.users.message == "User successfully created." ? (
            props.history.push("/userManagement")
         ) : props.users.error && error ? (
            <Alert
               isOpen={props.users.error}
               onClose={_handleClose}
               hasTwoButtons={false}
               handleSubmit={onClick}
               title='Warning'
               text={props.users.message}
               submitButtonText='OK'
            />
         ) : null} */}
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
      addUser: (user) => dispatch(addUser(user)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
