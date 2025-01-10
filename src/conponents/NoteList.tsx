import ReactSelect from "react-select";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { useMemo, useState } from "react";
import { Tag } from "../features/localStorage/localStorageSlice";
import { Link } from "react-router-dom";
import Tags from "./Tags";
import { setModal } from "../features/display/displaySlice";

function NoteList() {
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.localStorage.tags);
  const notesWithTags = useAppSelector(
    (state) => state.notesWithTags.notesTags
  );

  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const filteredNotes = useMemo(() => {
    return notesWithTags.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [notesWithTags, selectedTags, title]);

  return (
    <div className="container flex flex-col gap-4">
      <div className="flex w-full justify-between">
        <h1 className="text-2xl font-semibold">Notes</h1>
        <div className="flex gap-2">
          <Link to={"/new"}>
            <button
              type="button"
              className="py-2 px-4 border rounded-lg font-medium text-white bg-sky-500 border-sky-500 hover:bg-sky-700 transition ease-in-out duration-300"
            >
              Create
            </button>
          </Link>
          <button
            type="button"
            onClick={() => dispatch(setModal())}
            className="py-2 px-4 border rounded-lg font-medium text-slate-400 hover:bg-slate-400 hover:text-white transition ease-in-out duration-300"
          >
            Edit Tags
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium text-xl" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              className="outline-none border-2 rounded px-2 py-1 focus:border-sky-400"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium text-xl" htmlFor="tags">
              Tags
            </label>
            <ReactSelect
              options={tags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              isMulti
              value={selectedTags.map((tag) => {
                return {
                  label: tag.label,
                  value: tag.id,
                };
              })}
              onChange={(tags) => {
                setSelectedTags(
                  tags.map((tag) => {
                    return { label: tag.label, id: tag.value };
                  })
                );
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-4 gap-4">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              tags={note.tags}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

type SimplifiedNote = {
  id: string;
  title: string;
  tags: Tag[];
};

function NoteCard({ id, title, tags }: SimplifiedNote) {
  return (
    <Link to={`/${id}`}>
      <button
        type="button"
        className="w-full items-center flex flex-col justify-center px-7 rounded shadow border h-48 gap-2 hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out"
      >
        <h2 className="font-medium text-xl">{title}</h2>
        <Tags tags={tags} justify="center" />
      </button>
    </Link>
  );
}

export default NoteList;
