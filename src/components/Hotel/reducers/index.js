import {
   GET_HOTELS,
   SET_HOTELS,
   HOTELS_RECEIVED,
   UPDATE_HOTELS,
   DELETE_HOTELS,
   UPDATE_HOTELS_LIST,
   GET_HOTEL_DETAILS,
   CONFIG_DEVICES,
   HOTEL_DETAILS_RECEIVED,
   GET_CHANNELS,
   GET_CHANNELS_RECEIVED,
   GET_KALTURA_CHANNELS,
   GET_KALTURA_CHANNELS_RECEIVED,
   LOGIN_ERROR,
   GET_THEMES,
   GET_THEMES_SUCCESS,
   HOTEL_ERROR,
   UPDATE_SUCCESS,
   DELETE_HOTEL,
   DELETE_HOTEL_SUCCESS,
   DELETE_HOTEL_SERIAL_NUMBER,
   DELETE_HOTEL_SERIAL_NUMBER_SUCCESS,
   GET_POSTCODES_SUCCESS,
   SET_HOTELS_SUCCESS,
   REGISTER_DEVICE,
   REGISTER_ERROR,
   REGISTER_SUCCESS,
   GET_HOTELS_WITH_DEVICE_SERIAL_NO,
   GET_HOTELS_WITH_DEVICE_SERIAL_NO_SUCCESS,
   GET_HOTELS_WITH_DEVICE_SERIAL_NO_ERROR,
} from '../actionTypes';

import { hotelInitialState, themesInitialState, postCodesInitialState } from '../initialState';
import { Record, List } from 'immutable';
import { StarRateTwoTone } from '@material-ui/icons';

export const hotelReducer = (state = hotelInitialState, action) => {
   switch (action.type) {
            case LOGIN_ERROR:
         return state.map((hotel, index) => {
            return {
               ...hotel, // copy the existing item
               loginError: true, // replace the email addr
            };
            return hotel;
         });
      case GET_HOTELS || SET_HOTELS:
         return {
            ...state,
            loading: true,
            success: false,
            error: false,
         };

      case GET_HOTELS_WITH_DEVICE_SERIAL_NO:{
         return{
            ...state,
         }
      }

      case GET_HOTELS_WITH_DEVICE_SERIAL_NO_SUCCESS:{
         return{
            ...state,
            hotels: action.data
         }
      }

      case GET_HOTELS_WITH_DEVICE_SERIAL_NO_ERROR:{
         return{
            ...state,
            error: true,
            errorMessage: action.data.message,
            status: action.data.status,
         }
      }
      case SET_HOTELS:
         return {
            ...state,
            loading: true,
            success: false,
            error: false,
         };
      case SET_HOTELS_SUCCESS:
         return {
            ...state,
            status: 200,
            // loading: false,
            success: true,
            message: 'Hotel created successfully',
         };

      case HOTELS_RECEIVED:
         return {
            ...state,
            hotels: action.hotels.data,
            status: 200,
            loading: false,
         };
      case GET_HOTEL_DETAILS:
                  return {
            ...state,
            error: false,
            loading: true,
            success: false,
         };
      case REGISTER_DEVICE:
         return {
            ...state,
            // loading: true,
            RegisterError: false,
         };
      case HOTEL_DETAILS_RECEIVED:
         state.hotel = action.hotel[0].data;
         return {
            ...state,
            hotel: action.hotel[0].data,
            error: false,
            loading: false,
         };
      case GET_CHANNELS:
         return {
            ...state,
            error: false,
            loading: false,
         };
      case GET_CHANNELS_RECEIVED:
         return {
            ...state,
            channels: action.id[0].channels,
            error: false,
            loading: false,
         }
      case GET_KALTURA_CHANNELS:
         return {
            ...state,
            error: false,
            loading: false,
         };
      case GET_KALTURA_CHANNELS_RECEIVED:
         return {
            ...state,
            kalturaChannels: [], //action.data[0].liveChannels.result,
            error: false,
            loading: false,
         }

      case UPDATE_HOTELS_LIST:
         return state.push(action.hotels);

      case UPDATE_HOTELS:
         return {
            ...state,
            success: false,
         };
      case UPDATE_SUCCESS:
         return {
            ...state,
            success: true,
         };
      case DELETE_HOTEL:
         return {
            ...state,
            success: false,
         }
      case DELETE_HOTEL_SUCCESS:
         return {
            ...state,
            success: true,
         }
      case DELETE_HOTEL_SERIAL_NUMBER:
         return {
            ...state,
            success: false,
         }
      case DELETE_HOTEL_SERIAL_NUMBER_SUCCESS:
         return {
            ...state,
            success: true,
         }
      case REGISTER_SUCCESS:
         console.log(action);
         return {
            ...state,
            // loading: false,
            hotel: {
               ...state.hotel,
               devices: [...state.hotel.devices, action.data],
            },
         };

      case DELETE_HOTELS:
         function listRemove(state, value) {
            return state.filter((hotel, index) => {
               if (hotel.hotelId === value) {
                  return false;
               }
               return true;
               // Every other item stays
            });
         }
         action.hotels.forEach((element) => {
            state = listRemove(state, element);
         });
         return state;
      case HOTEL_ERROR:
         return {
            ...state,
            loading: false,
            error: true,
            errorMessage: action.data.message,
            status: action.data.status,
         };
      case REGISTER_ERROR:
         return {
            ...state,
            loading: false,
            RegisterError: true,
            errorMessage: action.data.message,
            status: action.data.status,
         };
      default:
         return state;
   }
};

export const themesReducer = (state = themesInitialState, action) => {
   switch (action.type) {
      case GET_THEMES_SUCCESS:
         return {
            ...action.data,
         };

      default:
         return state;
   }
};

export const postCodesReducer = (state = postCodesInitialState, action) => {
   switch (action.type) {
      case GET_POSTCODES_SUCCESS:
         return action.data.data[0].post_codes;

      default:
         return state;
   }
};
