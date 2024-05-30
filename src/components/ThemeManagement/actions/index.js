import { GET_THEMES } from '../actionTypes'
import { SET_THEMES } from '../actionTypes'
import { THEMES_RECEIVED } from '../actionTypes'
import { UPDATE_THEMES } from '../actionTypes'
import { DELETE_THEMES } from '../actionTypes'
import { UPDATE_THEMES_LIST } from '../actionTypes'


export const getThemes = () => {
    return {
        type: GET_THEMES,
        // themes
    }
}

export const setThemes = (themes) => {
    return {
        type: SET_THEMES,
        themes
        // payload: number
    }
}
export const updateThemesList = (themes) => {
    return {
        type: UPDATE_THEMES_LIST,
        themes
        // payload: number
    }
}
export const themesReceived = (themes) => {

    return {
        type: THEMES_RECEIVED,
        themes
        // payload: number
    }
}

export const updateThemes = (themes) => {

    return {
        type: UPDATE_THEMES,
        themes
        // payload: number
    }
}

export const deleteThemes = (themes) => {

    return {
        type: DELETE_THEMES,
        themes
        // payload: number
    }
}