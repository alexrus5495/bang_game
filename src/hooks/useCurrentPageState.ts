import { useDispatch } from "react-redux";
import type { RootState } from "../store";
import { useAppSelector } from "./useAppSelector";
import { setCurrentPage as setCurrentPageAction } from "../store/slices/currentPageSlice";
import type { CurrentPage } from "../types";

export const useCurrentPageState = (): [
  string,
  (value: CurrentPage) => void,
] => {
  const currentPage = useAppSelector((state: RootState) => state.currentPage);
  const dispatch = useDispatch();

  const setCurrentPage = (value: CurrentPage) => {
    dispatch(setCurrentPageAction(value));
  };

  return [currentPage, setCurrentPage];
};
