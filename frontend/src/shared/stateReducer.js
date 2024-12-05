import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    certObject: {},
    filteredCerts: []
}

const certSlice = createSlice({
  name: 'cert',
  initialState: initialState,
  reducers: {
    setCertObject(state, action) {
      return { ...state, certObject: action.payload };
    },
    setFilteredCerts(state, action) {
      return { ...state, filteredCerts: action.payload };
    },
  },
});

export const { setCertObject, setFilteredCerts } = certSlice.actions;
export default certSlice.reducer;
