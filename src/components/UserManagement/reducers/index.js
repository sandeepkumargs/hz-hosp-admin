import {
   LOGIN,
   LOGIN_RES,
   LOG_ERROR,
   LOGOUT,
   GET_ALL_USERS,
   USERS_INFO_RECEIVED,
   ADD_USER,
   UPDATE_USER_INFO,
   DELETE_USER,
   CHANGE_PASSWORD,
   DELETE_USER_SUCCESS,
   UPDATE_ONE_USER_INFO,
   ONE_CHANGE_PASSWORD,
} from '../actionTypes';

import { userInitialState } from '../initialState';
import { Record, List } from 'immutable';

const userReducer = (state = userInitialState, action) => {
   switch (action.type) {
      case LOGIN:
         return {
            ...state,
            error: false,
            loading: true,
         };
      case LOGIN_RES:
         return {
            ...state,
            loading: false,
            ...action.res,
         };
      case LOGOUT:
         return {
            ...state,
            loading: false,
            jwt_token: null,
         };

      case USERS_INFO_RECEIVED:
         return {
            ...state,
            users: action.info.data,
            loading: false,
            error: false,
         };
      case GET_ALL_USERS ||
         ADD_USER ||
         CHANGE_PASSWORD ||
         ONE_CHANGE_PASSWORD ||
         UPDATE_ONE_USER_INFO ||
         DELETE_USER:
         return {
            ...state,
            loading: true,
            error: false,
            message: null,
         };

      case DELETE_USER_SUCCESS:
         function Remove(state, value) {
            return state.filter((item, index) => {
               if (item.id === value) {
                  return false;
               }
               return true;
            });
         }

         return {
            ...state,
            users: Remove(state.users, action.user),
            loading: false,
         };

      case LOG_ERROR:
         return {
            ...state,
            loading: false,
            error: true,
            message: action.data.message,
            status: action.data.status,
         };
      default:
         return state;
   }
};

export default userReducer;
