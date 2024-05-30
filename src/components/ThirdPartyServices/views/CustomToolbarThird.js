/**Toolbar for the Datatable is handled in this file
 * Customization: Add Button
 * Add button redirects/links to the edit page without any default values
 */

import React, { Component } from 'react';

//Linking to another page
import { Link } from 'react-router-dom';

//Imports of all the required classes and functions from Material UI
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { CustomToolbarStyle } from '../../CustomToolbarStyle';

//Rendering Custom Toolbar for third party services
function CustomToolbarThird(props) {
   const history = useHistory();
   const handleClick = () => {
      history.push('/addThirdParty');
   };

   const { classes } = props;

   return (
      <React.Fragment>
         <Tooltip title={'Add Third party services'}>
            <Button className={classes.iconButton} onClick={handleClick}>
               <AddIcon /> Add Service
            </Button>
         </Tooltip>
      </React.Fragment>
   );
}

export default withStyles(CustomToolbarStyle, { name: 'CustomToolbarThird' })(CustomToolbarThird);
