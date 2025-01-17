import CreatableReactSelect from "react-select/creatable";
const { randomUUID } = globalThis.crypto;

import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { NoteData, Tag } from "../features/localStorage/localStorageSlice";
import { updateTags } from "../features/localStorage/localStorageSlice";
import { createPortal } from "react-dom";
import Alert from "./Alert";
import { setAlert } from "../features/display/displaySlice";
import { getCostumeStyles } from "../assets/style/reactSelect";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  type: "editNote" | "createNote";
  info: string;
} & Partial<NoteData>;

export default function NoteForm({
  onSubmit,
  title = "",
  tags = [],
  body = "",
  type,
  info,
}: NoteFormProps) {
  const dispatch = useAppDispatch();
  const alert = useAppSelector((state) => state.display.alert);
  const darkMode = useAppSelector((state) => state.display.darkMode);

  const navigate = useNavigate();

  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

  const avaibleTags = useAppSelector((state) => state.localStorage.tags);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      body: bodyRef.current!.value,
      tags: selectedTags,
    });

    navigate("..");
  }

  function handleCancle() {
    if (titleRef.current!.value !== title || bodyRef.current!.value !== body) {
      dispatch(setAlert());
      return;
    }
    navigate("..");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-grow grid grid-cols-2 grid-rows-[auto,auto,1fr,auto] sm:grid-rows-[auto,1fr,auto] gap-4"
    >
      <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
        <label className="font-medium text-xl" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          ref={titleRef}
          required
          defaultValue={title}
          className="outline-none border-2 rounded px-2 py-1 focus:border-sky-400 dark:bg-slate-800"
        />
      </div>
      <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
        <label className="font-medium text-xl" htmlFor="tags">
          Tags
        </label>
        <CreatableReactSelect
          onCreateOption={(label) => {
            const id = randomUUID();
            const newtag = { id, label };
            dispatch(
              updateTags({
                key: "tags",
                value: newtag,
              })
            );
          }}
          options={avaibleTags.map((tag) => {
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
          styles={getCostumeStyles(darkMode)}
        />
      </div>
      <div className="col-span-2 flex flex-col gap-2">
        <label className="font-medium text-xl" htmlFor="body">
          Body
        </label>
        <textarea
          name="body"
          id="body"
          ref={bodyRef}
          defaultValue={body}
          required
          className="outline-none w-full border-2 focus:border-sky-400 py-1 px-2 rounded h-full dark:bg-slate-800"
        ></textarea>
      </div>
      <div className="col-start-2 flex gap-2 justify-end">
        <button
          type="submit"
          className="py-2 px-4 border rounded-lg font-medium text-white bg-sky-500 border-sky-500 hover:bg-sky-700 transition ease-in-out duration-300"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleCancle}
          className="py-2 px-4 border rounded-lg font-medium text-slate-400 hover:bg-slate-400 hover:text-white transition ease-in-out duration-300"
        >
          Cancel
        </button>
      </div>
      {alert &&
        createPortal(<Alert type={type} info={`${info}"`} />, document.body)}
    </form>
  );
}
