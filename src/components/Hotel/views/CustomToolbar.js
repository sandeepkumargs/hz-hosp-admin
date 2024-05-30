import React, { Component } from 'react';

//Linking to another page
import { Link } from 'react-router-dom';

import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { CustomToolbarStyle } from '../../CustomToolbarStyle';
import { useHistory } from 'react-router-dom';

//Rendering Custom Toolbar
function CustomToolbar(props) {
   const { classes } = props;
   const history = useHistory();
   const handleClick = () => {
      console.log(props.handler);
      history.push('/addHotel');
   };
   return (
      <React.Fragment>
         <Tooltip title={'Add hotel'}>
            <Button
               className={classes.iconButton}
               onClick={(e) => {
                  handleClick();
               }}>
               <AddIcon /> Add Hotel
            </Button>
         </Tooltip>
      </React.Fragment>
   );
}

export default withStyles(CustomToolbarStyle, { name: 'CustomToolbar' })(CustomToolbar);
