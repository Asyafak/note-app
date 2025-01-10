import { useAppDispatch } from "../app/hook";
import NoteForm from "../conponents/NoteForm";
import {
  NoteData,
  updateNotes,
} from "../features/localStorage/localStorageSlice";

export default function NewNote() {
  const dispatch = useAppDispatch();

  function onSubmit(data: NoteData): void {
    dispatch(
      updateNotes({
        key: "notes",
        value: {
          title: data.title,
          body: data.body,
          tagIds: data.tags.map((tag) => tag.id),
        },
      })
    );
  }

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">New Note</h1>
      <NoteForm onSubmit={onSubmit} />
    </>
  );
}
