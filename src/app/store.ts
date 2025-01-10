import { configureStore } from "@reduxjs/toolkit";
import localStorageSlice from "../features/localStorage/localStorageSlice";
import notesWithTagsSlice from "../features/notesWithTags/notesWithTagsSlice";
import displaySlice from "../features/display/displaySlice";

const store = configureStore({
  reducer: {
    localStorage: localStorageSlice,
    notesWithTags: notesWithTagsSlice,
    display: displaySlice,
  },
});

// inter the 'RootState' and 'AppDispatch' type from the store itself
export type RootState = ReturnType<typeof store.getState>;

// interes type: reducers
export type AppDispatch = typeof store.dispatch;

export { store };
