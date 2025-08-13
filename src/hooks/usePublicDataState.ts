import type { RootState } from "../store";
import { useAppSelector } from "./useAppSelector";

export const usePublicDataState = () => {
  return useAppSelector((state: RootState) => state.publicData);
};
