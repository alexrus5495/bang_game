import { useMemo } from "react";
import type { RootState } from "../store";
import { useAppSelector } from "./useAppSelector";

export const useCurrentPageState = () => {
  const currentPage = useAppSelector((state: RootState) => state.currentPage);

  return useMemo(() => {
    return currentPage ? currentPage : "fail";
  }, [currentPage]);
};
