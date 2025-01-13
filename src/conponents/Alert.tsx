import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector, useNote } from "../app/hook";
import { deleteNote, Id } from "../features/localStorage/localStorageSlice";
import { setAlert } from "../features/display/displaySlice";

type AlertProps = {
  type: "deleteNote" | "editNote" | "createNote";
  data: Id;
  info: string;
};

export default function Alert({ type, data, info }: Partial<AlertProps>) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const note = useNote();
    const darkMode = useAppSelector((state) => state.display.darkMode);
  
  function handleConfirm() {
    switch (type) {
      case "editNote":
        dispatch(setAlert());
        navigate(`/${note.id}`);
        break;
      case "deleteNote":
        dispatch(setAlert());
        dispatch(deleteNote(data!));
        break;
      case "createNote":
        dispatch(setAlert());
        navigate("..");
        break;
    }
  }

  return (
    <div className={`${darkMode ? 'dark' : ''} fixed top-0 left-0 bottom-0 right-0 bg-modal flex justify-center items-center`}>
      <div className="dark flex flex-col min-w-80 rounded w-[75%] max-w-[36rem] bg-white shadow-lg p-4 gap-4 dark:bg-slate-950 dark:text-white">
        <span>Do you want to {info}?</span>
        <div className="flex flex-wrap justify-end items-center gap-2">
          <Link to={"/"}>
            <button
              type="submit"
              onClick={handleConfirm}
              className="py-2 px-4 border rounded-lg font-medium text-sm sm:text-base text-white bg-sky-500 border-sky-500 hover:bg-sky-700 transition ease-in-out duration-300"
            >
              Yes
            </button>
          </Link>
          <button
            type="button"
            onClick={() => dispatch(setAlert())}
            className="py-2 px-4 border border-red-500 rounded-lg font-medium text-sm sm:text-base text-red-500 hover:bg-red-500 hover:text-white transition ease-in-out duration-300"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
