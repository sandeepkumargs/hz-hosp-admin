import { List } from 'immutable';
export const userInitialState = {
   users: [
      {
         _id: null,
         fullname: null,
         email: null,
         password: null,
         role: null,
         hotel_id: null,
         profile_pic: null,
         jwt_token: null,
         error: null,
      },
   ],
   _id: null,
   fullname: null,
   email: null,
   password: null,
   role: null,
   hotel_id: null,
   isAdmin: null,
   profile_pic: null,
   jwt_token: null,
   error: null,
   loading: false,
   message: null,
   status: null,
};
