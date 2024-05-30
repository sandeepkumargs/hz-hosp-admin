import { put, call, takeLatest, all, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions';
import {
   getAllHotelsApi,
   addHotelApi,
   getHotelDetailsApi,
   configDevicesApi,
   updateHotelDetailsApi,
   getThemesApi,
   getPostCodesApi,
   registerDeviceApi,
   getAllChannelsApi,
   getKalturaLiveChannelsApi,
   deleteHotelApi,
   deleteHotelSerialNumberApi,
   getHotelWithDeviceSerialNOApi
} from '../api/index';
// import { yield } from 'fibers';

function* setHotels(data) {
   try {
      const response = yield call(addHotelApi, data);
      console.log(response);

      if (response.status >= 200 && response.status < 300) {
         const result = yield response.json();
         yield put(actions.setHotelsSuccess());
      } else {
         throw response;
      }
   } catch (error) {
      const message = yield error.text();
      yield put(
         actions.hotelError({
            status: error.status,
            message: message,
         })
      );
   }
}

function* getAllHotels() {
   const result = yield call(getAllHotelsApi);
   if (result.data) yield put(actions.hotelsReceived(result));
   else yield put(actions.hotelError(result));
}

function* getHotelDetails(data) {
   const result = yield call(getHotelDetailsApi, data);
   if (result.data) yield put(actions.hotelDetailsReceived([result]));
   else yield put(actions.hotelError(result));
}

function* getHotellWithSerialNO(data) {

   const result = yield call(getHotelWithDeviceSerialNOApi, data.value);
   if(result.status >= 200 && result.status < 300) 
      yield put(actions.getHotelWithDeviceSerialNOSuccess(result.data.data));
   else yield put(actions.getHotelWithDeviceSerialNOError(result));
}

function* getChannels(data) {
   const result = yield call(getAllChannelsApi, data.id);
   if (result) yield put(actions.getChannelsReceived([result]));
   else yield put(actions.hotelError(result));
}

function* getKalturaLiveChannels() {
   const result = yield call(getKalturaLiveChannelsApi);
   if (result) yield put(actions.getKalturaChannelsReceived([result]));
   else yield put(actions.hotelError(result));
}

function* configDevices(data) {
   try {
      const result = yield call(configDevicesApi, data.configInfo);
      yield put(actions.hotelError(result));
   } catch (hotelError) {
      yield put(actions.loginError(true));
   }
}

function* updateHotelDetails(data) {
   const result = yield call(updateHotelDetailsApi, data);
   if (result.status) {
      let hotel = {
         hotelId: data.hotel.hotel_id,
      };
      yield put(actions.getHotelDetails(hotel));
      // yield put(actions.updateHotelSuccess());
   } else {
      yield put(actions.hotelError(result));
   }
}

function* deleteHotel(data) {
   const result = yield call(deleteHotelApi, data.hotel);
   yield put(actions.deleteHotelSuccess(result));
}

function* deleteHotelSerialNumber(data) {
   const result = yield call(deleteHotelSerialNumberApi, data.hotel);
   yield put(actions.deleteHotelSerialNumberSuccess(result));
}

function* getThemes(data) {
   const result = yield call(getThemesApi, data);
   yield put(actions.getThemesSuccess(result));
}

function* getPostCodes() {
   // const result = yield call(getPostCodesApi);
   // yield put(actions.getPostCodesSuccess(result));
}

function* registerDevice(device) {
   try {
      const response = yield call(registerDeviceApi, device);
      console.log(response);
      if (response.status >= 200 && response.status < 300) {
         const result = yield response.json();
         console.log(result);
         device.data.DTV = result.DTV;
         yield put(actions.registerSuccess(device.data));
         yield put(actions.registerError(result));
      } else {
         throw response;
      }
   } catch (error) {
      const message = yield error.text();
      yield put(
         actions.registerError({
            status: error.status,
            message: message,
         })
      );
   }
}

export function* hotelsWatcher() {
   yield takeLatest('GET_HOTELS', getAllHotels);
   yield takeLatest('SET_HOTELS', setHotels);
   yield takeLatest('GET_HOTEL_DETAILS', getHotelDetails);
   yield takeLatest('UPDATE_HOTELS', updateHotelDetails);
   yield takeLatest('CONFIG_DEVICES', configDevices);
   yield takeLatest('REGISTER_DEVICE', registerDevice);
   yield takeLatest('GET_CHANNELS', getChannels);
   yield takeLatest('GET_KALTURA_CHANNELS', getKalturaLiveChannels);
   yield takeLatest('DELETE_HOTEL', deleteHotel);
   yield takeLatest('DELETE_HOTEL_SERIAL_NUMBER', deleteHotelSerialNumber);
   yield takeLatest('GET_HOTELS_WITH_DEVICE_SERIAL_NO', getHotellWithSerialNO);

}

export function* themesWatcher() {
   yield takeLatest('GET_THEMES', getThemes);
}

export function* postCodesWatcher() {
   yield takeLatest('GET_POSTCODES', getPostCodes);
}
