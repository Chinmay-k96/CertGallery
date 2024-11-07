import { certArray } from "./certficateList"

export const SET_THEME = 'SET_THEME'
export const SET_CERT_IMG = 'SET_CERT_IMG'
export const SET_FILTERED_CERTS = 'SET_FILTERED_CERTS'

export const setTheme = (data) =>({
    type : SET_THEME,
    payload: data
}) 

export const setCertImg = (data) =>({
    type : SET_CERT_IMG,
    payload: data
})

export const setFilteredCerts = (data) =>({
    type : SET_FILTERED_CERTS,
    payload: data
})

const initialState = {
    theme : true,
    certImg: "peoples-choice.jpg",
    filteredCerts: certArray,
}

const stateReducer = (state = initialState, action) =>{
    switch (action.type) {
        case SET_THEME:{
            return {
                ...state,
                theme: !state.theme
            };
        }

        case SET_CERT_IMG:{
            return {
                ...state,
                certImg: action.payload
            };
        }

        case SET_FILTERED_CERTS:{
            return {
                ...state,
                filteredCerts: action.payload
            };
        }

        default:
            return state;
    }
}

export default stateReducer;