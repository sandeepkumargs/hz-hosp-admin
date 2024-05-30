import {
   GET_THIRD_PARTY_SERVICES,
   ADD_THIRD_PARTY_SERVICES,
   THIRD_PARTY_SERVICES_RECEIVED,
   UPDATE_THIRD_PARTY_SERVICES,
   DELETE_THIRD_PARTY_SERVICES,
   TPSERROR,
} from '../actionTypes';
import { thirdPartyServicesInitialState } from '../initialState';

const thirdPartyServiceReducer = (state = thirdPartyServicesInitialState, action) => {
   switch (action.type) {
      case GET_THIRD_PARTY_SERVICES || ADD_THIRD_PARTY_SERVICES || UPDATE_THIRD_PARTY_SERVICES:
         return {
            ...state,
            loading: true,
            error: false,
            message: null,
         };

      case THIRD_PARTY_SERVICES_RECEIVED:
         return {
            ...state,
            thirdPartyServices: action.thirdPartyServices.data,
            loading: false,
            error: false,
         };

      case TPSERROR:
         return {
            ...state,
            error: true,
            loading: false,
            message: action.data.message,
            status: action.data.status,
         };

      default:
         return state;
   }
};

export default thirdPartyServiceReducer;
