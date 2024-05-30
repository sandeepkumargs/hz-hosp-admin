import { put, call, takeLatest, all, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions';
import {
   userLoginApi,
   getAllUsersApi,
   addUserApi,
   updateUserInfoApi,
   deleteUserApi,
   updateOneUserInfoApi,
   changepassAPi,
} from '../api/index';
// import changePassword from '../views/changePassword';
function* login(data) {
   var result = null;
   try {
      result = yield call(userLoginApi, data);
      if (result == 'TypeError: Failed to fetch')
         yield put(
            actions.logError({
               message:
                  'There seems to be a problem with your internet connection. Please check and try again.',
            })
         );
      else yield put(actions.loginRes(result));
   } catch (logError) {
      // console.log(logError);
   }
}

function* getAllUsers() {
   const result = yield call(getAllUsersApi);
   if (result.data) yield put(actions.userInfoReceived(result));
   else yield put(actions.logError(result));
}
function* addUser(data) {
   const result = yield call(addUserApi, data);
   yield put(actions.logError(result));
}
function* updateUserInfo(data) {
   const result = yield call(updateUserInfoApi, data);
   yield put(actions.logError(result));
}
function* deleteUser(data) {
   const result = yield call(deleteUserApi, data);
   if (result.status) yield put(actions.getAllUsers());
   else yield put(actions.logError(result));
}

function* updateOneUserInfo(data) {
   const result = yield call(updateOneUserInfoApi, data);
   yield put(actions.logError(result));
}

function* OneChangePassword(data) {
   const result = yield call(changepassAPi, data);
   yield put(actions.logError(result));
}

export default function* UserWatcher() {
   yield takeLatest('LOGIN', login);
   yield takeLatest('GET_ALL_USERS', getAllUsers);
   yield takeLatest('ADD_USER', addUser);
   yield takeLatest('UPDATE_USER_INFO', updateUserInfo);
   yield takeLatest('DELETE_USER', deleteUser);
   yield takeLatest('CHANGE_PASSWORD', updateUserInfo);
   yield takeLatest('UPDATE_ONE_USER_INFO', updateOneUserInfo);
   yield takeLatest('ONE_CHANGE_PASSWORD', OneChangePassword);
}
