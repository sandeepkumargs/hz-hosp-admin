/**Rendering of ThemeManagement component
 * Handling the mui datatable and data
 * Redux and saga implementation needs to be done. (Commented as of now)
 */

//import basic react, router required files
import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getThemes } from '../actions';
//Importing Material UI files as per need
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
   AppBar,
   Tabs,
   Tab,
   Typography,
   Box,
   Button,
   Card,
   CardActionArea,
   CardActions,
   CardContent,
   Grid,
   Dialog,
   DialogTitle,
   Slide,
   Carousel,
   IconButton,
   CardMedia,
} from '@material-ui/core';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import dashImg from '../../../assets/ico_Dashboard.png';
import setImg from '../../../assets/ico_Settings.png';
import CustomToolbar from './CustomToolbarTheme';

//Custom files imported
import MUIDataTable from 'mui-datatables';

//Importing reactstrap functions required
import { Row, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Carousal from './AutoRotatingCarousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import CarouselPage from '../../Carousel'
import '../../custom.scss';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import AssignTheme from './assignTheme';
const AutoplaySlider = withAutoplay(AwesomeSlider);
import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';

const slider = (
   <AutoplaySlider
      play={true}
      cancelOnInteraction={true} // should stop playing on user interaction
      interval={6}>
      <div data-src='https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg' />
      <div data-src='https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg' />
      <div data-src='https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg' />
      <div data-src='https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg' />
      <div data-src='https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg' />
      <div data-src='https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg' />
      <div data-src='https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg' />
      <div data-src='https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg' />
      <div data-src='https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg' />
      <div data-src='https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg' />
      <div data-src='https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg' />
      <div data-src='https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg' />
   </AutoplaySlider>
);
const contentBox = {
   flex: 0,
};

const deleteHandler = () => {
   // window.alert(data[1].services + ' deleted');
};

//Static data supplied
let data = [
   { logo: 'https://www.w3schools.com/css/img_5terre.jpg', hotelName: 'Kingsbury', themeName: '1' },
   //   { logo: "", hotelName: "Kingsbury", themeName: "1" },
   //   { logo: "", hotelName: "Blah", themeName: "2" },
];

//Properties of each column
const columns = [
   {
      name: 'logo',
      label: 'Hotel Logo',
      options: {
         filter: false,
         sort: true,
         print: false,
         customBodyRender: () => {
            return <img src={data[0].logo} className='imgStyle' />;
         },
      },
   },
   {
      name: 'hotelName',
      label: 'Hotel Name',
      options: {
         filter: true,
         sort: true,
         print: false,
         download: true,
      },
   },
   {
      name: 'themeName',
      label: 'Theme Name',
      options: {
         filter: true,
         sort: true,
         print: false,
         download: true,
      },
   },
   // {
   //   name: '',
   //   label: 'Theme Name',
   //   options: {
   //     filter: true,
   //     sort: true,
   //     print: false,
   //     download: true,
   //   },
   // },
];

const getMuiTheme = () =>
   createMuiTheme({
      typography: {
         useNextVariants: true,
         suppressDeprecationWarnings: true,
      },
      overrides: {
         MUIDataTableHeadCell: {
            // fixedHeader: {
            //   backgroundColor: "#D0D5DC",
            //   zIndex:"0"
            // },
         },
         MUIDataTableBodyCell: {
            root: {
               backgroundColor: '#F9FAFC',
            },
         },
         MuiCardContent: {
            root: {
               backgroundColor: '#FFFFFF',
            },
         },
      },
   });

const options = {
   selectableRows: 'none',
   filterType: 'checkbox',
   print: false,
   download: false,
   viewColumns: false,
   fixedHeaderOptions: {
      xAxis: false,
      yAxis: false,
   },
   textLabels: {
      pagination: {
         rowsPerPage: 'Items per Page:',
      },
   },
   //Using Custom toolbar designed in CustomToolbarTheme.js
   // customToolbar: () => {
   //   return (
   //     <CustomToolbar />

   //   );
   // }
};
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

//  Handles contents in the Tab div
function a11yProps(index) {
   return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
   };
}

//Customised styling is implemented
const useStyles = makeStyles((theme) => ({
   root: {
      // backgroundColor: ,
      width: '100%',

      // display: 'flex',
      // flexWrap: 'wrap',
   },
   button: {
      margin: theme.spacing(1),
   },

   media: {
      height: 100,
   },
   card: {
      display: 'flex',
      align: 'flex-end',
      margin: 30,
      backgroundColor: '#FFFFFF',
      color: '#000000',
      // display: 'flex',
      // alignItems: 'center',
      // padding: theme.spacing(1),

      // justifycontent: "space-between"
   },
   details: {
      display: 'flex',
      alignItems: 'center',
   },
   content: {
      // backgroundColor: "#FFFFFF", color: "#000000",
      // margin: 20,
      padding: theme.spacing(2),
   },
   cover: {
      display: 'flex',
      width: 890,
      height: 350,
      margin: 20,
      objectFit: 'scale-down',
      // padding: theme.spacing(1),
   },
   controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
   },
}));

//Render class of ThemeManagement Component

function ThemeManagement(props) {
   //Customise mui datatable with options
   // Refer to https://github.com/gregnb/mui-datatables for the entire list
   const classes = useStyles();
   const theme = useTheme();
   const [value, setValue] = React.useState(0);
   const [open, setOpen] = React.useState(false);
   const [success, setSuccess] = React.useState(false);
   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
      setSuccess(true);
   };

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };
   const handleChangeIndex = (index) => {
      setValue(index);
   };
   useEffect(() => {
      if (props.themesList.size == 1) {
         props.getThemes();
      }
   }, []);

   //MUIDataTable rendering
   return (
      <div>
         <div className={classes.root}>
            <AppBar position='static' color='default'>
               <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor='primary'
                  textColor='primary'
                  variant='fullWidth'
                  aria-label='full width tabs example'>
                  <Tab label='Themes' className='tabStyle' {...a11yProps(0)} />
                  <Tab label='Hotels' className='tabStyle' {...a11yProps(1)} />
               </Tabs>
            </AppBar>
            <SwipeableViews
               axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
               index={value}
               onChangeIndex={handleChangeIndex}>
               {/* ------------------------------Tabs contents in reactstrap------------------------------ */}

               <TabPanel value={value} index={0} dir={theme.direction}>
                  <Grid container spacing={3}>
                     <Grid item xs={12}>
                        <Card className={classes.card}>
                           <CardMedia
                              className={classes.cover}
                              image={require('../../../assets/darker.png')}
                              title='Live from space album cover'
                           />
                           <div style={{ margin: 20 }}>
                              <CardContent className={classes.content}>
                                 <Typography gutterBottom variant='h5' component='h2'>
                                    Theme 1
                                 </Typography>
                                 <Typography variant='body2' color='textSecondary' component='p'>
                                    Lizards are a widespread group of squamate reptiles, with over
                                    6,000 species, ranging across all continents except Antarctica
                                 </Typography>
                              </CardContent>
                              <CardActions>
                                 {/* <Link to={`/themeList/addTheme/1`}>
                        <Button size="small" color="primary">
                          Assign to Hotel
                        </Button>
                      </Link> */}
                                 <Carousal />
                              </CardActions>

                              <CardActions>
                                 <AssignTheme theme='theme1' />
                              </CardActions>
                           </div>
                        </Card>
                     </Grid>

                     <Grid item xs={12}>
                        <Card className={classes.card}>
                           <CardMedia
                              className={classes.cover}
                              image={require('../../../assets/blue_bobber.png')}
                              title='Live from space album cover'
                           />
                           <div style={{ margin: 20 }}>
                              <CardContent className={classes.content}>
                                 <Typography gutterBottom variant='h5' component='h2'>
                                    Theme 2
                                 </Typography>
                                 <Typography variant='body2' color='textSecondary' component='p'>
                                    Lizards are a widespread group of squamate reptiles, with over
                                    6,000 species, ranging across all continents except Antarctica
                                 </Typography>
                              </CardContent>
                              <CardActions>
                                 {/* <Link to={`/themeList/addTheme/1`}>
        <Button size="small" color="primary">
          Assign to Hotel
        </Button>
      </Link> */}
                                 <Carousal />
                              </CardActions>

                              <CardActions>
                                 <AssignTheme theme='theme2' />
                              </CardActions>
                           </div>
                        </Card>
                     </Grid>

                     <Grid item xs={12}>
                        <Card className={classes.card}>
                           <CardMedia
                              className={classes.cover}
                              image={require('../../../assets/red_tape.png')}
                              title='Live from space album cover'
                           />
                           <div style={{ margin: 20 }}>
                              <CardContent className={classes.content}>
                                 <Typography gutterBottom variant='h5' component='h2'>
                                    Theme 3
                                 </Typography>
                                 <Typography variant='body2' color='textSecondary' component='p'>
                                    Lizards are a widespread group of squamate reptiles, with over
                                    6,000 species, ranging across all continents except Antarctica
                                 </Typography>
                              </CardContent>
                              <CardActions>
                                 {/* <Link to={`/themeList/addTheme/1`}>
                              <Button size="small" color="primary">
                              Assign to Hotel
                            </Button>
                          </Link> */}
                                 <Carousal />
                              </CardActions>

                              <CardActions>
                                 <AssignTheme theme='theme3' />
                              </CardActions>
                           </div>
                        </Card>
                     </Grid>
                     <Grid item xs={12}>
                        <Card className={classes.card}>
                           <CardMedia
                              className={classes.cover}
                              image={require('../../../assets/yellow_corn.png')}
                              title='Live from space album cover'
                           />
                           <div style={{ margin: 20 }}>
                              <CardContent className={classes.content}>
                                 <Typography gutterBottom variant='h5' component='h2'>
                                    Theme 4
                                 </Typography>
                                 <Typography variant='body2' color='textSecondary' component='p'>
                                    Lizards are a widespread group of squamate reptiles, with over
                                    6,000 species, ranging across all continents except Antarctica
                                 </Typography>
                              </CardContent>
                              <CardActions>
                                 {/* <Link to={`/themeList/addTheme/1`}>
              <Button size="small" color="primary">
              Assign to Hotel
            </Button>
          </Link> */}
                                 <Carousal />
                              </CardActions>

                              <CardActions>
                                 <AssignTheme theme='theme4' />
                              </CardActions>
                           </div>
                        </Card>
                     </Grid>
                     <Grid item xs={12}>
                        <Card className={classes.card}>
                           <CardMedia
                              className={classes.cover}
                              image={require('../../../assets/orange_candy.png')}
                              title='Live from space album cover'
                           />
                           <div style={{ margin: 20 }}>
                              <CardContent className={classes.content}>
                                 <Typography gutterBottom variant='h5' component='h2'>
                                    Theme 5
                                 </Typography>
                                 <Typography variant='body2' color='textSecondary' component='p'>
                                    Lizards are a widespread group of squamate reptiles, with over
                                    6,000 species, ranging across all continents except Antarctica
                                 </Typography>
                              </CardContent>
                              <CardActions>
                                 {/* <Link to={`/themeList/addTheme/1`}>
              <Button size="small" color="primary">
              Assign to Hotel
            </Button>
          </Link> */}
                                 <Carousal />
                              </CardActions>

                              <CardActions>
                                 <AssignTheme theme='theme5' />
                              </CardActions>
                           </div>
                        </Card>
                     </Grid>
                  </Grid>
               </TabPanel>
               <TabPanel value={value} index={1} dir={theme.direction}>
                  <MuiThemeProvider theme={getMuiTheme()}>
                     <MUIDataTable
                        title={''}
                        data={props.themesList._tail.array}
                        columns={columns}
                        options={options}
                     />
                  </MuiThemeProvider>
               </TabPanel>
            </SwipeableViews>
         </div>
      </div>
   );
}
const mapStateToProps = (state) => {
   return {
      themesList: state.themes,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getThemes: () => dispatch(getThemes()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemeManagement);
