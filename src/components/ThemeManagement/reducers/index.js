import { GET_THEMES } from "../actionTypes";
import { SET_THEMES } from "../actionTypes";
import { THEMES_RECEIVED } from "../actionTypes";
import { UPDATE_THEMES } from "../actionTypes";
import { DELETE_THEMES } from "../actionTypes";
import { UPDATE_THEMES_LIST } from "../actionTypes";
import { themeInitialState } from "../initialState";
import { Record, List, fromJS } from "immutable";

const themeReducer = (state = themeInitialState, action) => {
   // console.log(action.themes);
   // console.log(state);

   switch (action.type) {
      // case GET_THEMES: return { ...state }

      case THEMES_RECEIVED:
         return List(action.themes);
      // return {
      //     ...state,
      //     themes: action.themes,
      //     loading: false
      // }
      case UPDATE_THEMES_LIST:
         return state.push(action.themes);
      // return {
      //     ...state,
      //     themes: [
      //         ...state.themes,
      //         ...action.themes
      //     ],
      //     loading: false

      // }

      case UPDATE_THEMES:
         return state.map((theme, index) => {
            // Find the item with the matching id
            if (theme.themeNo === action.theme.themeNo) {
               // Return a new object
               return {
                  ...theme, // copy the existing item
                  status: action.payload.status, // replace the email addr
               };
            }

            // Leave every other item unchanged
            return theme;
         });

      case DELETE_THEMES:
         return state.filter((theme, index) => {
            // Remove item "X"
            // alternatively: you could look for a specific index
            if (theme.id === action.theme.id) {
               return false;
            }

            // Every other item stays
            return true;
         });

      default:
         return state;
   }
};

export default themeReducer;
