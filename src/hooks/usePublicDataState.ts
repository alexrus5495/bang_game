import { useDispatch } from "react-redux";
import type { RootState } from "../store";
import { useAppSelector } from "./useAppSelector";
import type { PublicData } from "../types";
import { setPublicData as setPublicDataAction } from "../store/slices/publicDataSlice";

export const usePublicDataState = (): [
  PublicData | null,
  (data: PublicData) => void,
] => {
  const publicData = useAppSelector((state: RootState) => state.publicData);
  const dispatch = useDispatch();

  const setPublicData = (data: PublicData) =>
    dispatch(setPublicDataAction(data));
  return [publicData, setPublicData];
};
