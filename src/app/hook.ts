import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useOutletContext } from "react-router-dom";
import { NotesWithTags } from "../features/notesWithTags/notesWithTagsSlice";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export function useNote() {
  return useOutletContext<NotesWithTags>();
}
