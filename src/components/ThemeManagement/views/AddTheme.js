/**Rendering of AddHotel component
 * Tabs of Material Ui used
 * Select and text Fields or boxes of reactstrap is used
*/

//import basic react, router required files 
import React, { Component, useState } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { setThemes } from '../actions'
//Importing Material UI files as per need
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { green, purple } from '@material-ui/core/colors';
import ListDailog from './hotelList'
//Importing reactstrap functions required
import { Row, Form, FormGroup, Label, Input, Col, FormText } from 'reactstrap';

//Handling function for the Material UI Tabs
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >

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
const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: "#FFFFFF", color: "#000000",
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

//Default Edit is a function as Material UI does not support Class and returns error
function AddTheme(props) {

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  const handleSubmit = () => {
    // console.log(props.themes);

    const themes =
      { logo: "", hotelName: "Kingsbury", themeName: Math.floor(Math.random() * 100) + 1 }

    props.setThemes(themes)
  }
  return (
    <div>

      <Link to={`/themeList`}><ArrowBackIcon></ArrowBackIcon>Back</Link>
      <h5>Add Theme for hotel</h5>

      {/* ------------------------------Tab desinging in Material UI------------------------------ */}
      <div className={classes.root}>
        <AppBar position="static" color="default">
        </AppBar>
        {/* ------------------------------Tabs contents in reactstrap------------------------------ */}

        <TabPanel value={value} index={0} dir={theme.direction}>
          <Form>
            <Row form>
              <Col md={3}>
                <FormGroup>
                  <Label for="hotelNm">Hotel Name</Label>
                  <ListDailog />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="ThemeNm">Theme List</Label>
                  <ListDailog />
                  {/* <Input type="select" name="select" id="ThemeNm" defaultValue="Select" >
                    <option>Dark</option>
                    <option>Light</option>
                    <option>Monochrome</option>
                    <option>Pleasant</option>
                    <option>Sunshine</option>
                  </Input> */}
                </FormGroup>
              </Col>
            </Row>
            <Row >
              <Col md={8}>
                <FormGroup>
                  <Button variant="contained" color="primary" className={classes.button} onClick={handleClickOpen}>
                    Save
                   </Button>

                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description" color="textPrimary">
                        Assigning theme to hotel
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Link to={`/themeList`}>
                        <Button onClick={handleSubmit} variant="contained" color="primary">
                          OK
                          </Button>
                      </Link>
                      <Button onClick={handleClose} variant="contained" color="primary" autoFocus>
                        Cancel
                        </Button>
                    </DialogActions>
                  </Dialog>

                  <Link to={`/themeList`}>
                    <Button variant="contained" color="default" className={classes.button}>
                      Cancel
                   </Button>
                  </Link>
                </FormGroup>
              </Col>
            </Row>
          </Form>
          {/* ------------------------------Tabs contents in reactstrap ends------------------------------ */}
        </TabPanel>

      </div>

    </div>
  )

}
const mapDispatchToProps = dispatch => {
  return {
    setThemes: (themes) => dispatch(setThemes(themes))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AddTheme)