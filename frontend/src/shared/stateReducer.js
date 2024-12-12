import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: "",
    certObject: {},
    filteredCerts: []
}

const certSlice = createSlice({
  name: 'cert',
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      return { ...state, token: action.payload };
    },
    setCertObject(state, action) {
      return { ...state, certObject: action.payload };
    },
    setFilteredCerts(state, action) {
      return { ...state, filteredCerts: action.payload };
    },
  },
});

export const { setCertObject, setFilteredCerts, setToken } = certSlice.actions;
export default certSlice.reducer;
