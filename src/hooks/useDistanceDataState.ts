import type { RootState } from "../store";
import { useAppSelector } from "./useAppSelector";

export const useDistanceDataState = () => {
  return useAppSelector((state: RootState) => state.distanceData);
};
