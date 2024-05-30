import { TPSApi, getJwtToken } from '../../../config';
export const getAllThirdPartyServicesApi = async (info) => {
   var myHeaders = new Headers();
   myHeaders.append('x-auth-token', getJwtToken().jwt_token);

   var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
   };

   try {
      const response = await fetch(TPSApi.getAllThirdPartyServicesApi, requestOptions);
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

export const addThirdPartyServicesApi = async (info) => {
   var myHeaders = new Headers();
   myHeaders.append('x-auth-token', getJwtToken().jwt_token);
   myHeaders.append('Content-Type', 'application/json');

   var raw = JSON.stringify({
      name: info.thirdPartyService.name,
      url: info.thirdPartyService.url,
   });

   var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
   };

   try {
      const response = await fetch(TPSApi.addThirdPartyServicesApi, requestOptions);
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

export const updateThirdPartyServicesApi = async (info) => {
   var myHeaders = new Headers();
   myHeaders.append('x-auth-token', getJwtToken().jwt_token);
   myHeaders.append('Content-Type', 'application/json');

   var raw = JSON.stringify({
      id: info.thirdPartyService.id,
      name: info.thirdPartyService.name,
      url: info.thirdPartyService.url,
   });

   var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
   };

   try {
      const response = await fetch(TPSApi.updateThirdPartyServicesApi, requestOptions);
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

export const deleteThirdPartyServicesApi = async (info) => {
   var myHeaders = new Headers();
   myHeaders.append('x-auth-token', getJwtToken().jwt_token);

   var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
   };
   try {
      const response = await fetch(
         TPSApi.deleteThirdPartyServicesApi + info.thirdPartyService.id,
         requestOptions
      );
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
