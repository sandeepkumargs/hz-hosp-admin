// import React from "react";
// import { makeStyles, useTheme } from "@material-ui/core/styles";
// import MobileStepper from "@material-ui/core/MobileStepper";
// import Paper from "@material-ui/core/Paper";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
// import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
// import SwipeableViews from "react-swipeable-views";
// import { autoPlay } from "react-swipeable-views-utils";

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// const tutorialSteps = [
//    {
//       label: "Standard",
//       imgPath: require("../assets/darker.png"),
//    },
//    {
//       label: "Bobber",
//       imgPath: require("../assets/blue_bobber.png"),
//    },
//    // {
//    //    label: 'Red',
//    //    imgPath: require('../assets/red_tape.png'),
//    // },
//    // {
//    //    label: 'Yellow',
//    //    imgPath: require('../assets/yellow_corn.png'),
//    // },
//    // {
//    //    label: 'Orange',
//    //    imgPath: require('../assets/orange_candy.png'),
//    // },
// ];

// const useStyles = makeStyles((theme) => ({
//    root: {
//       maxWidth: 800,
//       maxHeight: 400,
//       flexGrow: 1,
//    },
//    header: {
//       display: "flex",
//       alignItems: "center",
//       height: 50,
//       paddingLeft: theme.spacing(4),
//       backgroundColor: theme.palette.background.default,
//       color: "#000000",
//    },
//    img: {
//       height: 400,
//       display: "block",
//       maxWidth: 800,
//       overflow: "hidden",
//       width: "100%",
//    },
// }));
// const styles = makeStyles((theme) => ({
//    root: {
//       maxWidth: 400,
//       flexGrow: 1,
//    },
//    header: {
//       display: "flex",
//       alignItems: "center",
//       height: 50,
//       paddingLeft: theme.spacing(4),
//       backgroundColor: "#72cc72",
//       color: "#000000",
//    },
//    img: {
//       height: 255,
//       display: "block",
//       maxWidth: 800,
//       overflow: "hidden",
//       width: "100%",
//    },
// }));
// function SwipeableTextMobileStepper(props) {
//    const classes = useStyles();
//    const click = styles();
//    const theme = useTheme();
//    const [activeStep, setActiveStep] = React.useState(0);
//    const maxSteps = tutorialSteps.length;
//    const [select, SetSelect] = React.useState(false);
//    const handleNext = () => {
//       SetSelect(false);
//       setActiveStep((prevActiveStep) => prevActiveStep + 1);
//    };

//    const handleBack = () => {
//       SetSelect(false);
//       setActiveStep((prevActiveStep) => prevActiveStep - 1);
//    };

//    const handleStepChange = (step) => {
//       setActiveStep(step);
//    };

//    return (
//       <div className={classes.root}>
//          <Paper
//             square
//             elevation={0}
//             className={select ? click.header : classes.header}>
//             <Typography>{tutorialSteps[activeStep].label}</Typography>
//          </Paper>
//          <SwipeableViews
//             axis={theme.direction === "rtl" ? "x-reverse" : "x"}
//             index={activeStep}
//             onChangeIndex={handleStepChange}
//             enableMouseEvents>
//             {tutorialSteps.map((step, index) => (
//                <div key={step.label}>
//                   {Math.abs(activeStep - index) <= 2 ? (
//                      <Button
//                         onClick={() => {
//                            SetSelect(true);
//                         }}>
//                         <img
//                            className={classes.img}
//                            src={step.imgPath}
//                            alt={step.label}
//                            onClick={() => {
//                               props.parentCallback(step.label);
//                            }}
//                         />
//                      </Button>
//                   ) : null}
//                </div>
//             ))}
//          </SwipeableViews>
//          <MobileStepper
//             steps={maxSteps}
//             position='static'
//             variant='dots'
//             activeStep={activeStep}
//             position='static'
//             nextButton={
//                <Button
//                   size='small'
//                   onClick={handleNext}
//                   disabled={activeStep === maxSteps - 1}>
//                   Next
//                   {theme.direction === "rtl" ? (
//                      <KeyboardArrowLeft />
//                   ) : (
//                      <KeyboardArrowRight />
//                   )}
//                </Button>
//             }
//             backButton={
//                <Button
//                   size='small'
//                   onClick={handleBack}
//                   disabled={activeStep === 0}>
//                   {theme.direction === "rtl" ? (
//                      <KeyboardArrowRight />
//                   ) : (
//                      <KeyboardArrowLeft />
//                   )}
//                   Back
//                </Button>
//             }
//          />
//       </div>
//    );
// }

// export default SwipeableTextMobileStepper;
