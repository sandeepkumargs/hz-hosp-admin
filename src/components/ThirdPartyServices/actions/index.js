import {
   GET_THIRD_PARTY_SERVICES,
   ADD_THIRD_PARTY_SERVICES,
   THIRD_PARTY_SERVICES_RECEIVED,
   UPDATE_THIRD_PARTY_SERVICES,
   UPDATE_THIRD_PARTY_SERVICES_LIST,
   DELETE_THIRD_PARTY_SERVICES,
   TPSERROR,
} from '../actionTypes';

export const getThirdPartyServices = () => {
   return {
      type: GET_THIRD_PARTY_SERVICES,
   };
};

export const addThirdPartyServices = (thirdPartyService) => {
   return {
      type: ADD_THIRD_PARTY_SERVICES,
      thirdPartyService,
      // payload: number
   };
};
export const updateThirdPartyServicesList = (thirdPartyServices) => {
   return {
      type: UPDATE_THIRD_PARTY_SERVICES_LIST,
      thirdPartyServices,
      // payload: number
   };
};
export const thirdPartyServicesReceived = (thirdPartyServices) => {
   return {
      type: THIRD_PARTY_SERVICES_RECEIVED,
      thirdPartyServices,
      // payload: number
   };
};

export const updateThirdPartyServices = (thirdPartyService) => {
   return {
      type: UPDATE_THIRD_PARTY_SERVICES,
      thirdPartyService,
      // payload: number
   };
};

export const deleteThirdPartyServices = (thirdPartyService) => {
   return {
      type: DELETE_THIRD_PARTY_SERVICES,
      thirdPartyService,
      // payload: number
   };
};

export const tpsError = (data) => {
   return {
      type: TPSERROR,
      data,
   };
};
