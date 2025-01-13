import { createSlice } from "@reduxjs/toolkit";
import { getInitialValue } from "../../assets/ts/getInitialValue";

type display = {
  modal: boolean;
  alert: boolean;
  darkMode: boolean;
};

const initialState: display = {
  modal: false,
  alert: false,
  darkMode: getInitialValue<boolean>("darkMode", false)
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
    setDarkMode: (state) => {
      localStorage.setItem("darkMode", JSON.stringify(!state.darkMode));
      state.darkMode = getInitialValue<boolean>("darkMode", false);
    },
  },
});

export const { setModal, setAlert, setDarkMode } = displaySlice.actions;
export default displaySlice.reducer;
