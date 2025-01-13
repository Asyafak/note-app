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
    <div className="h-screen p-4 flex flex-col gap-2">
      <h1 className="text-2xl font-semibold">New Note</h1>
      <NoteForm
        onSubmit={onSubmit}
        type="createNote"
        info="cancel to create Note"
      />
    </div>
  );
}
