import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Imports of all the required classes and functions from Material UI
import { IconButton, Tooltip, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import { CustomToolbarStyle } from '../../CustomToolbarStyle';
import { getJwtToken } from '../../../config';
import { useHistory } from 'react-router-dom';
//Rendering Custom Toolbar
function CustomToolbarUser(props) {
   const { classes } = props;
   const history = useHistory();
   const handleClick = () => {
      history.push('/addUser');
   };

   if (getJwtToken().isAdmin === 1) {
      return (
         <React.Fragment>
            {/* <Tooltip title={'Add User'}> */}
            <Button id='button' className={classes.iconButton} onClick={handleClick}>
               <AddIcon /> Add User
            </Button>{' '}
            {/* </Tooltip> */}
         </React.Fragment>
      );
   } else {
      return null;
   }
}

export default withStyles(CustomToolbarStyle, { name: 'CustomToolbarUser' })(CustomToolbarUser);
