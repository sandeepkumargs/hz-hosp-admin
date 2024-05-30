import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { changePassword, oneChangePassword } from '../actions';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { object, ref, string } from 'yup';
import { useLocation } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FormControl from '@material-ui/core/FormControl';
import Spinner from '../../../utils/Spinner';
import Alert from '../../../utils/Alert';
import { getJwtToken } from '../../../config';

const useStyles = makeStyles((theme) => ({
   paper: {
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

function ChangePassword(props) {
   const classes = useStyles();
   const [error, setError] = React.useState(true);
   const [state, setState] = React.useState({
      passChangeSuccess: false,
   });
   const [isSame, setIsSame] = React.useState(false);
   var str = useLocation().search;
   const userData = str.substring(str.lastIndexOf('?') + 1, str.length).split('-');

   const handleClick = () => {
      props.history.push('/userManagement');
   };

   React.useEffect(() => {
      if (userData[2] && userData[2] == getJwtToken().email) {
         setIsSame(true);
      } else {
         setIsSame(false);
      }
   }, []);
   const _handleClose = () => {};
   const onClick = () => {
      setError(false);
      if (props.users.status == 422) {
         props.history.push('/login');
      } else if (props.users.status == 200) {
         props.history.push('/userManagement');
      }
   };
   const onCancel = () => {
      props.history.push('/userManagement');
   };

   const _handleSubmit = ({ currentPass, newPass, confirmPass, setSubmitting, resetForm }) => {
      setError(true);

      if (isSame) {
         props.oneChangePassword({
            oldpass: currentPass,
            newpass: newPass,
         });
      } else {
         props.changePassword({
            fullName: userData[1],
            role: userData[3] == '1' ? 'Admin' : 'User',
            email: userData[2],
            id: userData[0],
            password: newPass,
         });
      }
   };

   return props.users.loading ? (
      <Spinner />
   ) : (
      <div>
         <Link to={`/userManagement`}>
            <ArrowBackIcon></ArrowBackIcon>
            <Typography variant='button' color='primary' onClick={handleClick} gutterBottom>
               Back
            </Typography>
         </Link>

         <Container component='main' maxWidth='xs'>
            {/* <CssBaseline /> */}

            <div className={classes.paper}>
               <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
               </Avatar>

               <Typography component='h1' variant='h5'>
                  Change Password
               </Typography>

               {!isSame ? (
                  <Formik
                     initialValues={{
                        newPass: '',
                        confirmPass: '',
                     }}
                     validationSchema={object().shape({
                        newPass: string()
                           .min(8, 'Password should be minimum 8 charaters')
                           .required('New password is required'),
                        confirmPass: string()
                           .oneOf([ref('newPass')], 'Passwords do not match')
                           .required('Password is required'),
                     })}
                     onSubmit={(
                        { currentPass, newPass, confirmPass },
                        { setSubmitting, resetForm }
                     ) =>
                        _handleSubmit({
                           currentPass,
                           newPass,
                           confirmPass,
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
                        return (
                           <div className={classes.Dailog}>
                              <form className='form' onSubmit={handleSubmit}>
                                 <FormControl
                                    fullWidth
                                    margin='dense'
                                    error={Boolean(touched.newPass && errors.newPass)}>
                                    <TextField
                                       required
                                       variant='outlined'
                                       margin='normal'
                                       fullWidth
                                       label='New Password'
                                       id='newPass'
                                       name='newPass'
                                       type='password'
                                       autoComplete='password'
                                       value={values.newPass}
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       error={Boolean(touched.newPass && errors.newPass)}
                                       helperText={
                                          touched.newPass && errors.newPass ? errors.newPass : ''
                                       }
                                    />
                                 </FormControl>
                                 <FormControl
                                    fullWidth
                                    margin='dense'
                                    error={Boolean(touched.confirmPass && errors.confirmPass)}>
                                    <TextField
                                       required
                                       variant='outlined'
                                       margin='normal'
                                       required
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
                                 <Button
                                    id='button'
                                    fullWidth
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    style={{
                                       backgroundColor: '#266199',
                                       color: '#FFFFFF',
                                       marginBottom: 10,
                                    }}
                                    disabled={Boolean(!isValid)}
                                    // style={{ margin: '16px' }}
                                 >
                                    {'Reset Password'}
                                 </Button>
                                 <Button
                                    fullWidth
                                    id='cancelButton'
                                    onClick={onCancel}
                                    color='default'>
                                    Cancel
                                 </Button>
                              </form>
                              {/* {_renderModal()} */}
                           </div>
                        );
                     }}
                  />
               ) : (
                  <Formik
                     initialValues={{
                        currentPass: '',
                        newPass: '',
                        confirmPass: '',
                     }}
                     validationSchema={object().shape({
                        currentPass: string().required('Current password is required'),
                        newPass: string()
                           .min(8, 'Password should be minimum 8 charaters')
                           .required('New password is required'),
                        confirmPass: string()
                           .oneOf([ref('newPass')], 'Passwords do not match')
                           .required('Password is required'),
                     })}
                     onSubmit={(
                        { currentPass, newPass, confirmPass },
                        { setSubmitting, resetForm }
                     ) =>
                        _handleSubmit({
                           currentPass,
                           newPass,
                           confirmPass,
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
                        return (
                           <div>
                              <form className='form' onSubmit={handleSubmit}>
                                 <FormControl
                                    fullWidth
                                    margin='dense'
                                    error={Boolean(touched.currentPass && errors.currentPass)}>
                                    <TextField
                                       required
                                       variant='outlined'
                                       margin='normal'
                                       fullWidth
                                       label='Current Password'
                                       id='password-current'
                                       name='currentPass'
                                       type='password'
                                       value={values.currentPass}
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       error={Boolean(touched.currentPass && errors.currentPass)}
                                       helperText={
                                          touched.currentPass && errors.currentPass
                                             ? errors.currentPass
                                             : ''
                                       }
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
                                       label='New Password'
                                       id='newPass'
                                       name='newPass'
                                       type='password'
                                       autoComplete='password'
                                       value={values.newPass}
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       error={Boolean(touched.newPass && errors.newPass)}
                                       helperText={
                                          touched.newPass && errors.newPass ? errors.newPass : ''
                                       }
                                    />
                                 </FormControl>
                                 <FormControl
                                    fullWidth
                                    margin='dense'
                                    error={Boolean(touched.confirmPass && errors.confirmPass)}>
                                    <TextField
                                       required
                                       variant='outlined'
                                       margin='normal'
                                       required
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

                                 <Button
                                    fullWidth
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    style={{
                                       backgroundColor: '#266199',
                                       color: '#FFFFFF',
                                       marginBottom: 10,
                                    }}
                                    disabled={Boolean(!isValid)}
                                    // style={{ margin: '16px' }}
                                 >
                                    {'Reset Password'}
                                 </Button>

                                 <Button
                                    fullWidth
                                    id='cancelButton'
                                    onClick={onCancel}
                                    color='default'>
                                    Cancel
                                 </Button>
                              </form>
                              {/* {_renderModal()} */}
                           </div>
                        );
                     }}
                  />
               )}
            </div>
         </Container>
         {props.users.error && error ? (
            <Alert
               isOpen={props.users.error}
               onClose={_handleClose}
               hasTwoButtons={false}
               handleSubmit={onClick}
               status={props.users.status}
               title='Reset Password'
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
      changePassword: (user) => dispatch(changePassword(user)),
      oneChangePassword: (user) => dispatch(oneChangePassword(user)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
