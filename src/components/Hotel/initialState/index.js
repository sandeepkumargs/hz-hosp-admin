import { Record, List, fromJS } from 'immutable';

export const hotelInitialState = {
   hotels: [
      {
         _id: null,
         logo: null,
         hotelName: null,
         hotelType: null,
         entityName: null,
         deviceCount: null,
         address: null,
         theme: null,
         lang: [],
         loginError: null,
         logo_1x1: null,
      },
   ],
   hotel: {
      _id: null,
      metadata: {
         BRN_Number: null,
         hotel_name: null,
         hotel_reg_name: null,
         property_type: null,
         address: null,
         phone: null,
         description: null,
         rating: null,
         sector: null,
         selected_language: [],
         selected_channels: [],
         logo_1x1: null,
         logo_16x9: null,
         logo_9x16: null,
         base_currency: null,
         background_1x1: null,
         background_16x9: null,
         background_9x16: null,
         selected_theme: null,
         selected_color_scheme: null,
         serial_number: null,
      },
      devices: [],
      theme: {
         id: null,
         name: null,
         type: null,
         colorScheme: {
            display_name: null,
            preview_url: null,
            color_scheme_name: null,
         },
      },
   },
   loading: false,
   error: false,
   ErrorMessage: '',
   success: false,
   status: null,
   message: null,
   RegisterError: false,
   registerErrorMsg: '',
   RegisterStatus: null,
};

export const themesInitialState = {
   themes: [
      {
         id: null,
         name: null,
         type: null,
         color_schemes: [
            {
               display_name: null,
               preview_url: null,
               color_scheme_name: null,
               menu: { color: null, bgColor: null },
               tiles: { color: null, bgColor: null },
               button: { primary_color: null, color: null, bgColor: null },
            },
         ],
      },
   ],
};

export const postCodesInitialState = [];
