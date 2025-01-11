import { useAppDispatch, useNote } from "../app/hook";
import NoteForm from "../conponents/NoteForm";
import {
  NoteData,
  updateNote,
} from "../features/localStorage/localStorageSlice";

export default function EditNote() {
  const note = useNote();
  const dispatch = useAppDispatch();

  function onSubmit(data: NoteData): void {
    dispatch(
      updateNote({
        id: note.id,
        body: data.body,
        tags: data.tags,
        title: data.title,
      })
    );
  }
  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Edit Note</h1>
      <NoteForm
        onSubmit={onSubmit}
        info={`cancle to edit your note on "${note.title}"`}
        type="editNote"
        title={note.title}
        body={note.body}
        tags={note.tags}
      />
    </>
  );
}
