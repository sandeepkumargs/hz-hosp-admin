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

export const login = (user) => {
   return {
      type: LOGIN,
      user,
   };
};

export const loginRes = (res) => {
   return {
      type: LOGIN_RES,
      res,
      // payload: number
   };
};

export const logOut = () => {
   return {
      type: LOGOUT,

      // payload: number
   };
};

export const getAllUsers = () => {
   return {
      type: GET_ALL_USERS,
   };
};

export const userInfoReceived = (info) => {
   return {
      type: USERS_INFO_RECEIVED,
      info,
   };
};

export const addUser = (user) => {
   return {
      type: ADD_USER,
      user,
   };
};

export const updateUserInfo = (user) => {
   return {
      type: UPDATE_USER_INFO,
      user,
   };
};

export const deleteUser = (user) => {
   return {
      type: DELETE_USER,
      user,
   };
};

export const deleteUserSuccess = (user) => {
   return {
      type: DELETE_USER_SUCCESS,
      user,
   };
};

export const changePassword = (user) => {
   return {
      type: CHANGE_PASSWORD,
      user,
   };
};

export const logError = (data) => {
   return {
      type: LOG_ERROR,
      data,
   };
};

export const updateOneUserInfo = (user) => {
   return {
      type: UPDATE_ONE_USER_INFO,
      user,
   };
};

export const oneChangePassword = (user) => {
   return {
      type: ONE_CHANGE_PASSWORD,
      user,
   };
};
