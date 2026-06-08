import { useCurrentPageStore } from "../currentPageStore";
import type { CurrentPage } from "../../types";

export const useCurrentPageState = (): [
  string,
  (value: CurrentPage) => void,
] => {
  const currentPage = useCurrentPageStore((s) => s.page);
  const setCurrentPage = useCurrentPageStore((s) => s.setCurrentPage);

  return [currentPage, setCurrentPage];
};
