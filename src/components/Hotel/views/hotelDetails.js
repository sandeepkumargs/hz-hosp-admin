import React, { Component, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getHotelDetails, deleteHotels, updateHotel, configDevices, getThemes, getChannels } from '../actions';
import _ from 'lodash';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Typography, Button, Divider } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Devices from './Devices';
import Hidden from '@material-ui/core/Hidden';
import Spinner from '../../../utils/Spinner';
import Alert from '../../../utils/Alert';
import { theme } from '../../CustomToolbarStyle';
import {
   HotelInfoEditDailog,
   SelectLang,
   ConfigDevices,
   EditTheme,
   ChangeBaseCurrency,
   SelectChannels,
} from './edit';
import { setIn } from 'formik';

//Customised styling is implemented
const useStyles = makeStyles((theme) => ({
   root: {
      backgroundColor: '#FFFFFF',
      color: '#000000',
      width: '100%',
      padding: '20px',
   },
   deviceInfo: {
      backgroundColor: '#F9FAFC',
      color: '#000000',
      width: '100%',
      paddingLeft: 10,
   },
   button: {
      margin: theme.spacing(1),
   },
   dailog: {
      backgroundColor: '#FFFFFF',
      color: '#000000',
   },
   detailsFont: {
      fontWeight: 550,
      fontSize: 15,
   },
}));

function HotelDetails(props) {
   var userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
   const classes = useStyles();
   var str = useLocation().search;
   let items;
   const hotelInfo = str.substring(str.lastIndexOf('?') + 1, str.length).split('-');
   React.useEffect(() => {
      props.getChannels(hotelInfo[1]);
   }, [])

   const [openThemeDailog, setOpenThemeDailog] = React.useState(false);
   const [openHotelInfo, setOpenHotelInfo] = React.useState(false);
   const [openSelectChannels, setOpenSelectChannels] = React.useState(false);
   const [openConfigDevices, setOpenConfigDevices] = React.useState(false);
   const [openEditTheme, setOpenEditTheme] = React.useState(false);
   const [error, setError] = React.useState(true);
   const [success, setSuccess] = React.useState(true);
   const [changeCurrency, setChangeCurrency] = React.useState(null);
   const [devicesInfo, setDevicesInfo] = React.useState({
      privateDevices: 0,
      publicDevices: 0,
      bufferDevices: 0,
   });
   const [info, setInfo] = React.useState(props.hotelDetails.hotel.metadata);

   const [state, setState] = React.useState({
      hotelId: null,
      selectLang: false,
      langauges: props.hotelDetails.hotel.metadata
         ? props.hotelDetails.hotel.metadata.selected_language
         : null,
   });
   const _handleClose = () => {
      setError(false);
   };
   const onClick = () => {
      setError(false);
      setSuccess(false);
      if (props.hotelDetails.status == 422) {
         window.location = '/login';
      }
      window.location.reload();
   };
   const handleClickInfo = () => {
      setInfo(props.hotelDetails.hotel.metadata);
      setOpenHotelInfo(true);
   };
   const handleClickTheme = () => {
      setInfo(props.hotelDetails.hotel.metadata);
      setOpenEditTheme(true);
   };
   const handleSelectChannels = async () => {
      setInfo(props.hotelDetails.hotel.metadata);
      setOpenSelectChannels(true);
   };
   const handleCloseEditTheme = (data) => {
      setOpenEditTheme(false);
      if (data) {
         props.updateHotel({
            ...props.hotelDetails.hotel.metadata,
            hotel_id: hotelInfo[1],
            ...data,
         });
      }
   };
   const handleConfigDevices = () => {
      setOpenConfigDevices(true);
   };

   const handleCloseConfigDevices = (data) => {
      setOpenConfigDevices(false);
      if (data)
         setDevicesInfo({
            privateDevices: data.privateDevices,
            publicDevices: data.publicDevices,
            bufferDevices: data.bufferDevices,
         });
   };
   useEffect(() => {
      if (devicesInfo.privateDevices !== 0) {
         props.configDevices({
            id: hotelInfo[1],
            jwt_token: userDetails.jwt_token,
            devicesInfo,
         });
         props.getHotelDetails({
            hotelId: hotelInfo[1],
            jwt_token: userDetails.jwt_token,
         });
      }
   }, [devicesInfo]);
   const handleCloseTheme = (newValue) => {
      setOpenThemeDailog(false);
      if (newValue) {
         setThemes(newValue);
      }
   };
   const handleCloseInfo = (newValue) => {
      setOpenHotelInfo(false);
      if (newValue) {
         props.updateHotel({
            ...props.hotelDetails.hotel.metadata,
            hotel_id: hotelInfo[1],
            ...newValue,
         });
      }
   };
   const handleCloseSelectChannels = (newValue) => {
      setOpenSelectChannels(false);
      if (newValue) {
         props.updateHotel({
            ...props.hotelDetails.hotel.metadata,
            selected_channels: newValue,
            hotel_id: hotelInfo[1],
         });
      }
   };

   useEffect(() => {
      if (props.HotelDetails) {
         setInfo(props.hotelDetails.hotel.metadata);
      }
   }, [props]);

   const handleClickLang = (evt) => {
      setInfo(props.hotelDetails.hotel.metadata);
      setState({
         hotelId: evt,
         selectLang: true,
         langauges: props.hotelDetails.hotel.metadata
            ? props.hotelDetails.hotel.metadata.selected_language
            : null,
      });
   };

   const handleCloseLang = (newValue) => {
      setState({
         selectLang: false,
      });
      if (newValue) {
         props.updateHotel({
            ...props.hotelDetails.hotel.metadata,
            hotel_id: hotelInfo[1],
            selected_language: newValue,
            jwt_token: userDetails.jwt_token,
         });
         setState({
            selectLang: false,
            langauges: newValue,
         });
      }
   };

   function usePrevious(value) {
      const ref = useRef();
      useEffect(() => {
         ref.current = value;
      });
      return ref.current;
   }

   useEffect(() => {
      props.getThemes(userDetails.jwt_token);
      props.getHotelDetails({
         hotelId: hotelInfo[1],
         jwt_token: userDetails.jwt_token,
      });
   }, []);
   const devInUse = (devices) => {
      let priv = _.countBy(devices, function (dev) {
         return dev.state == 'Private';
      }).true;

      let publ = _.countBy(devices, function (dev) {
         return dev.state == 'Public';
      }).true;

      return (priv ? priv : 0) + (publ ? publ : 0);
   };
   const devInfaulty = (devices) => {
      return _.countBy(devices, function (dev) {
         return dev.state == 'Faulty';
      }).true;
   };
   React.useEffect(() => {
      props.hotelDetails.hotel;
   });

   const handleCloseCurrency = (newValue) => {
      console.log(newValue);
      setInfo(props.hotelDetails.hotel.metadata);
      setChangeCurrency(false);
      if (newValue) {
         props.updateHotel({
            ...props.hotelDetails.hotel.metadata,
            hotel_id: hotelInfo[1],
            base_currency: newValue,
         });
      }
   };
   return props.hotelDetails.loading ? (
      <Spinner />
   ) : (
      <ThemeProvider theme={theme}>
         <div style={{ margin: 10 }}>
            <Link to={`/hotelList`}>
               <ArrowBackIcon></ArrowBackIcon>
               <Typography variant='button' gutterBottom>
                  Back
               </Typography>
            </Link>
            <div>
               <Paper className={classes.root}>
                  <Grid container wrap='nowrap' spacing={2}>
                     <Hidden only='xs'>
                        <Grid item>
                           <img
                              src={props.hotelDetails.hotel.metadata.logo_1x1}
                              className='hotelLogo'
                              style={{ width: 200 }}
                           />
                        </Grid>
                     </Hidden>
                     <Grid container spacing={3}>
                        <Grid item xs={12}>
                           <Typography
                              variant='caption'
                              color='textSecondary'
                              display='block'
                              gutterBottom>
                              Hotel Name
                           </Typography>
                           <Typography variant='h5' gutterBottom>
                              {props.hotelDetails.hotel.metadata
                                 ? props.hotelDetails.hotel.metadata.firstName +
                                 ' ' +
                                 props.hotelDetails.hotel.metadata.lastName
                                 : null}
                           </Typography>
                        </Grid>
                        {/* <Grid item xs={6} sm={3}>
                        <Typography variant='caption' color='textSecondary' gutterBottom>
                           Hotel Id
                        </Typography>
                        <br></br>
                        <Typography variant='caption' color='textSecondary' gutterBottom>
                           {hotelInfo[1]}
                        </Typography>
                     </Grid> */}
                        <Grid item xs={12} sm={6} md={3}>
                           <Typography variant='caption' color='textSecondary' gutterBottom>
                              BRN Number
                           </Typography>
                           <Typography className={classes.detailsFont} gutterBottom>
                              {props.hotelDetails.hotel.metadata
                                 ? props.hotelDetails.hotel.metadata.BRN_Number
                                 : '-'}
                           </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={3}>
                           <Typography variant='caption' color='textSecondary' gutterBottom>
                              Hotel Contact Number
                           </Typography>
                           <Typography className={classes.detailsFont} gutterBottom>
                              {props.hotelDetails.hotel.metadata
                                 ? props.hotelDetails.hotel.metadata.hotelContactNumber
                                 : '-'}
                           </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={3}>
                           <Typography variant='caption' color='textSecondary' gutterBottom>
                              Technical Contact Number
                           </Typography>
                           <Typography className={classes.detailsFont} gutterBottom>
                              {props.hotelDetails.hotel.metadata
                                 ? props.hotelDetails.hotel.metadata.technicalContactNumber
                                 : '-'}
                           </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                           <Typography variant='caption' color='textSecondary' gutterBottom>
                              Selected Language
                           </Typography>

                           <Typography className={classes.detailsFont} gutterBottom>
                              {Array.isArray(props.hotelDetails.hotel.metadata.selected_language)
                                 ? props.hotelDetails.hotel.metadata.selected_language.join(', ')
                                 : null}
                           </Typography>
                        </Grid>
                        {/* <Grid item xs={6} sm={3}>
                        <Typography variant='caption' color='textSecondary' gutterBottom>
                           Total Devices
                        </Typography>

                        <Typography className={classes.detailsFont}  gutterBottom>
                           {props.hotelDetails.hotel.devices
                              ? props.hotelDetails.hotel.devices.length
                              : null}
                        </Typography>
                     </Grid>
                     <Grid item xs={6} sm={3}>
                        <Typography variant='caption' color='textSecondary' gutterBottom>
                           Devices in Use
                        </Typography>

                        <Typography className={classes.detailsFont}  gutterBottom>
                           {props.hotelDetails.hotel.devices
                              ? props.hotelDetails.hotel.devices.length >= 1
                                 ? devInUse(props.hotelDetails.hotel.devices)
                                 : '-'
                              : '-'}
                        </Typography>
                     </Grid>
                     <Grid item xs={6} sm={3}>
                        <Typography variant='caption' color='textSecondary' gutterBottom>
                           Devices in Faulty
                        </Typography>
                        <Typography className={classes.detailsFont}  gutterBottom>
                           {props.hotelDetails.hotel.devices
                              ? devInfaulty(props.hotelDetails.hotel.devices)
                              : null}
                        </Typography>
                     </Grid>
                     <Grid item xs={6} sm={3}>
                        <Typography variant='caption' color='textSecondary' gutterBottom>
                           Devices in Faulty
                        </Typography>
                        <Typography className={classes.detailsFont}  gutterBottom>
                           {props.hotelDetails.hotel.metadata
                              ? props.hotelDetails.hotel.metadata.totalNumOfBufferConnections
                              : null}
                        </Typography>
                     </Grid> */}
                        <Grid item xs={6} sm={6} md={3}>
                           <Typography variant='caption' color='textSecondary' gutterBottom>
                              Selected Theme
                           </Typography>
                           <Typography className={classes.detailsFont} gutterBottom noWrap>
                              {props.hotelDetails.hotel.theme
                                 ? props.hotelDetails.hotel.theme.type == 'vertical'
                                    ? 'Vertical'
                                    : 'Horizontal'
                                 : '-'}
                           </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={3}>
                           <Typography variant='caption' color='textSecondary' gutterBottom>
                              Selected color scheme
                           </Typography>

                           <Typography className={classes.detailsFont} gutterBottom noWrap>
                              {props.hotelDetails.hotel.theme.colorScheme
                                 ? props.hotelDetails.hotel.theme.colorScheme.color_scheme_name
                                 : '-'}
                           </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={3}>
                           <Typography variant='caption' color='textSecondary' gutterBottom>
                              Email
                           </Typography>
                           <Typography className={classes.detailsFont} gutterBottom>
                              {props.hotelDetails.hotel.metadata
                                 ? props.hotelDetails.hotel.metadata.email
                                 : '-'}
                           </Typography>
                        </Grid>
                        <Grid item xs={6} zeroMinWidth>
                           <Typography variant='caption' color='textSecondary' gutterBottom>
                              Address
                           </Typography>
                           <Typography variant='body2' gutterBottom noWrap>
                              {props.hotelDetails.hotel.metadata
                                 ? props.hotelDetails.hotel.metadata.addressLine1 +
                                 ',' +
                                 props.hotelDetails.hotel.metadata.addressLine2 +
                                 ', ' +
                                 props.hotelDetails.hotel.metadata.addressLine3
                                 : null}
                           </Typography>
                        </Grid>{' '}
                        <Grid item xs={6} sm={6} md={3}>
                           <Typography variant='caption' gutterBottom>
                              Master Serial Number
                           </Typography>
                           <Typography className={classes.detailsFont} gutterBottom>
                              {props.hotelDetails.hotel.metadata
                                 ? props.hotelDetails.hotel.metadata.serial_number
                                 : '-'}
                           </Typography>
                        </Grid>
                        <Grid item xs={3} zeroMinWidth>
                           <Typography variant='caption' color='textSecondary' gutterBottom>
                              Base Currency
                           </Typography>
                           <Typography className={classes.detailsFont} gutterBottom noWrap>
                              {props.hotelDetails.hotel.metadata
                                 ? props.hotelDetails.hotel.metadata.base_currency
                                 : '-'}
                           </Typography>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                           <Button
                              fullWidth
                              variant='outlined'
                              color='primary'
                              onClick={() => {
                                 handleClickLang(props.hotelDetails.hotel.hotelId);
                              }}>
                              Change Language
                           </Button>
                        </Grid>
                        <Grid item xs={4} sm={4}>
                           <Button
                              variant='outlined'
                              fullWidth
                              color='primary'
                              onClick={handleClickTheme}>
                              Change Theme
                           </Button>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                           <Button
                              fullWidth
                              variant='outlined'
                              color='primary'
                              onClick={() => {
                                 setChangeCurrency(true);
                              }}>
                              Change Base Currency
                           </Button>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                           <Button
                              variant='outlined'
                              fullWidth
                              color='primary'
                              onClick={handleClickInfo}>
                              Edit Hotel information
                           </Button>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                           <Button
                              variant='outlined'
                              fullWidth
                              color='primary'
                              onClick={handleSelectChannels}>
                              Select Channels
                           </Button>
                        </Grid>
                        {/* <Grid item xs={6} sm={4}>
                           <Button
                              fullWidth
                              variant='outlined'
                              color='primary'
                              disabled={
                                 props.hotelDetails.hotel.devices
                                    ? props.hotelDetails.hotel.devices.length > 0
                                       ? false
                                       : true
                                    : true
                              }
                              onClick={() => {
                                 handleConfigDevices(props.hotelDetails.hotel);
                              }}>
                              Configure Devices
                           </Button>
                        </Grid> */}
                     </Grid>
                  </Grid>
               </Paper>
            </div>

            <div style={{ marginTop: 20 }}>
               <Paper className={classes.deviceInfo}>
                  {' '}
                  <Grid container spacing={1}>
                     <Grid item xs={6} sm={2}>
                        <Typography variant='caption' color='textSecondary' gutterBottom>
                           Private Connections
                        </Typography>
                        <Typography className={classes.detailsFont} gutterBottom>
                           {props.hotelDetails.hotel.metadata
                              ? props.hotelDetails.hotel.metadata.totalNumOfPrivateConnections
                              : '-'}
                        </Typography>
                     </Grid>
                     <Grid item xs={6} sm={2}>
                        <Typography variant='caption' color='textSecondary' gutterBottom>
                           Public Connections
                        </Typography>
                        <Typography className={classes.detailsFont} gutterBottom>
                           {props.hotelDetails.hotel.metadata
                              ? props.hotelDetails.hotel.metadata.totalNumOfPublicConnections
                              : '-'}
                        </Typography>
                     </Grid>
                     <Grid item xs={6} sm={2}>
                        <Typography variant='caption' color='textSecondary' gutterBottom>
                           Buffer Connections
                        </Typography>
                        <Typography className={classes.detailsFont} gutterBottom>
                           {props.hotelDetails.hotel.metadata
                              ? props.hotelDetails.hotel.metadata.totalNumOfBufferConnections
                              : '-'}
                        </Typography>
                     </Grid>
                     <Grid item xs={6} sm={2}>
                        <Typography variant='caption' color='textSecondary' gutterBottom>
                           Devices in Faulty
                        </Typography>
                        <Typography className={classes.detailsFont} gutterBottom>
                           {'-'}
                        </Typography>
                     </Grid>
                     <Grid item xs={6} sm={2}>
                        <Typography variant='caption' color='textSecondary' gutterBottom>
                           Total Connections
                        </Typography>
                        <Typography className={classes.detailsFont} gutterBottom>
                           {props.hotelDetails.hotel.devices
                              ? props.hotelDetails.hotel.metadata.totalNumOfConnections
                              : '-'}
                        </Typography>
                     </Grid>

                     <Grid item xs={6} sm={2}>
                        <Typography variant='caption' color='textSecondary' gutterBottom>
                           Total Occupancy Connections
                        </Typography>
                        <Typography className={classes.detailsFont} gutterBottom>
                           {props.hotelDetails.hotel.devices
                              ? props.hotelDetails.hotel.metadata.totalNumOfOccupancyConnections
                              : '-'}
                        </Typography>
                     </Grid>
                  </Grid>
                  <Divider />
               </Paper>
               <Devices />{' '}
            </div>
            <div>
               {openHotelInfo ? (
                  <HotelInfoEditDailog
                     open={openHotelInfo}
                     onClose={handleCloseInfo}
                     value={info}
                     postCodes={props.postCodes ? props.postCodes : null}
                  />
               ) : null}
               <SelectLang
                  open={state.selectLang}
                  onClose={handleCloseLang}
                  value={state.langauges}
               />
               {changeCurrency ? (
                  <ChangeBaseCurrency
                     open={changeCurrency}
                     onClose={handleCloseCurrency}
                     selected_info={
                        props.hotelDetails.hotel.metadata &&
                        props.hotelDetails.hotel.metadata.base_currency
                     }
                  />
               ) : null}
               {openEditTheme ? (
                  <EditTheme
                     open={openEditTheme}
                     onClose={handleCloseEditTheme}
                     value={props.themes}
                     selected_info={props.hotelDetails.hotel}
                  />
               ) : null}
               {openSelectChannels ? (
                  <SelectChannels
                     open={openSelectChannels}
                     onClose={handleCloseSelectChannels}
                     data={props.hotelDetails ? props.hotelDetails : null}
                  />
               ) : null}
               {openConfigDevices ? (
                  <ConfigDevices
                     open={openConfigDevices}
                     onClose={handleCloseConfigDevices}
                     value={props.hotelDetails.hotel}
                  />
               ) : null}
               {props.hotelDetails.error && error ? (
                  <Alert
                     isOpen={props.hotelDetails.error}
                     onClose={_handleClose}
                     hasTwoButtons={false}
                     handleSubmit={onClick}
                     status={props.hotelDetails.status}
                     title='Warning'
                     text={props.hotelDetails.errorMessage}
                     submitButtonText='OK'
                  />
               ) : null}
               {props.hotelDetails.success && success ? (
                  <Alert
                     isOpen={props.hotelDetails.success}
                     onClose={_handleClose}
                     hasTwoButtons={false}
                     handleSubmit={onClick}
                     title='Success'
                     text='Hotel details updated successfully'
                     submitButtonText='OK'

                  />
               ) : null}
            </div>
         </div>
      </ThemeProvider>
   );
}

const mapStateToProps = (state) => {
   return {
      postCodes: state.postCodes,
      hotelDetails: state.hotels,
      themes: state.themes,
      getChannels: state.getChannels,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getHotelDetails: (hotelId) => dispatch(getHotelDetails(hotelId)),
      getChannels: (hotelId) => dispatch(getChannels(hotelId)),
      deleteHotels: (hotels) => dispatch(deleteHotels(hotels)),
      updateHotel: (hotel) => dispatch(updateHotel(hotel)),
      configDevices: (configInfo) => dispatch(configDevices(configInfo)),
      getThemes: (jwt_token) => dispatch(getThemes(jwt_token)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(HotelDetails);
