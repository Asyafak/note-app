import { Navigate, Outlet, useParams } from "react-router-dom";
import { useAppSelector } from "../app/hook";

export function NoteLayout() {
  const { id } = useParams();

  const notes = useAppSelector((state) => state.notesWithTags.notesTags);
  const note = notes.find((note) => note.id === id);

  if (note === null) return <Navigate to={"/"} replace />;

  return <Outlet context={note} />;
}
