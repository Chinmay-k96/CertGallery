export const SET_THEME = 'SET_THEME'
export const SET_CERT_OBJECT = 'SET_CERT_OBJECT'
export const SET_FILTERED_CERTS = 'SET_FILTERED_CERTS'

export const setTheme = (data) =>({
    type : SET_THEME,
    payload: data
}) 

export const setCertObject = (data) =>({
    type : SET_CERT_OBJECT,
    payload: data
})

export const setFilteredCerts = (data) =>({
    type : SET_FILTERED_CERTS,
    payload: data
})

const initialState = {
    theme : true,
    certObject: {},
    filteredCerts: []
}

const stateReducer = (state = initialState, action) =>{
    switch (action.type) {
        case SET_THEME:{
            return {
                ...state,
                theme: !state.theme
            };
        }

        case SET_CERT_OBJECT:{
            return {
                ...state,
                certObject: action.payload
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