import { combineReducers } from 'redux';
import userReducer from '../components/UserManagement/reducers';
import { hotelReducer, themesReducer, postCodesReducer } from '../components/Hotel/reducers';
import thirdPartyServiceReducer from '../components/ThirdPartyServices/reducers';

const rootReducer = combineReducers({
   users: userReducer,
   hotels: hotelReducer,
   thirdPartyServices: thirdPartyServiceReducer,
   themes: themesReducer,
   postCodes: postCodesReducer,
});

export default rootReducer;
