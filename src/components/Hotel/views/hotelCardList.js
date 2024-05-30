import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getHotels, getHotelWithDeviceSerialNO, deleteHotels, updateHotel, deleteHotel } from '../actions';
import { Typography, Grid, IconButton, Button, ButtonBase } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import AlertDialog from '../../../utils/warning';
import _ from 'lodash';
import CustomToolbar from './CustomToolbar';
import Loader from '../../../utils/loader';
import { getMuiTheme } from '../../CustomToolbarStyle';
import Spinner from '../../../utils/Spinner';
import Hidden from '@material-ui/core/Hidden';
import Alert from '../../../utils/Alert';
import axios from 'axios';

let userDetails, timeout;;

const useStyles = (theme) => ({
   root: {
      width: '100%',
      margin: theme.spacing(3),
   },
   search: {
      minWidth: 250,
      maxWidth: 400,
      justifyContent: 'flex-end',
      alignSelf: 'flex-end',
   },
   media: {
      height: 100,
   },
   img: {
      width: '170px',
      // marginLeft: theme.spacing(3),
   },
   card: {
      display: 'flex',
      align: 'flex-end',
      margin: 10,
      backgroundColor: '#FFFFFF',
      color: '#000000',
      // padding: theme.spacing(1),
   },
   details: {
      display: 'flex',
      alignItems: 'center',
   },

   cover: {
      display: 'flex',
      width: 500,
      height: 200,
   },
   input: {
      marginLeft: theme.spacing(1),
      flex: 1,
   },
   iconButton: {
      float: 'right',
      // padding:10,
      margin: 10,
   },
   heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '100%',
      flexShrink: 0,
   },
   secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
   },
   grid: {
      // boxShadow: "none",
      padding: '20px',
      '&:hover': {
         // backgroundColor: "#FFFFFF"
         boxShadow: 'none',
         // boxShadow: 3,
         // backgroundColor: '#e6f1f6'
      },
   },
   detailsFont: {
      fontWeight: 550,
      fontSize: 16,
   },
   buttonFont: {
      alignItems: 'center',
      fontWeight: 520,
      fontSize: 15,
   }
});

class HotelList extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         hotelId: null,
         filtered: this.props.hotelsList.hotels,
         expanded: false,
         selectLang: false,
         langauges: ['English'],
         list: [],
         loading: true,
         delete: false,
         error: true,
         warning: false,
         dialog: false,
         loadingStatus: false
      };
      this.handleChange = this.handleChange.bind(this);
      this._handleClose = this._handleClose.bind(this);
      this.onClick = this.onClick.bind(this);
      this.expanded = false;
   }
   _handleClose = () => {
      this.setState({
         ...this.state,
         error: false,
      });
   };
   onClick = () => {
      this.setState({
         ...this.state,
         error: false,
      });
      if (this.props.hotelsList.status == 422) {
         window.location = '/login';
      }
   };
   handleDialogClose = () => {
      this.setState({
         ...this.state,
         warning: false,
      });
   };
   handleDelete = () => {
      this.setState({
         ...this.state,
         warning: false,
      });
      this.props.deleteHotel(this.state.hotelId);
      window.location.reload();
   };
   componentWillNewReceiveProps(nextProps) { }
   componentDidUpdate(prevProps, prevState) {
      if (this.props.hotelsList.loginError) {
         this.props.history.push('/login');
      }
      if (prevProps !== this.props) {
         this.setState({
            filtered: this.props.hotelsList ? this.props.hotelsList.hotels : [],
         });
      }
   }
   componentDidMount() {
      userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
      if (userDetails.jwt_token) this.props.getHotels(userDetails.jwt_token);
      this.setState(
         {
            loading: false,
            filtered: this.props.hotelsList.hotels,
         },
         () =>
            this.setState({
               loading: false,
               filtered: this.props.hotelsList.hotels,
            })
      );
   }

   handleChange(e) {
      let currentList = [];
      let newList = [];
      let value = e.target.value
      if (value !== '') {
         currentList = this.props.hotelsList.hotels;

         if(!isNaN(value)){
            this.props.getHotelWithDeviceSerialNOApi(value)
         }
         else{            
            newList = currentList.filter((item) => {
               // change current item to lowercase
   
               const lc = item.metadata.firstName.toLowerCase();
               // change search term to lowercase
               const filter = value.toLowerCase();
               return lc.includes(filter);
            });

            this.setState({
               filtered: newList,
            });
         }

         
      } else {
         if (userDetails.jwt_token) this.props.getHotels(userDetails.jwt_token);
      }
         
   }

   render() {
      const { classes } = this.props;
      const countDev = (devices) => {
         let priv = _.countBy(devices, function (dev) {
            return dev.state == 'Private';
         }).true;

         let publ = _.countBy(devices, function (dev) {
            return dev.state == 'Public';
         }).true;

         return (priv ? priv : 0) + (publ ? publ : 0);
      };
      return (
         <MuiThemeProvider theme={getMuiTheme}>
            <div style={{ margin: 10 }}>
               {this.props.hotelsList.loading ? (
                  <Spinner />
               ) : (
                  <div>
                     <br></br>
                     <div>
                        <Grid container>
                           <Grid item xs={12} sm={8} md={10}>
                           <Paper component='form' className={classes.search}>
                              <IconButton aria-label='search'>
                                 <SearchIcon />
                              </IconButton>
                              <InputBase
                                 placeholder='Search hotel by name or device serialNo'
                                 onChange={this.handleChange}
                                 style={{ width: '80%' }} // Set the width to 100%
                              />
                              </Paper>
                           </Grid>
                           <Grid item xs={12} sm={4} md={2}>
                              {' '}
                              <div className={classes.iconButton}>
                                 <CustomToolbar />
                              </div>
                           </Grid>
                        </Grid>
                     </div>

                     {
                        (this.state.filtered.length == 0) ? 
                           <Typography>Sorry, no matching records found</Typography>
                        : (
                           this.state.filtered.map((item) => (
                              <Grid item xs={12} key={item._id}>
                                 &nbsp;
                                 <div>
                                    <Paper
                                       className={classes.grid}
                                       onClick={() => {
                                          this.props.history.push(
                                             `/hotelDetails?${(item.metadata
                                                ? item.metadata.firstName + item.metadata.lastName
                                                : null) +
                                             '-' +
                                             item._id
                                             }`
                                          );
                                       }}>
                                       <Grid
                                          container
                                          wrap='nowrap'
                                          justify='space-around'
                                          alignItems='center'
                                          spacing={2}>
                                          <Hidden only='xs'>
                                             {/* only={["sm", "md", "lg", "xl"]} */}
   
                                             <Grid item xs={4} sm={4}>
                                                <Link
                                                   to={`/hotelDetails?${(item.metadata
                                                      ? item.metadata.firstName +
                                                      item.metadata.lastName
                                                      : null) +
                                                      '-' +
                                                      item._id
                                                      }`}>
                                                   <ButtonBase className={classes.img}>
                                                      <img
                                                         src={
                                                            item.metadata
                                                               ? item.metadata.logo_1x1
                                                               : null
                                                         }
                                                         className='hotelLogo'
                                                         style={{ width: 170 }}
                                                      />
                                                   </ButtonBase>
                                                </Link>
                                             </Grid>
                                          </Hidden>
                                          <Grid container spacing={3}>
                                             <Grid item xs={6} sm={4} md={3}>
                                                <Typography
                                                   variant='caption'
                                                   display='block'
                                                   gutterBottom>
                                                   Hotel Name
                                                </Typography>
                                                <Typography
                                                   className={classes.detailsFont}
                                                   gutterBottom>
                                                   <Link
                                                      to={`/hotelDetails?${(item.metadata
                                                         ? item.metadata.firstName +
                                                         item.metadata.lastName
                                                         : null) +
                                                         '-' +
                                                         item._id
                                                         }`}>
                                                      {item.metadata
                                                         ? item.metadata.firstName +
                                                         ' ' +
                                                         item.metadata.lastName
                                                         : '-'}
                                                   </Link>
                                                </Typography>
                                             </Grid>
                                             <Hidden only={['sm', 'md', 'lg', 'xl']}>
                                                <Grid item xs={6}>
                                                   <Link
                                                      to={`/hotelDetails?${(item.metadata
                                                         ? item.metadata.hotel_name
                                                         : null) +
                                                         '-' +
                                                         item._id
                                                         }`}>
                                                      <ButtonBase className={classes.img}>
                                                         <img
                                                            src={
                                                               'https://pbs.twimg.com/profile_images/1131049280800608256/6Jt_hBrx_400x400.png'
                                                            }
                                                            className='hotelLogo'
                                                         />
                                                      </ButtonBase>
                                                   </Link>
                                                </Grid>
                                             </Hidden>
   
                                             <Grid item xs={6} sm={4} md={3}>
                                                <Typography variant='caption' gutterBottom>
                                                   BRN Number
                                                </Typography>
                                                <Typography
                                                   className={classes.detailsFont}
                                                   gutterBottom>
                                                   {item.metadata ? item.metadata.BRN_Number : '-'}
                                                </Typography>
                                             </Grid>
   
                                             <Grid item xs={6} sm={4} md={3}>
                                                <Typography variant='caption' gutterBottom>
                                                   Hotel Contact Number
                                                </Typography>
                                                <Typography
                                                   className={classes.detailsFont}
                                                   gutterBottom>
                                                   {item.metadata
                                                      ? item.metadata.hotelContactNumber
                                                      : '-'}
                                                </Typography>
                                             </Grid>
                                             <Grid item xs={6} sm={4} md={3}>
                                                <Typography variant='caption' gutterBottom>
                                                   Technical Contact Number
                                                </Typography>
                                                <Typography
                                                   className={classes.detailsFont}
                                                   gutterBottom>
                                                   {item.metadata
                                                      ? item.metadata.technicalContactNumber
                                                      : '-'}
                                                </Typography>
                                             </Grid>
                                             <Grid item xs={6} sm={4} md={3}>
                                                <Typography variant='caption' gutterBottom>
                                                   Selected Theme
                                                </Typography>
                                                <Typography
                                                   className={classes.detailsFont}
                                                   gutterBottom>
                                                   {item.theme
                                                      ? item.theme.type == 'vertical'
                                                         ? 'Vertical'
                                                         : 'Horizontal'
                                                      : '-'}
                                                </Typography>
                                             </Grid>
                                             <Grid item xs={6} sm={4} md={3}>
                                                <Typography variant='caption' gutterBottom>
                                                   Color Scheme
                                                </Typography>
                                                <Typography
                                                   className={classes.detailsFont}
                                                   gutterBottom>
                                                   {item.metadata
                                                      ? item.metadata.selected_color_scheme
                                                      : '-'}
                                                </Typography>
                                             </Grid>
   
                                             {/* <Grid item xs={6} sm={4}>
                                                <Typography variant='caption' gutterBottom>
                                                   Devices in Use
                                                </Typography>
                                                <Typography className={classes.detailsFont} gutterBottom>
                                                   {_.values(item.devices).length >= 1
                                                      ? countDev(item.devices)
                                                      : '-'}
                                                </Typography>
                                             </Grid> */}
                                             {/* <Grid item xs={6} sm={4} md={3}>
                                                <Typography variant='caption' gutterBottom>
                                                   Devices in Faulty
                                                </Typography>
                                                <Typography className={classes.detailsFont} gutterBottom>
                                                   {item.faultyDevices ? '-' : '-'}
                                                </Typography>
                                             </Grid> */}
                                             <Grid item xs={6} sm={4} md={3}>
                                                <Typography variant='caption' gutterBottom>
                                                   Total Num of Connections
                                                </Typography>
                                                <Typography
                                                   className={classes.detailsFont}
                                                   gutterBottom>
                                                   {item.metadata
                                                      ? item.metadata.totalNumOfConnections
                                                      : '-'}
                                                </Typography>
                                             </Grid>
                                             <Grid item xs={6} sm={4} md={3}>
                                                <Typography variant='caption' gutterBottom>
                                                   Occupancy Connections
                                                </Typography>
                                                <Typography
                                                   className={classes.detailsFont}
                                                   gutterBottom>
                                                   {item.metadata
                                                      ? item.metadata.totalNumOfOccupancyConnections
                                                      : '-'}
                                                </Typography>
                                             </Grid>
                                             <Grid item xs={6} sm={4} md={3}>
                                                <Typography variant='caption' gutterBottom>
                                                   Private Connections
                                                </Typography>
                                                <Typography
                                                   className={classes.detailsFont}
                                                   gutterBottom>
                                                   {item.metadata
                                                      ? item.metadata.totalNumOfPrivateConnections
                                                      : '-'}
                                                </Typography>
                                             </Grid>
                                             <Grid item xs={6} sm={4} md={3}>
                                                <Typography variant='caption' gutterBottom>
                                                   Public Connections
                                                </Typography>
                                                <Typography
                                                   className={classes.detailsFont}
                                                   gutterBottom>
                                                   {item.metadata
                                                      ? item.metadata.totalNumOfPublicConnections
                                                      : '-'}
                                                </Typography>
                                             </Grid>
                                             <Grid item xs={6} sm={4} md={3}>
                                                <Typography variant='caption' gutterBottom>
                                                   Buffer Connections
                                                </Typography>
                                                <Typography
                                                   className={classes.detailsFont}
                                                   gutterBottom>
                                                   {item.metadata
                                                      ? item.metadata.totalNumOfBufferConnections
                                                      : '-'}
                                                </Typography>
                                             </Grid>
                                             <Grid item xs={6} sm={4} md={3}>
   
                                                <Typography variant='caption' gutterBottom>
                                                   Master Serial Number
                                                </Typography>
                                                <Typography
                                                   className={classes.detailsFont}
                                                   gutterBottom>
                                                   {item.metadata ? item.metadata.serial_number : '-'}
                                                </Typography>
                                             </Grid>
                                             <Grid item xs={6} sm={4} md={3}>
   
                                                <Typography variant='caption' gutterBottom>
                                                  DHS Reference Number
                                                </Typography>
                                                <Typography
                                                   className={classes.detailsFont}
                                                   gutterBottom>
                                                   {item.metadata ? item.metadata.dHSCustRef : '-'}
                                                </Typography>
                                             </Grid>
                                             {/* <Hidden only={["xs", "sm"]}>
                                                   <Grid
                                                      item
                                                      xs={3}
                                                      sm={6}
                                                      zeroMinWidth>
                                                      <Typography
                                                         variant='caption'
                                                         gutterBottom>
                                                         Selected Language
                                                      </Typography>
                                                      <Typography
                                                         className={classes.detailsFont}
                                                         gutterBottom>
                                                         {item.metadata
                                                            ? _.values(
                                                                 item.metadata
                                                                    .selected_language
                                                              ).join(", ")
                                                            : "-"}
                                                      </Typography>
                                                   </Grid>
                                                </Hidden> */}
                                          </Grid>
                                       </Grid>
                                       <br></br>
                                    </Paper>
                                    <Paper>
                                       <Button
                                          id='button'
                                          value={item._id}
                                          className={classes.buttonFont}
                                          color='secondary'
                                          onClick={() => {
                                             this.setState({
                                                warning: true,
                                                hotelId: item._id,
                                             });
                                          }}
                                       >
                                          <DeleteOutlineOutlinedIcon /> Delete
                                                </Button>
                                    </Paper>
                                 </div>
                              </Grid>
                           ))
                        )
                     }
                  </div>
               )}
               {this.props.hotelsList.error && this.state.error ? (
                  <Alert
                     isOpen={this.props.hotelsList.error}
                     onClose={this._handleClose}
                     hasTwoButtons={false}
                     handleSubmit={this.onClick}
                     status={this.props.hotelsList.status}
                     title='Hotels'
                     text={this.props.hotelsList.errorMessage}
                     submitButtonText='OK'
                  />
               ) : null}
               {this.state.warning ? (
                  <AlertDialog
                     title='Delete'
                     open={this.state.warning}
                     onClose={this.handleDialogClose}
                     onOK={this.handleDelete}
                     message={'Are you sure about deleting this Hotel?'}
                  />
               ) : null}
               {this.props.hotelsList.error && this.state.error ? (
                  <Alert
                     isOpen={this.props.hotelsList.error}
                     hasTwoButtons={false}
                     status={this.props.hotelsList.status}
                     handleSubmit={onClick}
                     title='Hotels'
                     text={this.props.hotelsList.errorMessage}
                     submitButtonText='OK'
                  />
               ) : null}

            </div>
         </MuiThemeProvider>
      );
   }
}

HotelList.propTypes = {
   classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
   return {
      hotelsList: state.hotels,
      useDetails: state.login,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getHotels: (jwt_token) => dispatch(getHotels(jwt_token)),
      deleteHotels: (hotel) => dispatch(deleteHotels(hotel)),
      updateHotel: (hotel) => dispatch(updateHotel(hotel)),
      deleteHotel: (hotel) => dispatch(deleteHotel(hotel)),
      getHotelWithDeviceSerialNOApi:(hotal)=>{dispatch(getHotelWithDeviceSerialNO(hotal))}
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(HotelList));
