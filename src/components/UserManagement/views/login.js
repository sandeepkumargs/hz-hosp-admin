import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { login } from '../actions';
import { connect } from 'react-redux';
import Spinner from '../../../utils/Spinner';
import { Formik } from 'formik';
import { object, ref, string, boolean } from 'yup';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import AppIcon from '../../../assets/DialogLogo.png';
import Alert from '../../../utils/Alert';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import {appversion} from "../../../config"
import jwt from 'jsonwebtoken'

function Copyright() {
   return (
      <Typography variant='body2' color='textSecondary' align='center'>
         {/* {'Copyright © '} */}
         {appversion}
         {/* <Link color='inherit'>Claysol media labs</Link> {new Date().getFullYear()} */}
         {'.'}
      </Typography>
   );
}

const useStyles = makeStyles((theme) => ({
   paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
   },
   avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
   },
   form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
}));

function Login(props) {
   const classes = useStyles();
   const [error, setError] = React.useState(true);
   const [state, setState] = React.useState({
      email: '',
      password: '',
      error: false,
      loading: true,
      passChangeSuccess: false,
   });

   React.useEffect(() => {
      setState({
         ...state,
         loading: false,
      });
   }, []);
   const _handleSubmit = ({ email, newPass }) => {
      setError(true);
      props
         .login({
            email,
            password: newPass,
         })
         .then(
            setState({
               ...state,
               loading: true,
            })
         )
   };
   const _handleClose = () => {
      setError(false);
   };
   const onClick = () => {
      setError(false);
   };
   React.useEffect(() => {
      if (props.userDetails.jwt_token == false || props.userDetails.role === 'DHS-CLIENT') {
         setState({
            ...state,
            error: true,
            loading: false,
         });
      } else {
         if (props.userDetails.jwt_token) {
            console.log(jwt.decode(props.userDetails.jwt_token), "bhen ki chut")
            sessionStorage.setItem('userDetails', JSON.stringify(props.userDetails));

            props.history.push('/home');
         } else {
            // alert('login failed');
         }
      }
   }, [props]);
   return (
      <Container component='main' maxWidth='xs'>
         <CssBaseline />

         {props.userDetails.loading ? (
            <Spinner />
         ) : (
            <div className={classes.paper}>
               <img src={AppIcon} style={{ width: '90px' }} />
               <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
               </Avatar>
               <Typography component='h1' variant='h5'>
                  Sign in
               </Typography>
               <FormHelperText error={state.error}>
                  {state.error ? 'Email or Password is incorrect' : null}
               </FormHelperText>
               <Formik
                  className={classes.root}
                  initialValues={{
                     email: '',
                     newPass: '',
                  }}
                  validationSchema={object().shape({
                     email: string().required('Email is required'),
                     newPass: string().required('Password is required'),
                  })}
                  onSubmit={({ email, newPass }) =>
                     _handleSubmit({
                        email,
                        newPass,
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
                     } = props;
                     return (
                        <form className='form' onSubmit={handleSubmit}>
                           <FormControl fullWidth margin='dense'>
                              {' '}
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
                                 error={Boolean(touched.email && errors.email) || state.error}
                                 helperText={touched.email && errors.email ? errors.email : ''}
                              />
                           </FormControl>
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
                                 error={Boolean(touched.newPass && errors.newPass) || state.error}
                                 helperText={
                                    touched.newPass && errors.newPass ? errors.newPass : ''
                                 }
                              />
                           </FormControl>

                           <Button
                              type='submit'
                              fullWidth
                              variant='contained'
                              color='primary'
                              style={{ backgroundColor: '#266199', color: '#FFFFFF' }}
                              className={classes.submit}
                              // onClick={handleClick}
                           >
                              Login
                           </Button>
                        </form>
                     );
                  }}
               />
            </div>
         )}
         <Box mt={8}>
            <Copyright />
         </Box>
         {props.userDetails.error && error ? (
            <Alert
               isOpen={props.userDetails.error}
               onClose={_handleClose}
               hasTwoButtons={false}
               handleSubmit={onClick}
               title='No Internet Connection'
               text={props.userDetails.message}
               submitButtonText='OK'
            />
         ) : null}
      </Container>
   );
}

const mapStateToProps = (state) => {
   return {
      userDetails: state.users,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      login: (user) => dispatch(login(user)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
