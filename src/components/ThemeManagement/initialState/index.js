
// export const themeInitialState = {

//     themes: [{
//         logo: null,
//         hotelName: null,
//         themeName: null,

//     }],
//     loading: true


import { Record, List, fromJS } from 'immutable'

export const themeInitialState = List(
    [{
        logo: null,
        hotelName: null,
        themeName: null,

    }]
)