import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Row, Form, FormGroup, Label, Col, FormText } from 'reactstrap';
import { Typography } from '@material-ui/core';
import ImageUploader from '../../../utils/dropZoneFile';
import { makeStyles, createMuiTheme, ThemeProvider, useTheme } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
// import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import { FormControlLabel, RadioGroup, Radio } from '@material-ui/core';
import Loader from '../../../utils/loader';
import { Formik } from 'formik';
import * as yup from 'yup';
import '../../custom.scss';
import Autocomplete from '@material-ui/lab/Autocomplete';
import _ from 'lodash';
import TopMenu_Blue from '../../../assets/TopMenu-Blue.png';
import TopMenu_Darker from '../../../assets/TopMenu-Darker.png';
import TopMenu_JETWING from '../../../assets/TopMenu-JETWING.png';
import TopMenu_CINNAMON from '../../../assets/TopMenu-CINNAMON.png';
import TopMenu_MARRIOTT from '../../../assets/TopMenu-MARRIOTT.png';
import LeftMenu_Blue from '../../../assets/LeftMenu-Blue.png';
import LeftMenu_Darker from '../../../assets/LeftMenu-Darker.png';
import LeftMenu_JETWING from '../../../assets/LeftMenu-JETWING.png';
import LeftMenu_CINNAMON from '../../../assets/LeftMenu-CINNAMON.png';
import LeftMenu_MARRIOTT from '../../../assets/LeftMenu-MARRIOTT.png';
import ImageViewer from '../../../utils/ImageViewer';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { MultiSelect } from "react-multi-select-component";
import { CenterFocusStrong } from '@material-ui/icons';

const theme = createMuiTheme({
   palette: {
      backgroundColor: '#FFFFFF',
      color: '#000000',
   },
});

const useStyles = makeStyles((theme) => ({
   root: {
      '& > *': {
         margin: theme.spacing(1),
         backgroundColor: '#FFFFFF',
         color: '#000000',
      },
   },
   button: {
      marginBottom: theme.spacing(3),
   },
   paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
   },
   selectBoxSize: {
      width: 500,
      height: 350,
      marginLeft: 430,
   }
}));

export function Themes_LangList(props) {
   const [state, setState] = React.useState({
      lang: ['English'],
      currency: 'LKR',
      theme: props.info[0].type,
      themeSelected: true,
      selected_theme_id: props.info[0]._id,
      color: props.info[0].color_schemes,
      selected_color_scheme: props.info[0].color_schemes[0].color_scheme_name,
   });
   const [imagePreview, setImagePreview] = React.useState({
      image: null,
      isOpenPreview: false,
      title: null,
   });
   // handleCurrency = handleChange.bind(this);
   // props.parentCallback({
   //    selected_theme: state.selected_theme_id,
   //    selected_color_scheme: state.selected_color_scheme,
   //    lang: state.lang,
   //    currency: state.currency,
   // });
   // onTagsChange = onTagsChange.bind(this);

   const handleChange = (event) => {
      if (event.target.value != 'English') {
         var lng = [];
         lng = state.lang;
         var index = lng.indexOf(event.target.value);
         if (index !== -1) {
            lng.splice(index, 1);
         } else {
            lng.push(event.target.value);
         }
         setState({
            ...state,
            lang: lng,
         });
      }
   };
   const handleTheme = (e) => {
      let index = _.findIndex(props.info, function (o) {
         return o.type == e.target.value;
      });

      setState({
         ...state,
         theme: e.target.value,
         color: props.info[index].color_schemes,
         selected_theme_id: props.info[index]._id,
         selected_color_scheme: props.info[index].color_schemes[0].color_scheme_name,
      });
   };
   const handleColor = (e) => {
      setState({ ...state, selected_color_scheme: e.target.value });
   };
   const handleCurrency = (e) => {
      setState({
         ...state,
         currency: e.target.value,
      });
   };
   React.useEffect(() => {
      console.log(state);
      props.parentCallback(state);
   }, [state]);
   React.useEffect(() => {
      if (state.theme == 'vertical' && state.selected_color_scheme == 'DARK') {
         setImagePreview({
            ...imagePreview,
            image: LeftMenu_Darker,
            title: 'Theme: Vertical, Color scheme: Dark',
         });
      } else if (state.theme == 'vertical' && state.selected_color_scheme == 'BLUE') {
         setImagePreview({
            ...imagePreview,
            image: LeftMenu_Blue,
            title: 'Theme: Vertical, Color scheme: Ocean Blue',
         });
      } else if (state.theme == 'vertical' && state.selected_color_scheme == 'MARRIOTT') {
         setImagePreview({
            ...imagePreview,
            image: LeftMenu_MARRIOTT,
            title: 'Theme: Vertical, Color scheme: Marriott',
         });
      } else if (state.theme == 'vertical' && state.selected_color_scheme == 'CINNAMON') {
         setImagePreview({
            ...imagePreview,
            image: LeftMenu_CINNAMON,
            title: 'Theme: Vertical, Color scheme: Cinnamon',
         });
      } else if (state.theme == 'vertical' && state.selected_color_scheme == 'JETWING') {
         setImagePreview({
            ...imagePreview,
            image: LeftMenu_JETWING,
            title: 'Theme: Vertical, Color scheme: Jetwing',
         });
      } else if (state.theme == 'horizontal' && state.selected_color_scheme == 'DARK') {
         setImagePreview({
            ...imagePreview,
            image: TopMenu_Darker,
            title: 'Theme: Horizontal, Color scheme: Dark',
         });
      } else if (state.theme == 'horizontal' && state.selected_color_scheme == 'BLUE') {
         setImagePreview({
            ...imagePreview,
            image: TopMenu_Blue,
            title: 'Theme: Horizontal, Color scheme: Blue',
         });
      }else if (state.theme == 'horizontal' && state.selected_color_scheme == 'MARRIOTT') {
         setImagePreview({
            ...imagePreview,
            image: TopMenu_MARRIOTT,
            title: 'Theme: horizontal, Color scheme: Marriott',
         });
      } else if (state.theme == 'horizontal' && state.selected_color_scheme == 'CINNAMON') {
         setImagePreview({
            ...imagePreview,
            image: TopMenu_CINNAMON,
            title: 'Theme: horizontal, Color scheme: Cinnamon',
         });
      } else if (state.theme == 'horizontal' && state.selected_color_scheme == 'JETWING') {
         setImagePreview({
            ...imagePreview,
            image: TopMenu_JETWING,
            title: 'Theme: horizontal, Color scheme: Jetwing',
         });
      }
   }, [state.theme, state.selected_color_scheme]);

   const previewClick = () => {
      setImagePreview({
         ...imagePreview,
         isOpenPreview: true,
      });
   };
   const onClose = () => {
      setImagePreview({
         ...imagePreview,
         isOpenPreview: false,
      });
   };
   // React.useEffect(() => {
   //    console.log(imagePreview);
   // }, [imagePreview]);
   return (
      <div>
         <Row>
            <Col xs={6} sm={4}>
               <FormGroup>
                  <TextField
                     id='theme'
                     select
                     label='Theme'
                     fullWidth
                     // defaultValue={state.theme}
                     onChange={handleTheme}
                     variant='outlined'
                     SelectProps={{
                        native: true,
                     }}
                     // InputLabelProps={{
                     //    shrink: true,
                     // }}
                     helperText='Select theme in the list'>
                     {/* <option></option> */}
                     {props.info.map((option) => (
                        <option key={option.type} value={option.type}>
                           {option.type == 'vertical' ? 'Vertical' : 'Horizontal'}
                        </option>
                     ))}
                  </TextField>
               </FormGroup>
            </Col>
            <Col xs={6} sm={4}>
               <FormGroup>
                  <TextField
                     id='color_scheme_name'
                     select
                     label='Color Scheme'
                     fullWidth
                     onChange={handleColor}
                     variant='outlined'
                     SelectProps={{
                        native: true,
                     }}
                     value={state.selected_color_scheme}
                     // value={
                     //    state.themeSelected
                     //       ? state.selected_color_scheme
                     //       : ""
                     // }
                     // InputLabelProps={{
                     //    shrink: true,
                     // }}
                     placeholder='Color schemes'
                     helperText='Select Color Scheme in the list'>
                     {state.color.map((option) => (
                        <option key={option.color_scheme_name} value={option.color_scheme_name}>
                           {option.color_scheme_name}
                        </option>
                     ))}
                  </TextField>
               </FormGroup>
            </Col>
            <Col xs={6} sm={4}>
               <Button onClick={previewClick} variant='outlined' style={{ marginTop: 10 }}>
                  {' '}
                  preview
               </Button>
               {/* <img className='preview' src={state.preview} /> */}
            </Col>
         </Row>
         <Divider light={true} variant='fullWidth' />
         {imagePreview.isOpenPreview && (
            <ImageViewer
               viewerIsOpen={imagePreview.isOpenPreview}
               img={imagePreview.image}
               title={imagePreview.title}
               onClose={onClose}
            />
         )}
         <br></br>
         <Row>
            <Col xs={12} sm={6}>
               <FormControl component='fieldset' style={{ marginLeft: 20 }} onChange={handleChange}>
                  <FormLabel component='legend'>Select Langauges</FormLabel>
                  <FormGroup aria-label='position' row>
                     <FormControlLabel
                        value='English'
                        disabled
                        control={<Checkbox checked={true} color='primary' />}
                        label='English'
                        labelPlacement='top'
                     />{' '}
                     <FormControlLabel
                        value='Chinese'
                        control={<Checkbox color='primary' />}
                        label='Chinese'
                        labelPlacement='top'
                     />{' '}
                     <FormControlLabel
                        value='French'
                        control={<Checkbox color='primary' />}
                        label='French'
                        labelPlacement='top'
                     />{' '}
                     <FormControlLabel
                        value='Russian'
                        control={<Checkbox color='primary' />}
                        label='Russian'
                        labelPlacement='top'
                     />
                     <FormControlLabel
                        value='German'
                        control={<Checkbox color='primary' />}
                        label='German'
                        labelPlacement='top'
                     />
                  </FormGroup>
                  <FormHelperText>By default langauge English is selected</FormHelperText>
               </FormControl>
            </Col>
            <Col xs={12} sm={6}>
               <FormGroup>
                  <FormLabel component='legend'>Select Currency</FormLabel>

                  <RadioGroup
                     aria-label='show'
                     value={state.currency}
                     onChange={handleCurrency}
                     row>
                     <FormControlLabel
                        value='USD'
                        name='cur'
                        control={<Radio id='cur' color='primary' />}
                        label='USD'
                        labelPlacement='top'
                     />
                     <FormControlLabel
                        value='LKR'
                        name='cur'
                        control={<Radio id='cur' color='primary' />}
                        label='LKR'
                        labelPlacement='top'
                     />
                  </RadioGroup>
               </FormGroup>
               <FormHelperText>Choose Currency for the hotel</FormHelperText>
            </Col>
         </Row>
      </div>
   );
}

export function HotelInfoForm(props) {
   const classes = useStyles();
   //   /const theme = theme();
   const [value, setValue] = React.useState(props.info.postCode ? props.info.postCode : null);
   const [isPostCode, setIsPostCode] = React.useState(false);
   const [valid, setValid] = React.useState(false);
   var hotelInfo = null;
   if (props) {
      hotelInfo = props.info;
   }
   const postCodes = []
   // props.postCodes;

   const [state, setState] = React.useState({
      dHSCustRef: hotelInfo.dHSCustRef ? hotelInfo.dHSCustRef : '',
      BRN_Number: hotelInfo.BRN_Number ? hotelInfo.BRN_Number : '',
      title: hotelInfo.title ? hotelInfo.title : 'Mr ',
      firstName: hotelInfo.firstName ? hotelInfo.firstName : '',
      lastName: hotelInfo.lastName ? hotelInfo.lastName : '',
      email: hotelInfo.email ? hotelInfo.email : '',
      addressLine1: hotelInfo.addressLine1 ? hotelInfo.addressLine1 : '',
      addressLine2: hotelInfo.addressLine2 ? hotelInfo.addressLine2 : '',
      addressLine3: hotelInfo.addressLine3 ? hotelInfo.addressLine3 : '',
      postCode: hotelInfo.postCode ? hotelInfo.postCode : undefined,
      technicalContactNumber: hotelInfo.technicalContactNumber
         ? hotelInfo.technicalContactNumber
         : '',
      hotelContactNumber: hotelInfo.hotelContactNumber ? hotelInfo.hotelContactNumber : '',
      totalNumOfConnections: hotelInfo.totalNumOfConnections ? hotelInfo.totalNumOfConnections : '',
      totalNumOfOccupancyConnections: hotelInfo.totalNumOfOccupancyConnections
         ? hotelInfo.totalNumOfOccupancyConnections
         : '',   
      totalNumOfPrivateConnections: hotelInfo.totalNumOfPrivateConnections
         ? hotelInfo.totalNumOfPrivateConnections
         : '',
      totalNumOfPublicConnections: hotelInfo.totalNumOfPublicConnections
         ? hotelInfo.totalNumOfPublicConnections
         : '',
      operationStatus: hotelInfo.operationStatus ? hotelInfo.operationStatus : undefined,
      isValid: hotelInfo.isValid ? hotelInfo.isValid : false,
      isVODServiceEnabled: hotelInfo.isVODServiceEnabled == false ? false : true,
      serial_number: "312018146332",
   });
   function _handleChange(evt, errors) {
      // console.log(errors);

      const value = evt.target.value;
      // setValid(_.isEmpty(errors));
      setState({
         ...state,
         [evt.target.id]: value,
      });
   }
   useEffect(() => {
      props.parentCallback({ state, valid });
   }, [state, valid]);

   const _handleSubmit = () => { };
   return (
      <ThemeProvider theme={theme}>
         <Formik
            className={classes.root}
            initialValues={state}
            validationSchema={yup.object({
               dHSCustRef: yup
               .string()
               .matches(/^[DHS0-9\w\s]+$/, 'Include "DHS" as prefix')
               .min(9)
               .max(10)
               .required('DHS Cust Reference No. is required'),
               BRN_Number: yup.string().required('Entity ID  is required'),
               title: yup.string().required('Title is required'),
               email: yup.string().email().required('Email is required'),
               firstName: yup
                  .string()
                  .trim()
                  .matches(/^[a-zA-Z0-9\w\s]+$/, 'Special charaters not allowed')
                  .required('First Name is required')
                  .max(100)
                  .test('total', 'Please enter valid First Name', (value) => {
                     if (/[`~!@#$%^{}\"?]/.test(value)) return false;
                     else return true;
                  }),
               lastName: yup
                  .string()
                  .trim()
                  .matches(/^[a-zA-Z0-9\w\s]+$/, 'Special charaters not allowed')
                  .required('First Name is required')
                  .max(100)
                  .test('total', 'Please enter valid Last Name', (value) => {
                     if (/[`~!@#$%^{}\"?]/.test(value)) return false;
                     else return true;
                  }),
               technicalContactNumber: yup
                  .string()
                  .matches(/^[0-9]{10}$/, 'Enter the valid contact number')
                  .required('Technical contact number is required'),
               hotelContactNumber: yup
                  .string()
                  .matches(/^[0-9]{10}$/, 'Enter the valid contact number')
                  .required('Hotel contact number is required'),
               totalNumOfConnections: yup
                  .number()
                  .typeError('Must be number type')
                  .max(99999, 'Cannot Exceed five digits')
                  .min(0, 'Number should be positive')
                  .required('Total num of connections is required'),

               totalNumOfOccupancyConnections: yup
                  .number()
                  .typeError('Must be number type')
                  .max(yup.ref('totalNumOfConnections'), 'Cannot exceed total num of connections')
                  .min(0, 'Number should be positive')
                  .required('Total num of occupancy connections is required'),

               totalNumOfPrivateConnections: yup
                  .number()
                  .typeError('Must be number type')
                  .max(
                     yup.ref('totalNumOfOccupancyConnections'),
                     'Cannot exceed Total num of occupancy connections'
                  )
                  .min(0, 'Number should be positive')
                  .required('Total num of Private Connections is required'),
               // .test('total', 'Please enter valid number', (value) => {
               //    if (
               //       parseInt(state.totalNumOfPublicConnections) +
               //          parseInt(state.totalNumOfPrivateConnections) ==
               //       state.totalNumOfOccupancyConnections
               //    )
               //       return true;
               //    else return false;
               // }),
               // totalNumOfPublicConnections: yup
               //    .number()
               //    .typeError('Must be number type')
               //    .max(
               //       state.totalNumOfOccupancyConnections - state.totalNumOfPrivateConnections,
               //       'Cannot exceed Total num of occupancy connections  + Total num of Private Connections '
               //    )
               //    .min(0, 'Number should be positive')
               //    .required('Total num of Public Connections is required')
               //    .test('total', 'Please enter valid number', (value) => {
               //       if (
               //          parseInt(state.totalNumOfPrivateConnections) + value ==
               //          state.totalNumOfOccupancyConnections
               //       )
               //          return true;
               //       else return false;
               //    }),

               addressLine1: yup
                  .string()
                  .matches(/^[a-zA-Z0-9\w\s]+$/, 'Please enter valid address')
                  .required('address is required')
                  .max(100)
                  .trim()
                  .test('total', 'Please enter valid address', (value) => {
                     if (/[`~!@#$%^{}\"?]/.test(value)) return false;
                     else return true;
                  }),
               addressLine2: yup
                  .string()
                  .matches(/^[a-zA-Z0-9\w\s]+$/, 'Please enter valid address')
                  .max(100)
                  .test('total', 'Please enter valid address', (value) => {
                     if (/[`~!@#$%^{}\"?]/.test(value)) return false;
                     else return true;
                  }),
               addressLine3: yup
                  .string()
                  .matches(/^[a-zA-Z0-9\w\s]+$/, 'Please enter valid address')
                  .max(100)
                  .test('total', 'Please enter valid address', (value) => {
                     if (/[`~!@#$%^{}\"?]/.test(value)) return false;
                     else return true;
                  }),
               // serial_number: yup
               //    .string()
               //    .matches(/^[0-9]{12}$/, 'Enter the valid Serial number')
               //    .required('Serial number is required'),

               // postCode: yup.number().required('Post code is required'),
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
            }
            validateOnMount>
            {(props) => {
               // console.log(props.isValid);

               setValid(props.isValid);
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
                  <Form>
                                         <Row>
                        <Col xs={12} sm={6}>
                           <FormGroup>
                              <TextField
                                 required
                                 autoComplete='off'
                                 variant='outlined'
                                 margin='normal'
                                 fullWidth
                                 label='Entity ID'
                                 id='BRN_Number'
                                 name='BRN_Number'
                                 value={values.BRN_Number}
                                 onChange={(e) => {
                                    handleChange(e);
                                    _handleChange(e, errors);
                                 }}
                                 onBlur={handleBlur}
                                 error={Boolean(touched.BRN_Number && errors.BRN_Number)}
                                 helperText={
                                    touched.BRN_Number && errors.BRN_Number
                                       ? errors.BRN_Number
                                       : 'Please enter Entity ID'
                                 }
                              />
                           </FormGroup>
                        </Col>
                        <Col xs={12} sm={6}>
                           <FormGroup>
                              <TextField
                                 required
                                 variant='outlined'
                                 margin='normal'
                                 fullWidth
                                 autoComplete='off'
                                 label='Contact Person Name'
                                 id='title'
                                 name='title'
                                 value={values.title}
                                 onChange={(e) => {
                                    handleChange(e);
                                    _handleChange(e, errors);
                                 }}
                                 onBlur={handleBlur}
                                 error={Boolean(touched.title && errors.title)}
                                 helperText={
                                    touched.title && errors.title
                                       ? errors.title
                                       : 'Please enter name'
                                 }
                              />
                           </FormGroup>
                        </Col>
                     </Row>
                     
                        <Col xs={150} sm={60}>
                           <FormGroup>
                              <TextField
                                 required
                                 variant='outlined'
                                 margin='normal'
                                 fullWidth
                                 autoComplete='off'
                                 label='Entity Name'
                                 id='firstName'
                                 name='firstName'
                                 value={values.firstName}
                                 onChange={(e) => {
                                    handleChange(e);
                                    _handleChange(e, errors);
                                 }}
                                 onBlur={handleBlur}
                                 error={Boolean(touched.firstName && errors.firstName)}
                                 helperText={
                                    touched.firstName && errors.firstName
                                       ? errors.firstName
                                       : 'Please enter hotel first name'
                                 }
                              />
                           </FormGroup>
                        </Col>
                    
                      <Row>
                        <Col xs={12} sm={6}>
                           <FormGroup>
                              <TextField
                                 required
                                 variant='outlined'
                                 margin='normal'
                                 fullWidth
                                 autoComplete='off'
                                 label='Email'
                                 id='email'
                                 name='email'
                                 value={values.email}
                                 onChange={(e) => {
                                    handleChange(e);
                                    _handleChange(e, errors);
                                 }}
                                 onBlur={handleBlur}
                                 error={Boolean(touched.email && errors.email)}
                                 helperText={
                                    touched.email && errors.email
                                       ? errors.email
                                       : 'Please enter hotel admin email address'
                                 }
                              />
                           </FormGroup>
                        </Col>
                        <Col xs={12} sm={6}>
                           <FormGroup>
                         
                                 
                                    <TextField
                          
                                       error={Boolean(isPostCode)}
                                       label='Enter Post Code'
                                       variant='outlined'
                                       margin='normal'
                                       fullWidth
                                       
                                    />
                                 
                             

                              {/* <TextField
                              required
                              variant='outlined'
                              margin='normal'
                              fullWidth
                              autoComplete='off'
                              label='Post code'
                              id='postCode'
                              name='postCode'
                              value={values.postCode}
                              onChange={(e) => {
                                 handleChange(e);
                                 _handleChange(e, errors);
                              }}
                              required
                              onBlur={handleBlur}
                              error={Boolean(touched.postCode && errors.postCode)}
                           /> */}
                           </FormGroup>
                        </Col>
                     </Row>
                     <Row>
                        <Col xs={12} sm={6}>
                           <FormGroup>
                              <TextField
                                 required
                                 variant='outlined'
                                 margin='normal'
                                 fullWidth
                                 autoComplete='off'
                                 label='Technical Contact Number'
                                 id='technicalContactNumber'
                                 name='technicalContactNumber'
                                 value={values.technicalContactNumber}
                                 onChange={(e) => {
                                    handleChange(e);
                                    _handleChange(e, errors);
                                 }}
                                 onBlur={handleBlur}
                                 error={Boolean(
                                    touched.technicalContactNumber && errors.technicalContactNumber
                                 )}
                                 helperText={
                                    touched.technicalContactNumber && errors.technicalContactNumber
                                       ? errors.technicalContactNumber
                                       : 'Please enter technical contact number'
                                 }
                              />
                           </FormGroup>
                        </Col>
                        <Col xs={12} sm={6}>
                           <FormGroup>
                              <TextField
                                 required
                                 variant='outlined'
                                 margin='normal'
                                 fullWidth
                                 autoComplete='off'
                                 label='Hotel Contact Number'
                                 id='hotelContactNumber'
                                 name='hotelContactNumber'
                                 value={values.hotelContactNumber}
                                 onChange={(e) => {
                                    handleChange(e);
                                    _handleChange(e, errors);
                                 }}
                                 onBlur={handleBlur}
                                 error={Boolean(
                                    touched.hotelContactNumber && errors.hotelContactNumber
                                 )}
                                 helperText={
                                    touched.hotelContactNumber && errors.hotelContactNumber
                                       ? errors.hotelContactNumber
                                       : 'Please enter hotel contact number'
                                 }
                              />
                           </FormGroup>
                        </Col>
                     </Row>
                     <Row>
                        <Col xs={12} sm={6}>
                           <FormGroup>
                              <TextField
                                 required
                                 variant='outlined'
                                 margin='normal'
                                 fullWidth
                                 autoComplete='off'
                                 label='Total number of connections'
                                 id='totalNumOfConnections'
                                 name='totalNumOfConnections'
                                 value={values.totalNumOfConnections}
                                 onChange={(e) => {
                                    handleChange(e);
                                    _handleChange(e, errors);
                                 }}
                                 onBlur={handleBlur}
                                 error={Boolean(
                                    touched.totalNumOfConnections && errors.totalNumOfConnections
                                 )}
                                 helperText={
                                    touched.totalNumOfConnections && errors.totalNumOfConnections
                                       ? errors.totalNumOfConnections
                                       : 'Please enter total number of connections'
                                 }
                              />
                           </FormGroup>
                        </Col>
                        <Col xs={12} sm={6}>
                           <FormGroup>
                              <TextField
                                 required
                                 variant='outlined'
                                 margin='normal'
                                 fullWidth
                                 autoComplete='off'
                                 label='Total number of occupancy connections'
                                 id='totalNumOfOccupancyConnections'
                                 name='totalNumOfOccupancyConnections'
                                 value={values.totalNumOfOccupancyConnections}
                                 onChange={(e) => {
                                    handleChange(e);
                                    _handleChange(e, errors);
                                 }}
                                 onBlur={handleBlur}
                                 error={Boolean(
                                    touched.totalNumOfOccupancyConnections &&
                                    errors.totalNumOfOccupancyConnections
                                 )}
                                 helperText={
                                    touched.totalNumOfOccupancyConnections &&
                                       errors.totalNumOfOccupancyConnections
                                       ? errors.totalNumOfOccupancyConnections
                                       : 'Please enter total number of occupancy connections'
                                 }
                              />
                           </FormGroup>
                        </Col>
                     </Row>
                     <Row>
                        <Col xs={12} sm={6}>
                           <FormGroup>
                              <TextField
                                 required
                                 variant='outlined'
                                 margin='normal'
                                 fullWidth
                                 autoComplete='off'
                                 label='Total number of private connections'
                                 id='totalNumOfPrivateConnections'
                                 name='totalNumOfPrivateConnections'
                                 value={values.totalNumOfPrivateConnections}
                                 onChange={(e) => {
                                    handleChange(e);
                                    _handleChange(e, errors);
                                 }}
                                 onBlur={handleBlur}
                                 error={Boolean(
                                    touched.totalNumOfPrivateConnections &&
                                    errors.totalNumOfPrivateConnections
                                 )}
                                 helperText={
                                    touched.totalNumOfPrivateConnections &&
                                       errors.totalNumOfPrivateConnections
                                       ? errors.totalNumOfPrivateConnections
                                       : 'Please enter total number of private  connections'
                                 }
                              />
                           </FormGroup>
                        </Col>
                        <Col xs={12} sm={6}>
                           <FormGroup>
                              <TextField
                                 required
                                 variant='outlined'
                                 margin='normal'
                                 fullWidth
                                 disabled
                                 autoComplete='off'
                                 label='Total number of public connections'
                                 id='totalNumOfPublicConnections'
                                 name='totalNumOfPublicConnections'
                                 value={
                                    values.totalNumOfOccupancyConnections -
                                    values.totalNumOfPrivateConnections
                                 }
                                 onChange={(e) => {
                                    handleChange(e);
                                    _handleChange(e, errors);
                                 }}
                                 onBlur={handleBlur}
                              // error={Boolean(
                              //    touched.totalNumOfPublicConnections &&
                              //       errors.totalNumOfPublicConnections
                              // )}
                              // helperText={
                              //    touched.totalNumOfPublicConnections &&
                              //    errors.totalNumOfPublicConnections
                              //       ? errors.totalNumOfPublicConnections
                              //       :
                              //       'Please enter total number of public connections'
                              // }
                              />
                           </FormGroup>
                        </Col>
                     </Row>
                     <Row>
                        <Col xs={12} sm={6}>
                           <FormGroup>
                              <TextField
                                 required
                                 variant='outlined'
                                 margin='normal'
                                 fullWidth
                                 autoComplete='off'
                                 label='Address Line 1'
                                 id='addressLine1'
                                 name='addressLine1'
                                 value={values.addressLine1}
                                 onChange={(e) => {
                                    handleChange(e);
                                    _handleChange(e, errors);
                                 }}
                                 onBlur={handleBlur}
                                 error={Boolean(touched.addressLine1 && errors.addressLine1)}
                                 helperText={
                                    touched.addressLine1 && errors.addressLine1
                                       ? errors.addressLine1
                                       : 'Please enter address'
                                 }
                              />
                           </FormGroup>
                        </Col>

                        <Col xs={12} sm={6}>
                           <FormGroup>
                              <TextField
                                 variant='outlined'
                                 margin='normal'
                                 fullWidth
                                 autoComplete='off'
                                 label='Address Line 2'
                                 id='addressLine2'
                                 name='addressLine2'
                                 value={values.addressLine2}
                                 onChange={(e) => {
                                    handleChange(e);
                                    _handleChange(e, errors);
                                 }}
                                 onBlur={handleBlur}
                                 error={Boolean(touched.addressLine2 && errors.addressLine2)}
                                 helperText={
                                    touched.addressLine2 && errors.addressLine2
                                       ? errors.addressLine2
                                       : 'Please enter address'
                                 }
                              />
                           </FormGroup>
                        </Col>
                     </Row>
                     <Row>
                        <Col xs={12} sm={6}>
                           <FormGroup>
                              <TextField
                                 variant='outlined'
                                 margin='normal'
                                 fullWidth
                                 autoComplete='off'
                                 label='Address Line 3'
                                 id='addressLine3'
                                 name='addressLine3'
                                 value={values.addressLine3}
                                 onChange={(e) => {
                                    handleChange(e);
                                    _handleChange(e, errors);
                                 }}
                                 onBlur={handleBlur}
                                 error={Boolean(touched.addressLine3 && errors.addressLine3)}
                                 helperText={
                                    touched.addressLine3 && errors.addressLine3
                                       ? errors.addressLine3
                                       : 'Please enter address'
                                 }
                              />
                           </FormGroup>
                        </Col>
                        <Col xs={12} sm={6}>
                           <FormControl style={{ marginTop: 20 }}>
                              {/* <FormLabel component='legend'>VOD Service Enabled</FormLabel> */}
                              <Typography color='textSecondary'>
                                 <FormControlLabel
                                    value={!values.isVODServiceEnabled}
                                    label='VOD Service Enabled:   '
                                    labelPlacement='start'
                                    control={
                                       <Switch
                                          id='isVODServiceEnabled'
                                          name='isVODServiceEnabled'
                                          checked={values.isVODServiceEnabled}
                                          onChange={(e) => {
                                             handleChange(e);

                                             setState({
                                                ...state,
                                                [e.target.id]: e.target.value == 'true',
                                                isValid: isValid,
                                             });
                                          }}
                                          color='primary'
                                       />
                                    }
                                 />
                              </Typography>
                              <FormHelperText style={{ marginLeft: 13 }}>
                                 {' '}
                                 Please set the switch according to VOD Service required to hotel or
                                 not
                              </FormHelperText>
                              <FormLabel></FormLabel>
                           </FormControl>
                        </Col>
                     </Row>
                  </Form>
               );
            }}
         </Formik>
      </ThemeProvider>
   );
}

export function LogonBgImage(props) {
   const [res1_1Logo, setRes1_1Logo] = React.useState(null);

   const [res16_9BgImg, setRes16_9BgImg] = React.useState(null);

   const res1x1Logo = (data) => {
      setRes1_1Logo(data);
   };

   const res16x9BgImg = (data) => {
      setRes16_9BgImg(data);
   };

   useEffect(() => {
      let data = { logos: { res1_1Logo }, bgImg: { res16_9BgImg } };

      props.parentCallback(data);
   }, [res1_1Logo, res16_9BgImg]);
   return (
      <Form>
         <Row form>
            <div>
               <Typography color='textPrimary' variant='subtitle2' align='right'>
                  {' '}
                  Upload Logo
               </Typography>
            </div>
            <br></br>
         </Row>
         <Row form>
            <Col md={2}>
               <FormGroup>
                  <ImageUploader
                     res={res1x1Logo}
                     cond={{
                        AR: 1,
                        message: 'You can only upload only 1:1 aspect ratio file',
                     }}
                     info={null}
                  />
                  <FormText color='muted'>1:1 resolution *</FormText>
               </FormGroup>
            </Col>
            {/* <Col md={2}>
               <FormGroup>
                  <ImageUploader
                     res={res16x9Logo}
                     cond={{
                        AR: 1.7777777777777777,
                        message: 'You can upload only PNG/JPG image type with 16:9 aspect ratio',
                     }}
                     info={null}
                  />

                  <FormText color='muted'>16:9 resolution *</FormText>
               </FormGroup>
            </Col> */}
         </Row>
         <Row form>
            <div>
               <Typography color='textPrimary' variant='subtitle2' align='right'>
                  {' '}
                  Upload Background
               </Typography>
            </div>
            <br></br>
         </Row>
         <Row form>
            <Col md={2}>
               <FormGroup>
                  <ImageUploader
                     res={res16x9BgImg}
                     cond={{
                        minAR: 1.5777777777777777,
                        maxAR: 2.0,
                        message: 'You can only upload only 16:9 aspect ratio file',
                     }}
                     info={null}
                  />-
                  <FormText color='muted'>16:9 resolution </FormText>
               </FormGroup>
            </Col>
         </Row>
      </Form>
   );
}

export function SelectChannels(props) {
   let options = []; //props.info ? props.info.objects.map(e => { return { value: e.id, label: e.description, image: e.images[0].url } }) : [];
   const [selected, setSelected] = React.useState([]);
   const classes = useStyles();
   useEffect(() => {
      let data = { selected_channels: selected };
      props.parentCallback(data);
   }, [selected]);

   return (
      <Form>
         <Row form>
            <div className={classes.selectBoxSize}>
               <MultiSelect
                  options={options}
                  value={selected}
                  onChange={setSelected}
               />
            </div>
         </Row>

      </Form>
   );
}
