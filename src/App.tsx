import { CgClose } from "react-icons/cg";
import { Routes, Route, Navigate } from "react-router-dom";
import NewNote from "./pages/NewNote";
import NoteList from "./conponents/NoteList";
import { useAppDispatch, useAppSelector } from "./app/hook";
import { useEffect } from "react";
import { updateNotesWithTags } from "./features/notesWithTags/notesWithTagsSlice";
import { NoteLayout } from "./pages/NoteLayout";
import Note from "./pages/Note";
import EditNote from "./pages/EditNote";
import { deleteTags, editTag } from "./features/localStorage/localStorageSlice";
import { setModal } from "./features/display/displaySlice";

export default function App() {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.localStorage.notes);
  const tags = useAppSelector((state) => state.localStorage.tags);
  const modal = useAppSelector((state) => state.display.modal);

  useEffect(() => {
    dispatch(updateNotesWithTags({ notes, tags }));
  }, [notes, tags, dispatch]);

  return (
    <>
      <div className="container p-4">
        <Routes>
          <Route path="/" element={<NoteList />} />
          <Route path="/new" element={<NewNote />} />
          <Route path="/:id" element={<NoteLayout />}>
            <Route index element={<Note />} />
            <Route path="edit" element={<EditNote />} />
          </Route>
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </div>
      {modal && <ModalTags />}
    </>
  );
}

function ModalTags() {
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.localStorage.tags);

  return (
    <div className="fixed flex justify-center items-start top-0 left-0 h-screen w-screen bg-modal p-4">
      <div className="flex flex-col p-4 rounded-lg w-full max-w-[36rem] bg-white gap-4">
        <div className="flex justify-between items-center pb-2 border-b">
          <h1 className="font-medium text-2xl px-2">Edit Tags</h1>
          <button
            type="button"
            onClick={() => dispatch(setModal())}
            className="px-2 text-xl hover:text-red-500"
          >
            <CgClose />
          </button>
        </div>
        <ul className="flex flex-col gap-2 w-full">
          {tags.map((tag) => (
            <li key={tag.id} className="flex gap-1 w-full">
              <input
                type="text"
                name="tags"
                value={tag.label}
                onChange={(e) =>
                  dispatch(editTag({ id: tag.id, label: e.target.value }))
                }
                className="outline-none border-2 rounded px-2 py-1 focus:border-sky-400 w-full"
              />
              <button
                type="button"
                onClick={() => dispatch(deleteTags({ id: tag.id }))}
                className="flex justify-center items-center w-9 h-9 border-2 rounded hover:text-red-500 hover:bg-red-100"
              >
                <CgClose />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
