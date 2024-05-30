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
   GET_POSTCODES,
   SET_HOTELS_SUCCESS,
   GET_POSTCODES_SUCCESS,
   REGISTER_DEVICE,
   REGISTER_ERROR,
   REGISTER_SUCCESS,
   DELETE_HOTEL,
   DELETE_HOTEL_SUCCESS,
   DELETE_HOTEL_SERIAL_NUMBER,
   DELETE_HOTEL_SERIAL_NUMBER_SUCCESS,
   GET_HOTELS_WITH_DEVICE_SERIAL_NO,
   GET_HOTELS_WITH_DEVICE_SERIAL_NO_SUCCESS,
   GET_HOTELS_WITH_DEVICE_SERIAL_NO_ERROR,
} from '../actionTypes';

export const getHotels = () => {
   return {
      type: GET_HOTELS,
      // hotels
   };
};

export const getHotelWithDeviceSerialNO = (value) => {
   return {
      type: GET_HOTELS_WITH_DEVICE_SERIAL_NO,
      value
   };
};

export const getHotelWithDeviceSerialNOSuccess = (data) => {
   return {
      type: GET_HOTELS_WITH_DEVICE_SERIAL_NO_SUCCESS,
      data
   };
};

export const getHotelWithDeviceSerialNOError = (err) => {
   return {
      type: GET_HOTELS_WITH_DEVICE_SERIAL_NO_ERROR,
      err
   };
};

export const setHotels = (hotel) => {
   return {
      type: SET_HOTELS,
      hotel,
      // payload: number
   };
};
export const setHotelsSuccess = (data) => {
   return {
      type: SET_HOTELS_SUCCESS,
      data,
      // payload: number
   };
};
export const updateHotelsList = (hotels) => {
   return {
      type: UPDATE_HOTELS_LIST,
      hotels,
      // payload: number
   };
};
export const hotelsReceived = (hotels) => {
   return {
      type: HOTELS_RECEIVED,
      hotels,
      // payload: number
   };
};

export const updateHotel = (hotel) => {
   return {
      type: UPDATE_HOTELS,
      hotel,
      // payload: number
   };
};

export const updateHotelSuccess = () => {
   return {
      type: UPDATE_SUCCESS,
   };
};

export const deleteHotel = (hotel) => {
   return {
      type: DELETE_HOTEL,
      hotel,
   };
};

export const deleteHotelSuccess = () => {
   return {
      type: DELETE_HOTEL_SUCCESS,
   };
};

export const deleteHotelSerialNumber = (hotel) => {
   return {
      type: DELETE_HOTEL_SERIAL_NUMBER,
      hotel,
   };
};

export const deleteHotelSerialNumberSuccess = () => {
   return {
      type: DELETE_HOTEL_SERIAL_NUMBER_SUCCESS,
   };
};

export const deleteHotels = (hotels) => {
   return {
      type: DELETE_HOTELS,
      hotels,
      // payload: number
   };
};
export const getHotelDetails = (hotel) => {
   return {
      type: GET_HOTEL_DETAILS,
      hotel,
      // payload: number
   };
};

export const hotelDetailsReceived = (hotel) => {
   hotel[0].data.devices.forEach(element =>  {
      if(element.state == 'Public'){
         element.room_number = element.area_code;
      }
      else if(element.state == 'Private'){
         element.room_number = element.room_number;
      }
   });
   return {
      type: HOTEL_DETAILS_RECEIVED,
      hotel,
      // payload: number
   };
};

export const getChannels = (id) => {
   return {
      type: GET_CHANNELS,
      id,
   }
}

export const getChannelsReceived = (id) => {
   return {
      type: GET_CHANNELS_RECEIVED,
      id,
   }
}

export const getKalturaLiveChannels = () => {
   return {
      type: GET_KALTURA_CHANNELS,
   }
}

export const getKalturaChannelsReceived = (data) => {
   return {
      type: GET_KALTURA_CHANNELS_RECEIVED,
      data,
   }
}

export const configDevices = (configInfo) => {
   return {
      type: CONFIG_DEVICES,
      configInfo,
      // payload: number
   };
};

export const loginError = (err) => {
   return {
      type: LOGIN_ERROR,
      err,
      // payload: number
   };
};

export const getThemes = (jwt_token) => {
   return {
      type: GET_THEMES,
      jwt_token,
   };
};

export const getThemesSuccess = (data) => {
   return {
      type: GET_THEMES_SUCCESS,
      data,
   };
};

export const hotelError = (data) => {
   return {
      type: HOTEL_ERROR,
      data,
   };
};

export const getPostCodes = () => {
   return {
      type: GET_POSTCODES,
   };
};

export const getPostCodesSuccess = (data) => {
   return {
      type: GET_POSTCODES_SUCCESS,
      data,
   };
};

export const registerDevice = (data) => {
   return {
      type: REGISTER_DEVICE,
      data,
   };
};

export const registerSuccess = (data) => {
  if(data.state=='Public'){
   data.room_number= data.area_code;
  }
   return {
      type: REGISTER_SUCCESS,
      data,
   };
};

export const registerError = (data) => {
   return {
      type: REGISTER_ERROR,
      data,
   };
};
