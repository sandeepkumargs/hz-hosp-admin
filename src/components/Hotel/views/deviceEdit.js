import React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { registerDevice } from '../actions';
import { Row, Form, FormGroup, Label, Col, FormText } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import Alert from '../../../utils/Alert';
import Spinner from '../../../utils/Spinner';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, createMuiTheme, ThemeProvider, useTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
   palette: {
      backgroundColor: '#FFFFFF',
      color: '#000000',
   },
});

const useStyles = makeStyles((theme) => ({
   root: {
      backgroundColor: '#FFFFFF',
      color: '#000000',
      width: '100%',
      padding: '20px',
   },
   button: {
      margin: theme.spacing(1),
   },
   dailog: {
      backgroundColor: '#FFFFFF',
      color: '#000000',
   },
   form: {
      width: 300,
   },
   chips: {
      display: 'flex',
      flexWrap: 'wrap',
   },
   chip: {
      margin: 2,
   },
   noLabel: {
      marginTop: theme.spacing(3),
   },
}));
function DeviceEdit(props) {
   const { onClose, value: value, opType, open, hotelId, ...other } = props;
   const radioGroupRef = React.useRef(null);
   const classes = useStyles();
   const [error, setError] = React.useState(false);
   const [disable, setDisable] = React.useState(false);
   const deviceStates = ['Public', 'Private', 'Float'];
   const accountCategory =['Deluxe', 'Lobby', 'Pub'];
   const handleEntering = () => {
      if (radioGroupRef.current != null) {
         radioGroupRef.current.focus();
      }
   };
   const [state, setState] = React.useState({
      serialNumber: '',
      deviceState: 'Private',
      roomNumber: '',
      accountCategories: 'Deluxe',
      packageCode: '',
      areaCode:''
   });

   const handleCancel = () => {
      onClose();
   };

   const handleOk = () => {
      onClose();
   };
   const onClick = () => {
      console.log(props.hotelDetails);
      if (props.hotelDetails.status == 200) onClose();
      setError(false);
   };

   const _handleSubmit = ({ serialNumber, roomNumber, packageCode, areaCode, deviceState, accountCategories }) => {
      setError(true);
      console.log(serialNumber, roomNumber, deviceState, accountCategories, state);
      if(state.deviceState == 'Float'){
            state.accountCategories = '';
      }
      props.registerDevice({
         hotelId,
         serialNo: serialNumber,
         room_number: roomNumber,
         state: state.deviceState,
         account_category: state.accountCategories,
         package_code: packageCode,
         area_code: areaCode
      });
      // onClose();
   };

   return (
      <ThemeProvider>
         <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            // style={{ width: 900 }}
            onEntering={handleEntering}
            aria-labelledby='confirmation-dialog-title'
            open={open}
            {...other}>
            <div className={classes.root}>
               <DialogTitle id='confirmation-dialog-title'>Add device</DialogTitle>
               <DialogContent dividers>
                  <div>
                     <Formik
                        className={classes.root}
                        initialValues={state}
                        validationSchema={
                           state.deviceState == 'Private'
                              ? yup.object({
                                   serialNumber: yup
                                      .string()
                                      .required('Serial number is required')
                                      .trim(),
                                   roomNumber: yup
                                      .string()
                                      .required('Room number is required'),
                                    packageCode: yup
                                       .string()
                                       .required('Package code is required')
                                })
                              : yup.object({
                                   serialNumber: yup
                                      .string()
                                      .required('Serial number is required')
                                      .trim(),
                                    
                                })
                            
                        }
                        onSubmit={({ serialNumber, roomNumber, packageCode, areaCode, accountCategories }) =>
                           _handleSubmit({
                              serialNumber,
                              roomNumber,
                              packageCode,
                              areaCode,
                              accountCategories
                           })
                        }>
                        {(props) => {
                           const {
                              dirty,
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
                              <form onSubmit={handleSubmit}>
                                 <Row style={{ marginBottom: 10 }}>
                                    <Col xs={12}>
                                       <FormControl
                                          variant='outlined'
                                          fullWidth
                                          error={Boolean(
                                             touched.serialNumber && errors.serialNumber
                                          )}>
                                          <TextField
                                             required
                                             label='Serial Number'
                                             id='serialNumber'
                                             name='serialNumber'
                                             value={values.serialNumber}
                                             onChange={handleChange}
                                             variant='outlined'
                                             helperText={
                                                touched.serialNumber && errors.serialNumber
                                                   ? errors.serialNumber
                                                   : 'Please enter Serial number'
                                             }
                                             onBlur={handleBlur}
                                             error={Boolean(
                                                touched.serialNumber && errors.serialNumber
                                             )}
                                             autoComplete='off'
                                          />
                                       </FormControl>
                                    </Col>
                                 </Row>
                                 <Row style={{ marginBottom: 10 }}>
                                    <Col md={4}>
                                       <FormControl margin='dense'>
                                          <Autocomplete
                                             required
                                             options={deviceStates}
                                             //   getOptionLabel={(option) => option}
                                             style={{ width: 300 }}
                                             id='deviceState'
                                             name='deviceState'
                                             value={state.deviceState}
                                             onChange={(event, newValue) => {
                                                setState({
                                                   ...state,
                                                   deviceState: newValue,
                                                });
                                                if(newValue == 'Float'){
                                                   values.roomNumber = '';
                                                   values.areaCode = '';
                                                   values.packageCode = '';
                                                }
                                                if(newValue == 'Public'){
                                                   values.roomNumber = '';
                                                }
                                             }}
                                             renderInput={(params) => (
                                                <TextField
                                                   {...params}
                                                   label='Device State'
                                                   variant='outlined'
                                                   helperText='Please select device state'
                                                />
                                             )}
                                          />
                                       </FormControl>
                                    </Col>
                                 </Row>

                                 {state.deviceState == 'Private' && (
                                    <Row style={{ marginBottom: 10 }}>
                                       <Col xs={12}>
                                          <FormControl
                                             variant='outlined'
                                             fullWidth
                                             error={Boolean(
                                                touched.roomNumber && errors.roomNumber
                                             )}>
                                             <TextField
                                                required
                                                label='Room number'
                                                id='roomNumber'
                                                name='roomNumber'
                                                value={values.roomNumber}
                                                onChange={handleChange}
                                                variant='outlined'
                                                helperText={
                                                   touched.roomNumber && errors.roomNumber
                                                      ? errors.roomNumber
                                                      : 'Please enter Room number'
                                                }
                                                onBlur={handleBlur}
                                                error={Boolean(
                                                   touched.roomNumber && errors.roomNumber
                                                )}
                                             />
                                          </FormControl>
                                       </Col>
                                    </Row>
                                 )}
                                 {state.deviceState  !== 'Float' && (
                                 <Row style={{ marginBottom: 10 }}>
                                    <Col md={4}>
                                       <FormControl margin='dense'>
                                          <Autocomplete
                                             required
                                             options={accountCategory}
                                             //   getOptionLabel={(option) => option}
                                             style={{ width: 300 }}
                                             id='accountCategories'
                                             name='accountCategories'
                                             value={state.accountCategories}
                                             onChange={(event, newValue) => {
                                                setState({
                                                   ...state,
                                                   accountCategories: newValue,
                                                });
                                             }}
                                             renderInput={(params) => (
                                                <TextField
                                                   {...params}
                                                   label='Account Category'
                                                   variant='outlined'
                                                   helperText='Please select Account Category'
                                                />
                                             )}
                                          />
                                       </FormControl>
                                    </Col>
                                 </Row>
                                 )}
                                 {state.deviceState !== 'Float' && (
                                 <Row style={{ marginBottom: 10 }}>
                                    <Col xs={12}>
                                       <FormControl
                                          variant='outlined'
                                          fullWidth
                                          error={Boolean(
                                             touched.serialNumber && errors.serialNumber
                                          )}>
                                          <TextField
                                             required
                                             label='Package Code'
                                             id='packageCode'
                                             name='packageCode'
                                             value={values.packageCode}
                                             onChange={handleChange}
                                             variant='outlined'
                                             helperText={
                                                touched.packageCode && errors.packageCode
                                                   ? errors.packageCode
                                                   : 'Please enter Package Code'
                                             }
                                             onBlur={handleBlur}
                                             error={Boolean(
                                                touched.packageCode && errors.packageCode
                                             )}
                                             autoComplete='off'
                                          />
                                       </FormControl>
                                    </Col>
                                 </Row>
                                 )}
                                 
                                 {state.deviceState == 'Public' && (
                                 <Row style={{ marginBottom: 10 }}>
                                    <Col xs={12}>
                                       <FormControl
                                          variant='outlined'
                                          fullWidth
                                          error={Boolean(
                                             touched.serialNumber && errors.serialNumber
                                          )}>
                                          <TextField
                                             required
                                             label='Area Code'
                                             id='areaCode'
                                             name='areaCode'
                                             value={values.areaCode}
                                             onChange={handleChange}
                                             variant='outlined'
                                             helperText={
                                                touched.areaCode && errors.areaCode
                                                   ? errors.areaCode
                                                   : 'Please enter Area Code'
                                             }
                                             onBlur={handleBlur}
                                             error={Boolean(
                                                touched.areaCode && errors.areaCode
                                             )}
                                             autoComplete='off'
                                          />
                                       </FormControl>
                                    </Col>
                                 </Row>
                                 )}

                                 {/* <Row>
                                    <Col md={2}>
                                       <Button
                                          fullWidth
                                          id='cancelButton'
                                          variant='contained'
                                          //    onClick={onCancel}
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
                                 </Row> */}
                                 <DialogActions>
                                    <Button
                                       id='cancel'
                                       className={classes.buttonFont}
                                       onClick={handleCancel}
                                       color='primary'>
                                       Cancel
                                    </Button>
                                    <Button
                                       id='save'
                                       type='submit'
                                       variant='outlined'
                                       color='primary'
                                       className={classes.buttonFont}>
                                       {opType == 'Edit' ? 'Save' : 'Add'}{' '}
                                    </Button>
                                 </DialogActions>
                              </form>
                           );
                        }}
                     </Formik>

                     {/* {_renderModal()} */}
                  </div>
               </DialogContent>
               {/* <DialogActions>
                  <Button onClick={handleCancel} color='primary'>
                     Cancel
                  </Button>
                  <Button onClick={handleOk} color='primary'>
                     Ok
                  </Button>
               </DialogActions> */}
            </div>
         </Dialog>
         {props.hotelDetails.RegisterError && error ? (
            <Alert
               isOpen={props.hotelDetails.RegisterError}
               hasTwoButtons={false}
               handleSubmit={onClick}
               status={props.hotelDetails.status}
               title='Warning'
               text={props.hotelDetails.errorMessage}
               submitButtonText='OK'
            />
         ) : null}
      </ThemeProvider>
   );
}

const mapStateToProps = (state) => {
   return {
      hotelDetails: state.hotels,
   };
};
const mapDispatchToProps = (dispatch) => {
   return {
      registerDevice: (data) => dispatch(registerDevice(data)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceEdit);
