import { Link } from "react-router-dom";
import Tags from "../conponents/Tags";
import ReactMarkdown from "react-markdown";
import { useAppDispatch, useAppSelector, useNote } from "../app/hook";
import Alert from "../conponents/Alert";
import { setAlert } from "../features/display/displaySlice";
import { createPortal } from "react-dom";

export default function Note() {
  const note = useNote();
  const alert = useAppSelector((state) => state.display.alert);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 justify-start pr-1">
          <h1 className="font-semibold text-lg sm:text-xl">{note.title}</h1>
          {note.tags.length > 0 && <Tags tags={note.tags} justify="start" />}
        </div>
        <div className="flex flex-wrap justify-end items-center gap-2">
          <Link to={`/${note.id}/edit`}>
            <button
              type="submit"
              className="py-2 px-4 border rounded-lg font-medium text-sm sm:text-base text-white bg-sky-500 border-sky-500 hover:bg-sky-700 transition ease-in-out duration-300"
            >
              Edit
            </button>
          </Link>
          <button
            type="button"
            onClick={() => dispatch(setAlert())}
            className="py-2 px-4 border border-red-500 rounded-lg font-medium text-sm sm:text-base text-red-500 hover:bg-red-500 hover:text-white transition ease-in-out duration-300"
          >
            Delete
          </button>
          <Link to={"/"}>
            <button
              type="button"
              className="py-2 px-4 border rounded-lg font-medium text-sm sm:text-base text-slate-400 hover:bg-slate-400 hover:text-white transition ease-in-out duration-300"
            >
              Back
            </button>
          </Link>
        </div>
      </div>
      <ReactMarkdown className="prose">{note.body}</ReactMarkdown>
      {alert &&
        createPortal(
          <Alert
            type={"deleteNote"}
            data={{ id: note.id }}
            info={`delete this note "${note.title}"`}
          />,
          document.body
        )}
    </div>
  );
}
