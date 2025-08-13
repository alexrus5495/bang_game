import type { RootState } from "../store";
import { useAppSelector } from "./useAppSelector";

export const useCurrentPageState = () => {
  return useAppSelector((state: RootState) => state.currentPage);
};
