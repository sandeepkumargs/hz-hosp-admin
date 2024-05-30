/**Rendering of AddThirdParty component
 * Tabs of Material Ui used
 * Select and text Fields or boxes of reactstrap is used
 */

//import basic react, router required files
import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addThirdPartyServices, updateThirdPartyServices } from '../actions';
//Importing Material UI files as per need
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Typography, Box, Button, TextField } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
//Importing reactstrap functions required
import { Row, Col } from 'reactstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormControl from '@material-ui/core/FormControl';
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
         {/* Box is the body under the tab */}
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
      width: '100%',
      padding: '20px',
      margin: theme.spacing(1),
   },
   button: {
      margin: theme.spacing(1),
   },
   dailog: {
      backgroundColor: '#FFFFFF',
      color: '#000000',
   },
}));

//Default Edit is a function as Material UI does not support Class and returns error
function AddThirdParty(props) {
   const classes = useStyles();
   const theme = useTheme();
   var str = useLocation().search;
   var hashStr = useLocation().hash;

      let serviceData = str.substring(str.indexOf('?') + 1, str.length).split('-');
   
   if(serviceData.length > 3){
      var temp = serviceData.slice(2).join('-');
      serviceData = [serviceData[0], serviceData[1], temp];
   }

   if(hashStr != ""){
      serviceData[2] = serviceData[2]+hashStr;
   }

   const [value, setValue] = React.useState(0);
   const [open, setOpen] = React.useState(false);
   const [error, setError] = React.useState(true);
   const [state, setState] = React.useState({
      webName: serviceData ? serviceData[1] : '',
      urlLink: serviceData ? serviceData[2] : '',
      disable: true,
   });
   const _handleClose = () => {};
   const onClick = () => {
      setError(false);
      if (props.thirdPartyServicesList.status == 422) {
         props.history.push('/login');
      } else if (props.thirdPartyServicesList.status == 200) {
         props.history.push('/thirdParty');
      }
   };

   const handleChangeIndex = (index) => {
      setValue(index);
   };
   const _handleSubmit = ({ webName, urlLink }) => {
      const thirdPartyService = {
         id: serviceData ? serviceData[0] : null,
         name: webName,
         url: urlLink,
      };

      if (serviceData.length === 1) {
         props.addThirdPartyServices(thirdPartyService);
      } else {
         props.updateThirdPartyServices(thirdPartyService);
      }
   };

   const _handleChange = (event) => {
      setState({
         ...state,
         [event.target.id]: event.target.value,
      });
   };

   const onCancel = () => {
      props.history.push('/thirdParty');
   };
   return props.thirdPartyServicesList.loading ? (
      <Spinner />
   ) : (
      <div>
         <Link to={`/thirdParty`}>
            <ArrowBackIcon></ArrowBackIcon>
            <Typography variant='button' gutterBottom>
               Back
            </Typography>
         </Link>
         <br></br>
         <br></br>
         <Typography variant='h5' style={{ marginLeft: 20 }} gutterBottom>
            {' '}
            {serviceData.length === 1 ? 'Add Third Party Service' : 'Edit Third Party Service'}{' '}
         </Typography>

         {/* ------------------------------Tab desinging in Material UI------------------------------ */}
         <div className={classes.root}>
            <AppBar position='static' color='default'></AppBar>
            <SwipeableViews
               axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
               index={value}
               onChangeIndex={handleChangeIndex}>
               {/* ------------------------------Tabs contents in reactstrap------------------------------ */}
               <TabPanel value={value} index={0} dir={theme.direction}>
                  <Formik
                     className={classes.root}
                     initialValues={{
                        webName: serviceData ? serviceData[1] : '',
                        urlLink: serviceData ? serviceData[2] : '',
                     }}
                     validationSchema={yup.object({
                        webName: yup
                           .string()
                           .matches(
                              /^\w*[a-zA-Z]\w*[0-9.@_\\/-\w\s]+$/,
                              'Please enter valid Third Party Service Name'
                           )
                           .required('Third Party Service Name is required')
                           .trim(),
                        urlLink: yup
                           .string()
                           .url('Please enter valid Third Party Service URL')
                           .required('Third Party Service URL is required'),
                     })}
                     onSubmit={({ webName, urlLink }, { setSubmitting, resetForm }) =>
                        _handleSubmit({
                           webName,
                           urlLink,
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

                        console.log("X1", values);
                        return (
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
                                             label='Third Party Service Name'
                                             id='webName'
                                             name='webName'
                                             disabled={serviceData.length !== 1}
                                             value={values.webName}
                                             onChange={(e) => {
                                                handleChange(e);
                                                _handleChange(e);
                                             }}
                                             onBlur={handleBlur}
                                             error={Boolean(touched.webName && errors.webName)}
                                             helperText={
                                                touched.webName && errors.webName
                                                   ? errors.webName
                                                   : 'Please enter Third Party Service Name'
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
                                             label='Third Party Service URL'
                                             id='urlLink'
                                             name='urlLink'
                                             value={values.urlLink}
                                             onChange={handleChange}
                                             onBlur={handleBlur}
                                             error={Boolean(touched.urlLink && errors.urlLink)}
                                             helperText={
                                                touched.urlLink && errors.urlLink
                                                   ? errors.urlLink
                                                   : 'Please enter Third Party Service URL'
                                             }
                                          />
                                       </FormControl>
                                    </Col>
                                 </Row>

                                 <Row style={{ marginTop: 10 }}>
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
                                          disabled={Boolean(!isValid)}>
                                          {serviceData.length > 1 ? 'Save' : 'Add '}
                                       </Button>
                                    </Col>
                                 </Row>
                              </form>
                           </div>
                        );
                     }}
                  </Formik>
               </TabPanel>
            </SwipeableViews>
         </div>

         {props.thirdPartyServicesList.error && error ? (
            <Alert
               isOpen={props.thirdPartyServicesList.error}
               onClose={_handleClose}
               hasTwoButtons={false}
               handleSubmit={onClick}
               status={props.thirdPartyServicesList.status}
               title={'Add Third Party Service'}
               text={props.thirdPartyServicesList.message}
               submitButtonText='OK'
            />
         ) : null}
      </div>
   );
}

const mapStateToProps = (state) => {
   return {
      thirdPartyServicesList: state.thirdPartyServices,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      addThirdPartyServices: (thirdPartyService) =>
         dispatch(addThirdPartyServices(thirdPartyService)),
      updateThirdPartyServices: (thirdPartyService) =>
         dispatch(updateThirdPartyServices(thirdPartyService)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddThirdParty);
