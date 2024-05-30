// const base_url = 'http://65.2.80.45:3000/'; // Staging
const base_url = 'http://192.168.0.225:3000/'; // Production
// const base_url = 'http://localhost:3000/'; // Local
export const getJwtToken = () => {
   let userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
   return userDetails;
};
export const loginUrl = 'login';
export const hotelApi = {
   getAllHotels: base_url + 'api/hotels',
   addHotelApi: base_url + 'api/hotels/add',
   getHotelDetails: base_url + 'api/hotels/',
   getHotelDetailWithDeviceID: base_url + 'api/hotels',
   configDevices: base_url + 'api/hotels/assigned-devices',
   updateHotelDetails: base_url + 'api/hotels/update',
   getThemesApi: base_url + 'dhs-admin/themes',
   getPostCodesApi: base_url + 'dhs-admin/post-codes',
   registerDeviceApi: base_url + 'dhs-admin/devices/register-new-device',
   getAllChannelsApi: base_url + 'dhs-client/channels/',
   getKalturaLiveChannelsApi: base_url + 'dhs-client/channels/kaltura-live-channels',
   deleteHotelApi: base_url + 'api/hotels/deleteHotel/',
   deleteHotelSerialNumberApi: base_url + 'api/hotels/deleteHotelSerialNumber'
};

export const loginApi = {
   auth: base_url + 'dhs-client/auth',
};

export const uploadApi = {
   upload: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
};

export const TPSApi = {
   getAllThirdPartyServicesApi: base_url + 'api/third-party-services',
   addThirdPartyServicesApi: base_url + 'api/third-party-services/add',
   updateThirdPartyServicesApi: base_url + 'api/third-party-services/edit',
   deleteThirdPartyServicesApi: base_url + 'api/third-party-services/',
};

export const media = {
   getUrlFromS3Api: base_url + 'media-upload/',
   removeMediaApi: base_url + 'media-upload/delete',
};

export const user = {
   getAllUsersApi: base_url + 'dhs-admin/users',
   addUserApi: base_url + 'dhs-admin/users/add',
   updateUserInfoApi: base_url + 'dhs-admin/users/update',
   deleteUserApi: base_url + 'dhs-admin/users/',
   updateOneUserInfoApi: base_url + 'api/users/profile',
   changepassAPi: base_url + 'api/users/change-password',
};


//Version change
export const appversion ="1.1.0"
