import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
// import { makeStyles, useTheme } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '@material-ui/core/Icon';
import GTranslateIcon from '@material-ui/icons/GTranslate';

import DashboardIcon from '@material-ui/icons/Dashboard';
import Divider from '@material-ui/core/Divider';

// import DashboardIcon from "../assets/ico_Dashboard.png";
// import DeviceIcon from "../assets/ico_Device.png";

const list = [
   {
      primaryText: 'Dashboard',
      icon: 'dashboard',
      link: '/home',
   },
   {
      primaryText: 'Hotel Management',
      icon: 'apartment',
      link: '/hotelList',
   },
   {
      primaryText: 'Third Party Services',
      icon: 'people',
      link: '/thirdParty',
   },
   {
      primaryText: 'User Management',
      icon: 'person',
      link: '/userManagement',
   },
];

const styles = (theme) => ({
   LinkColor: {
      color: '#FFFFFF',
      textDecoration: 'none',
      '&:focus': {
         textDecoration: 'none',
         color: '#FFFFFF',
         backgroundColor: '#215383',
      },
      '&:hover': {
         textDecoration: 'none',
         color: '#FFFFFF',
         backgroundColor: '#386896',
      },
      '&:visited': { textDecoration: 'none', color: '#FFFFFF' },
      '&:link': { textDecoration: 'none', color: '#FFFFFF' },
      '&:active': { textDecoration: 'none', color: '#FFFFFF' },
   },
});

function SideBar({ classes, screen }) {
   var selIndex = parseInt(sessionStorage.getItem('selectedIndexAdmin'));
   const [selectedIndex, setSelectedIndex] = React.useState(selIndex ? selIndex : 0);
   React.useEffect(() => {
      setSelectedIndex(selIndex ? selIndex : 0);
   }, []);
   const handleMenuItemClick = (event, index) => {
      sessionStorage.setItem('selectedIndexAdmin', index);
      setSelectedIndex(index);
   };

   return (
      <List>
         {list.map(({ primaryText, icon, link }, index) => (
            <ListItem
               component={Link}
               key={primaryText}
               to={link}
               selected={index === selectedIndex}
               className={classes.LinkColor}
               onClick={(event) => handleMenuItemClick(event, index)}>
               <ListItemIcon>
                  <Icon>{icon}</Icon>
               </ListItemIcon>
               <ListItemText primary={primaryText} primaryTypographyProps={{ noWrap: true }} />
            </ListItem>
         ))}
      </List>
   );
}

SideBar.propTypes = {};
SideBar.defaultProps = {};

export default withStyles(styles)(SideBar);
