import { createSlice } from "@reduxjs/toolkit";

type display = {
  modal: boolean;
};

const initialState: display = {
  modal: false,
};

const displaySlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    setModal: (state) => {
      state.modal = !state.modal;
    },
  },
});

export const { setModal } = displaySlice.actions;
export default displaySlice.reducer;
