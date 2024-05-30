/* eslint-disable */
import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LinearIndeterminate from '../utils/linearProgress';
import ErrorBoundary from '../utils/ErrorBoundary';

const Login = lazy(() => import('../components/UserManagement/views/login'));
const HotelList = lazy(() => import('../components/Hotel/views/hotelCardList'));
const AddHotel = lazy(() => import('../components/Hotel/views/AddHotel'));
const Home = lazy(() => import('../components/Home/Home'));
const ThirdParty = lazy(() => import('../components/ThirdPartyServices/views/ThirdPartyServices'));
const AddThirdParty = lazy(() => import('../components/ThirdPartyServices/views/AddThirdParty'));
const HotelDetails = lazy(() => import('../components/Hotel/views/hotelDetails'));
const UserManagement = lazy(() => import('../components/UserManagement/views/userManagement'));
const AddUser = lazy(() => import('../components/UserManagement/views/addUser'));
const EditProfileInfo = lazy(() => import('../components/UserManagement/views/editProfileInfo'));
const ChangePassword = lazy(() => import('../components/UserManagement/views/changePassword'));
const NotFoundPage = lazy(() => import('../components/Error/error'));

const Routing = () => (
   <div>
      <Suspense
         fallback={
            <div>
               <LinearIndeterminate />
            </div>
         }>
         <ErrorBoundary>
            <Switch>
               <Route exact path='/' render={() => <Redirect to='/login' />} />
               <Route path='/login' component={Login} />
               <Route path='/home' component={Home} />
               <Route exact path='/hotelList' component={HotelList} />
               <Route path='/addHotel' component={AddHotel} />
               <Route path='/hotelDetails' component={HotelDetails} />
               {/* <Route path='/selectTheme' component={SelectTheme} /> */}
               <Route exact path='/thirdParty' component={ThirdParty} />
               <Route path='/addThirdParty' component={AddThirdParty} />
               {/* <Route exact path='/language' component={Language} /> */}
               {/* <Route path='/language/addHotelLang/:id' component={AddHotelLang} /> */}
               {/* <Route exact path='/themeList' component={ThemeList} /> */}
               {/* <Route path='/themeList/addTheme/:id' component={AddTheme} /> */}
               <Route path='/userManagement' component={UserManagement} />
               <Route path='/addUser' component={AddUser} />
               <Route path='/editProfileInfo' component={EditProfileInfo} />
               <Route path='/changePassword' component={ChangePassword} />

               <Route path='/not-found' component={NotFoundPage} />
               <Route render={() => <Redirect to='/not-found' />} />
            </Switch>
         </ErrorBoundary>
      </Suspense>
   </div>
);

export default Routing;
