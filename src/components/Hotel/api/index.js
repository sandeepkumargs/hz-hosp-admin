import { hash } from 'immutable';
import { hotelApi, getJwtToken } from '../../../config';
import { logError } from '../../UserManagement/actions';
export const getAllHotelsApi = async () => {
   var myHeaders = new Headers();
   myHeaders.append('x-auth-token', getJwtToken().jwt_token);

   var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
   };
   try {
      const response = await fetch(hotelApi.getAllHotels, requestOptions);
      const result = await response.text();
      if (response.status == 200) {
         return JSON.parse(result);
      } else {
         throw { response, result };
      }
   } catch (error) {
      return {
         status: error.response.status,
         message: error.result,
      };
   }
};

export const addHotelApi = async (hotelData) => {
   var myHeaders = new Headers();
   myHeaders.append('x-auth-token', getJwtToken().jwt_token);
   myHeaders.append('Content-Type', 'application/json');
   var raw = JSON.stringify({
      dHSCustRef: hotelData.hotel.dHSCustRef,
      BRN_Number: hotelData.hotel.BRN_Number,
      title: hotelData.hotel.title,
      firstName: hotelData.hotel.firstName,
      lastName: hotelData.hotel.lastName,
      email: hotelData.hotel.email,
      addressLine1: hotelData.hotel.addressLine1,
      addressLine2: hotelData.hotel.addressLine2,
      addressLine3: hotelData.hotel.addressLine3,
      postCode: hotelData.hotel.postCode,
      technicalContactNumber: hotelData.hotel.technicalContactNumber,
      hotelContactNumber: hotelData.hotel.hotelContactNumber,

      totalNumOfConnections: parseInt(hotelData.hotel.totalNumOfConnections),
      totalNumOfOccupancyConnections: parseInt(hotelData.hotel.totalNumOfOccupancyConnections),
      totalNumOfPrivateConnections: parseInt(hotelData.hotel.totalNumOfPrivateConnections),
      totalNumOfPublicConnections:
         parseInt(hotelData.hotel.totalNumOfOccupancyConnections) -
         parseInt(hotelData.hotel.totalNumOfPrivateConnections),
      totalNumOfBufferConnections:
         hotelData.hotel.totalNumOfConnections - hotelData.hotel.totalNumOfOccupancyConnections,
      isVODServiceEnabled: hotelData.hotel.isVODServiceEnabled,
      selected_theme: hotelData.hotel.selected_theme_id,
      selected_color_scheme: hotelData.hotel.selected_color_scheme,
      selected_language: hotelData.hotel.lang,
      base_currency: hotelData.hotel.currency,
      logo_1x1: hotelData.hotel.logos.res1_1Logo,
      logo_16x9: hotelData.hotel.logos.res16_9Logo,
      background_16x9: hotelData.hotel.bgImg.res16_9BgImg,
      serial_number: hotelData.hotel.serial_number,
      selected_channels: hotelData.hotel.selected_channels,
   });

   var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
   };
   return fetch(hotelApi.addHotelApi, requestOptions);
   // try {
   //    const response = await fetch(hotelApi.addHotelApi, requestOptions);
   //    console.log(response);

   //    const result = await response.text();
   //    if (response.status == 200) {
   //       return JSON.parse(result);
   //    } else {
   //       throw { response, result };
   //    }
   // } catch (error) {
   //    return {
   //       status: error.response.status,
   //       message: error.result,
   //    };
   // }
};

export const getHotelDetailsApi = async (info) => {
   var myHeaders = new Headers();
   myHeaders.append('x-auth-token', getJwtToken().jwt_token);

   var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
   };

   try {
      const response = await fetch(hotelApi.getHotelDetails + info.hotel.hotelId, requestOptions);

      const result = await response.text();

      if (response.status == 200) {
         return JSON.parse(result);
      } else {
         throw { response, result };
      }
   } catch (error) {
      return {
         status: error.response.status,
         message: error.result,
      };
   }
};

export const getHotelWithDeviceSerialNOApi = async (hotelId) => {
   var myHeaders = new Headers();
   myHeaders.append('x-auth-token', getJwtToken().jwt_token);

   var requestOptions = {
      method: 'GET',
      headers: myHeaders,
   };

   try {
      const response = await fetch(hotelApi.getHotelDetailWithDeviceID +"?search="+ hotelId, requestOptions);

      const result = response;

      if (response.status == 200) {
         const data = result.json()
         result.data = await data
         return result;
      } else {
         throw { result };
      }
   } catch (error) {
      return error
   }
};

export const configDevicesApi = async (configInfo) => {
   var myHeaders = new Headers();
   myHeaders.append('x-auth-token', getJwtToken().jwt_token);
   myHeaders.append('Content-Type', 'application/json');

   var raw = JSON.stringify({
      hotel_id: configInfo.id,
      number_of_private_devices: configInfo.devicesInfo.privateDevices,
      number_of_public_devices: configInfo.devicesInfo.publicDevices,
   });

   var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
   };

   try {
      const response = await fetch(hotelApi.configDevices, requestOptions);
      const result = await response.text();
      if (response.status == 200) {
         return JSON.parse(result);
      } else {
         throw { response, result };
      }
   } catch (error) {
      return {
         status: error.response.status,
         message: error.result,
      };
   }
};

export const updateHotelDetailsApi = async (hotelInfo) => {
   var myHeaders = new Headers();
   myHeaders.append('x-auth-token', getJwtToken().jwt_token);
   myHeaders.append('Content-Type', 'application/json');

   var raw = JSON.stringify({
      ...hotelInfo.hotel,
   });

   var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
   };

   try {
      const response = await fetch(hotelApi.updateHotelDetails, requestOptions);
      const result = await response.text();
      if (response.status == 200) {
         return JSON.parse(result);
      } else {
         throw { response, result };
      }
   } catch (error) {
      return {
         status: error.response.status,
         message: error.result,
      };
   }
};

export const getThemesApi = async (data) => {
   var myHeaders = new Headers();
   myHeaders.append('x-auth-token', getJwtToken().jwt_token);
   myHeaders.append('Content-Type', 'application/json');

   var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
   };

   try {
      const response = await fetch(hotelApi.getThemesApi, requestOptions);
      const result = await response.text();
      if (response.status == 200) {
         return JSON.parse(result);
      } else {
         throw { response, result };
      }
   } catch (error) {
      return {
         status: error.response.status,
         message: error.result,
      };
   }
};

export const getPostCodesApi = async () => {
   var myHeaders = new Headers();
   myHeaders.append('x-auth-token', getJwtToken().jwt_token);
   myHeaders.append('Content-Type', 'application/json');

   var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
   };

   try {
      const response = await fetch(hotelApi.getPostCodesApi, requestOptions);
      const result = await response.text();

      if (response.status == 200) {
         return JSON.parse(result);
      } else {
         throw { response, result };
      }
   } catch (error) {
      return {
         status: error.response.status,
         message: error.result,
      };
   }
};

export const registerDeviceApi = async (device) => {
   var myHeaders = new Headers();
   myHeaders.append('x-auth-token', getJwtToken().jwt_token);
   myHeaders.append('Content-Type', 'application/json');

   var raw = JSON.stringify({
      hotel_id: device.data.hotelId,
      serialNo: device.data.serialNo,
      room_number: device.data.room_number,
      device_state: device.data.state,
      area_code: device.data.area_code,
      package_code: device.data.package_code,
      account_category: device.data.account_category
   });

   var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
   };

   return fetch(hotelApi.registerDeviceApi, requestOptions);
};
export const getAllChannelsApi = async (info) => {
   var myHeaders = new Headers();
   myHeaders.append('x-auth-token', getJwtToken().jwt_token);

   var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
   };
   try {
      const response = await fetch(hotelApi.getAllChannelsApi + info, requestOptions);

      const result = await response.text();
      if (response.status == 200) {
         return JSON.parse(result);
      } else {
         throw { response, result };
      }
   } catch (error) {
      return {
         status: error.response.status,
         message: error.result,
      };
   }
};

export const getKalturaLiveChannelsApi = async () => {
   var myHeaders = new Headers();
   myHeaders.append('x-auth-token', getJwtToken().jwt_token);

   var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
   };
   try {
      const response = await fetch(hotelApi.getKalturaLiveChannelsApi, requestOptions);
      const result = await response.text();
      if (response.status == 200) {
         return JSON.parse(result);
      } else {
         throw { response, result };
      }
   } catch (error) {
      return {
         status: error.response.status,
         message: error.result,
      };
   }
};

export const deleteHotelApi = async (hotel) => {
   var myHeaders = new Headers();
   myHeaders.append('x-auth-token', getJwtToken().jwt_token);

   var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
   };
   try {
      const response = await fetch(hotelApi.deleteHotelApi + hotel, requestOptions);
      const result = await response.text();
      if (response.status == 200) {
         return JSON.parse(result);
      } else {
         throw { response, result };
      }
   } catch (error) {
      return {
         status: error.response.status,
         message: error.result,
      };
   }
};

export const deleteHotelSerialNumberApi = async (data) => {
   var myHeaders = new Headers();
   myHeaders.append('x-auth-token', getJwtToken().jwt_token);
   myHeaders.append('Content-Type', 'application/json');

   var raw = JSON.stringify({
      hotel_id: data.hotel_id,
      serial_number: data.serial_number,
      room_number: data.room_number,
   });

   var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
   };
   try {
      const response = await fetch(hotelApi.deleteHotelSerialNumberApi, requestOptions);
      const result = await response.text();
      if (response.status == 200) {
         return JSON.parse(result);
      } else {
         throw { response, result };
      }
   } catch (error) {
      return {
         status: error.response.status,
         message: error.result,
      };
   }
};
