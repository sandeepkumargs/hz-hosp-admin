import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CardMedia from '@material-ui/core/CardMedia';
import {
   Root,
   Header,
   Sidebar,
   Content,
   CollapseBtn,
   CollapseIcon,
   SidebarTrigger,
   SidebarTriggerIcon,
} from '@mui-treasury/layout';
import { standardLayoutPreset } from '@mui-treasury/layout/presets';

import SideBar from '../../containers/SideBar/SideBar';
import HeaderNav from '../../containers/HeaderNav/HeaderNav';
import Routing from '../../containers/Routing';
import AppIcon from '../../assets/DialogLogo.png';
import { useLocation } from 'react-router-dom';
import './AppLayout.scss';
import { styled } from '@material-ui/styles';

const presets = {
   createStandardLayout: standardLayoutPreset,
};

const MyVisibility = styled(CollapseIcon)({
   color: 'white',
});
const getMuiTheme = () =>
   createMuiTheme({
      typography: {
         h5: {
            fontWeight: 'bold',
         },
         button: {
            fontWeight: 'bold',
            // outline: 20,
            // outlineColor: '#FFFFFF',
         },
      },
      overrides: {
         MuiPaper: {
            root: {
               backgroundColor: '#266199',
               color: '#FFFFFF',
               fontFamily: 'Roboto',
            },
         },
         MuiListItemIcon: {
            root: {
               color: '#FFFFFF',
            },
         },
      },
   });

function AppLayout() {
   const [loading, setLoading] = useState(false);
   const [preset, setPreset] = useState('createStandardLayout');
   const [data, setData] = useState({
      header: true,
      nav: true,
      content: true,
      footer: false,
   });
   var str = useLocation().pathname;
   return str === '/login' || str === '/not-found' ? (
      <Root style={{ fontFamily: 'Walsheim' }}>
         <Routing />
      </Root>
   ) : (
      <Root
         config={presets[preset]}
         theme={getMuiTheme()}
         style={{ fontFamily: 'Walsheim', overflow: 'hidden' }}>
         {({ headerStyles, sidebarStyles }) => (
            <>
               <CssBaseline />
               <Header>
                  <Toolbar>
                     {/* <CollapseBtn component={IconButton} className={headerStyles.leftTrigger}> */}
                     {/* <CardMedia
                           component='img'
                           alt='A'
                           height='60px'
                           src={AppIcon}
                        /> */}
                     <Link to={`/home`}>
                        <img src={AppIcon} style={{ width: '70px' }} />
                     </Link>
                     {/* <CollapseIcon /> */}
                     {/* </CollapseBtn> */}
                     <SidebarTrigger className={headerStyles.leftTrigger}>
                        <SidebarTriggerIcon />
                     </SidebarTrigger>
                     {data.header && <HeaderNav />}
                  </Toolbar>
               </Header>
               <Content style={{ padding: '20px' }}>{data.content && <Routing />}</Content>
               <Sidebar>
                  {({ collapsed }) => (
                     <>
                        <CollapseBtn>
                           <MyVisibility style={{ marginTop: 0 }} />
                        </CollapseBtn>
                        <div className={sidebarStyles.container}>{data.nav && <SideBar />}</div>
                     </>
                  )}
               </Sidebar>
            </>
         )}
      </Root>
   );
}

export default AppLayout;
