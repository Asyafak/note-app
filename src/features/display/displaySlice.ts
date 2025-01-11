import { createSlice } from "@reduxjs/toolkit";

type display = {
  modal: boolean;
  alert: boolean;
};

const initialState: display = {
  modal: false,
  alert: false,
};

const displaySlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    setModal: (state) => {
      state.modal = !state.modal;
    },
    setAlert: (state) => {
      state.alert = !state.alert;
    },
  },
});

export const { setModal, setAlert } = displaySlice.actions;
export default displaySlice.reducer;
