import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setHotels, getThemes, getKalturaLiveChannels } from '../actions';
//Importing Material UI files as per need
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Box, Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Themes_LangList, HotelInfoForm, LogonBgImage, SelectChannels } from './stepperComponets';
import Alert from '../../../utils/Alert';
import Spinner from '../../../utils/Spinner';
import LinearIndeterminate from '../../../utils/linearProgress';

function getSteps() {
   return ['Fill Hotel Info', 'Select Theme and Langauge', 'Add Channels', 'Add Logo and Background Image'];
}

//Customised styling is implemented
const useStyles = makeStyles((theme) => ({
   root: {
      backgroundColor: '#FFFFFF',
      width: '100%',
      padding: '20px',
   },
   backButton: {
      margin: theme.spacing(1),
   },
   dailog: {
      backgroundColor: '#FFFFFF',
      color: '#000000',
   },
   instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      // marginLeft:theme.spacing(6)
   },

   button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(6),
   },
   actionsContainer: {
      marginBottom: theme.spacing(2),
   },
   resetContainer: {
      padding: theme.spacing(3),
   },
}));
function AddHotel(props) {
   const classes = useStyles();
   var userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
   const [activeStep, setActiveStep] = React.useState(0);
   const [skipped, setSkipped] = React.useState(new Set());
   const [finish, setFinish] = React.useState(false);
   const [lng, setLng] = React.useState(false);
   const [seltHotel, setSeltHotel] = React.useState(true);
   const [seltChannel, setSeltChannel] = React.useState(true);
   const [selTheme, setSelTheme] = React.useState(true);
   const [loading, setLoading] = React.useState(false);
   const [hotel, setHotel] = React.useState({
      hotelType: '7 star',
      lang: ['English'],
      sector: 'North',
      propType: 'Hotel',
   });
   const [themes, setThemes] = React.useState();
   const [channels, setChannels] = React.useState();
   const steps = getSteps();
   const [error, setError] = React.useState(true);
   const onClick = () => {
      setLoading(false);
      setError(false);
      if (props.hotelDetails.status == 200) {
         props.history.push('/hotelList');
      }
      if (props.hotelDetails.status == 422) {
         window.location = '/login';
      }
   };

   const isStepOptional = (step) => {
      if (step === 1) return true;
      if (step === 2) return false;
      if (step === 3) return false;
   };

   const isStepSkipped = (step) => {
      return skipped.has(step);
   };
   const isStepActive = (step) => {
      switch (step) {
         case 0:
            return seltHotel;
            break;
         case 1:
            return false;
            break;
         case 2:
            return seltChannel;
            break;
         case 3:
            return !finish;
            break;

         default:
            return false;
            break;
      }
   };
   const handleNext = () => {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
         newSkipped = new Set(newSkipped.values());
         newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
      if (activeStep === steps.length - 1) {
         const hotels = {
            ...hotel,
         };
         props.setHotels(hotels);
         setError(true);
         // props.history.push('/hotelList');
      }
   };

   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
   };

   const handleSkip = () => {
      if (!isStepOptional(activeStep)) {
         // You probably want to guard against something like this,
         // it should never occur unless someone's actively trying to break something.
         throw new Error("You can't skip a step that isn't optional.");
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped((prevSkipped) => {
         const newSkipped = new Set(prevSkipped.values());
         newSkipped.add(activeStep);
         return newSkipped;
      });
   };

   const handleReset = () => {
      setActiveStep(0);
   };

   const hotelInfoCallbackFun = (data) => {
      if (data.valid && data.state.postCode) {
         setSeltHotel(false);
      } else {
         setSeltHotel(true);
      }
      setHotel({
         ...hotel,
         ...data.state,
      });
   };

   React.useEffect(() => {
      props.getThemes(userDetails.jwt_token);
      props.getKalturaLiveChannels();
   }, []);
   React.useEffect(() => {
      setThemes(props.themes.themes);
   }, [props.themes]);
   const theme_langCallbackFun = (data) => {
      setLoading(true);
      setHotel({
         ...hotel,
         ...data,
      });
   };
   React.useEffect(() => {
      setChannels(props.hotelDetails.kalturaChannels);
   }, [props.hotelDetails]);
   const selectChannelsCallbackFun = (data) => {
      if (data.selected_channels.length > 0) {
         setSeltChannel(false);
      } else {
         setSeltChannel(true);
      }
      setHotel({
         ...hotel,
         ...data,
      })
   };
   const logo_BgImgCallbackFun = (data) => {
      if (data.logos.res1_1Logo && data.bgImg.res16_9BgImg) {
         setFinish(true);
      } else {
         setFinish(false);
      }
      setHotel({
         ...hotel,
         ...data,
      });
   };
   // React.useEffect(() => {
   //    console.log(hotel);
   // }, [hotel]);
   function getStepContent(step, classes) {
      switch (step) {
         case 0:
            return (
               <div>
                  {' '}
                  <HotelInfoForm
                     parentCallback={hotelInfoCallbackFun}
                     info={hotel}
                     postCodes={props.postCodes}
                  />
               </div>
            );

         case 1:
            return (
               <div>
                  <Themes_LangList parentCallback={theme_langCallbackFun} info={themes} />
               </div>
            );
         case 2:
            return (
               <div>
                  <SelectChannels parentCallback={selectChannelsCallbackFun} info={channels} />
               </div>
            );
         case 3:
            return (
               <div>
                  <LogonBgImage parentCallback={logo_BgImgCallbackFun} />
               </div>
            );

         default:
            return 'Unknown step';
      }
   }

   return (
      <div>
         {props.hotelDetails.loading ? (
            <Spinner />
         ) : (
            <div>
               <Link to={`/hotelList`}>
                  <ArrowBackIcon></ArrowBackIcon>
                  <Typography variant='button' gutterBottom>
                     Back
                  </Typography>
               </Link>
               <div style={{ margin: 15 }}>
                  <Typography variant='h5' gutterBottom>
                     Add Hotel
                  </Typography>

                  <div className={classes.root}>
                     <Stepper className={classes.root} activeStep={activeStep} alternativeLabel>
                        {steps.map((label, index) => {
                           const stepProps = {};
                           const labelProps = {};
                           if (isStepOptional(index)) {
                              labelProps.optional = (
                                 <Typography variant='caption'>Optional</Typography>
                              );
                           }
                           if (isStepSkipped(index)) {
                              stepProps.completed = false;
                           }
                           return (
                              <Step key={label} {...stepProps}>
                                 <StepLabel {...labelProps}>{label}</StepLabel>
                              </Step>
                           );
                        })}
                     </Stepper>
                     <div className={classes.button}>
                        {activeStep === steps.length ? (
                           <div>
                              <Typography className={classes.instructions}>
                                 All steps completed
                              </Typography>
                              <Button
                                 disabled={activeStep === 0}
                                 onClick={handleBack}
                                 className={classes.backButton}>
                                 Back
                              </Button>
                              <Button onClick={handleReset}>Reset</Button>
                           </div>
                        ) : (
                           <div>
                              <div className={classes.instructions}>
                                 {getStepContent(activeStep, classes)}
                              </div>
                              <div>
                                 <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.backButton}>
                                    Back
                                 </Button>

                                 {activeStep === steps.length - 1 ? (
                                    <Button
                                       variant='contained'
                                       color='primary'
                                       disabled={isStepActive(activeStep)}
                                       onClick={handleNext}
                                       autoFocus>
                                       Finish
                                    </Button>
                                 ) : (
                                    <Button
                                       variant='contained'
                                       color='primary'
                                       onClick={handleNext}
//                                       disabled={isStepActive(activeStep)}
                                       autoFocus>
                                       Next
                                    </Button>
                                 )}
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         )}
         <div>
            {props.hotelDetails.error && error ? (
               <Alert
                  isOpen={props.hotelDetails.error}
                  hasTwoButtons={false}
                  handleSubmit={onClick}
                  status={props.hotelDetails.status}
                  title='Warning'
                  text={props.hotelDetails.errorMessage}
                  submitButtonText='OK'
               />
            ) : null}
            {props.hotelDetails.success ? (
               <Alert
                  isOpen={props.hotelDetails.success}
                  hasTwoButtons={false}
                  handleSubmit={onClick}
                  status={props.hotelDetails.status}
                  title='Success'
                  text={props.hotelDetails.message}
                  submitButtonText='OK'
               />
            ) : null}
         </div>
      </div>
   );
}

const mapStateToProps = (state) => {
   return {
      themes: state.themes,
      postCodes: state.postCodes,
      hotelDetails: state.hotels,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      setHotels: (hotels) => dispatch(setHotels(hotels)),
      getThemes: (jwt_token) => dispatch(getThemes(jwt_token)),
      getKalturaLiveChannels: () => dispatch(getKalturaLiveChannels())
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddHotel);
