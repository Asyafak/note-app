import { createSlice } from "@reduxjs/toolkit";
import { LocalStorage, Tag } from "../localStorage/localStorageSlice";
// import { RootState } from "@reduxjs/toolkit/query";
import { PayloadAction } from "@reduxjs/toolkit";

export type NotesWithTags = {
  tags: Tag[];
  id: string;
  title: string;
  body: string;
  tagIds: string[];
};

const notesTags: NotesWithTags[] = [
  {
    id: "",
    title: "",
    body: "",
    tags: [],
    tagIds: [],
  },
];

type InitialState = {
  notesTags: NotesWithTags[];
};

const initialState: InitialState = {
  notesTags,
};

const notesWithTagsSlice = createSlice({
  name: "notesWithTags",
  initialState,
  reducers: {
    updateNotesWithTags: (state, action: PayloadAction<LocalStorage>) => {
      const { notes, tags } = action.payload;
      state.notesTags = notes.map((note) => {
        return {
          ...note,
          tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
        };
      });
    },
  },
});

export const { updateNotesWithTags } = notesWithTagsSlice.actions;
export default notesWithTagsSlice.reducer;
