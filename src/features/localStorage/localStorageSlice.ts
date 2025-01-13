import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidV4 } from "uuid";
import { getInitialValue } from "../../assets/ts/getInitialValue";

export type Note = Id & NoteData;

export type Id = {
  id: string;
};

export type NoteData = {
  title: string;
  body: string;
  tags: Tag[];
};

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  body: string;
  tagIds: string[];
};

export type Tag = {
  id: string;
  label: string;
};

export type LocalStorage = {
  notes: RawNote[];
  tags: Tag[];
};

const initialState: LocalStorage = {
  notes: getInitialValue<RawNote[]>("notes", []),
  tags: getInitialValue<Tag[]>("tags", []),
};

type Action<T> = {
  key: "notes" | "tags";
  value: T;
};

// // Slice definition
const localStorageSlice = createSlice({
  name: "localStorage",
  initialState,
  reducers: {
    updateNotes: (state, action: PayloadAction<Action<RawNoteData>>) => {
      const { key, value } = action.payload;
      localStorage.setItem(
        key,
        JSON.stringify([...state.notes, { ...value, id: uuidV4() }])
      );
      state.notes = getInitialValue<RawNote[]>("notes", []);
    },
    updateTags: (state, action: PayloadAction<Action<Tag>>) => {
      const { key, value } = action.payload;
      localStorage.setItem(key, JSON.stringify([...state.tags, value]));
      state.tags = getInitialValue<Tag[]>("tags", []);
    },
    deleteTags: (state, action: PayloadAction<Id>) => {
      const { id } = action.payload;
      localStorage.setItem(
        "tags",
        JSON.stringify(state.tags.filter((tag) => tag.id !== id))
      );
      state.tags = getInitialValue<Tag[]>("tags", []);
    },
    editTag: (state, action: PayloadAction<Tag>) => {
      const { id, label } = action.payload;
      localStorage.setItem(
        "tags",
        JSON.stringify(
          state.tags.map((tag) => (tag.id === id ? { ...tag, label } : tag))
        )
      );
      state.tags = getInitialValue<Tag[]>("tags", []);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const { id, tags, ...data } = action.payload;
      localStorage.setItem(
        "notes",
        JSON.stringify(
          state.notes.map((note) => {
            return note.id === id
              ? { ...note, ...data, tagIds: tags.map((tag) => tag.id) }
              : note;
          })
        )
      );
      state.notes = getInitialValue<RawNote[]>("notes", []);
    },
    deleteNote: (state, action: PayloadAction<Id>) => {
      const { id } = action.payload;
      localStorage.setItem(
        "notes",
        JSON.stringify(
          state.notes.filter((note) => {
            return note.id !== id;
          })
        )
      );
      state.notes = getInitialValue<RawNote[]>("notes", []);
    },
  },
});

export const {
  updateTags,
  deleteTags,
  editTag,
  updateNotes,
  updateNote,
  deleteNote,
} = localStorageSlice.actions;
export default localStorageSlice.reducer;

export type DeleteNote = typeof localStorageSlice.actions.deleteNote;
