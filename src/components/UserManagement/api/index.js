import { loginApi, user, loginUrl, getJwtToken } from '../../../config';
import MD5 from "crypto-js/md5";

export const userLoginApi = async (data) => {
   var myHeaders = new Headers();
   myHeaders.append('Content-Type', 'application/json');

   var raw = JSON.stringify({
      email: data.user.email,
      password: MD5(data.user.password).toString(),
   });

   var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
   };
   try {
      const response = await fetch(loginApi.auth, requestOptions);

      if (response.status == 200) {
         const res = await response.text();
         const result = await JSON.parse(res);

         return result;
      } else {
         return await { jwt_token: false };
      }
   } catch (error) {
      return error;
   }
};

export const getAllUsersApi = async () => {
   var myHeaders = new Headers();
   myHeaders.append('x-auth-token', getJwtToken().jwt_token);
   var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
   };

   const response = await fetch(user.getAllUsersApi, requestOptions);
   const result = await response.text();
   try {
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

export const addUserApi = async (info) => {
   var myHeaders = new Headers();
   myHeaders.append('x-auth-token', getJwtToken().jwt_token);
   myHeaders.append('Content-Type', 'application/json');

   var raw = JSON.stringify({
      fullname: info.user.fullName,
      email: info.user.email,
      password: MD5(info.user.password).toString(),
      role: info.user.role,
   });

   var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
   };

   const response = await fetch(user.addUserApi, requestOptions);
   const result = await response.text();
   try {
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

export const updateUserInfoApi = async (info) => {
   var myHeaders = new Headers();
   myHeaders.append('x-auth-token', getJwtToken().jwt_token);
   myHeaders.append('Content-Type', 'application/json');

   var raw = JSON.stringify({
      fullname: info.user.fullName,
      email: info.user.email,
      role: info.user.role,
      id: info.user.id,
      password: MD5(info.user.password).toString(),
   });

   var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
   };

   const response = await fetch(user.updateUserInfoApi, requestOptions);
   const result = await response.text();
   try {
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

export const deleteUserApi = async (info) => {
   var myHeaders = new Headers();
   myHeaders.append('x-auth-token', getJwtToken().jwt_token);

   var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
   };

   const response = await fetch(user.deleteUserApi + info.user.id, requestOptions);
   const result = await response.text();

   try {
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

export const updateOneUserInfoApi = async (info) => {
   var myHeaders = new Headers();
   myHeaders.append('x-auth-token', getJwtToken().jwt_token);
   myHeaders.append('Content-Type', 'application/json');

   var raw = JSON.stringify({
      fullname: info.user.fullname,
   });

   var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
   };

   const response = await fetch(user.updateOneUserInfoApi, requestOptions);
   const result = await response.text();
   try {
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

export const changepassAPi = async (info) => {
   var myHeaders = new Headers();
   myHeaders.append('x-auth-token', getJwtToken().jwt_token);
   myHeaders.append('Content-Type', 'application/json');

   var raw = JSON.stringify({
      oldpswd: MD5(info.user.oldpass).toString(),
      newpswd: MD5(info.user.newpass).toString(),
   });

   var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
   };
   const response = await fetch(user.changepassAPi, requestOptions);
   const result = await response.text();
   try {
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
