import { usePublicDataStore } from "../publicDataStore";
import type { PublicData } from "../../types";

export const usePublicDataState = (): [
  PublicData | null,
  (data: PublicData) => void,
] => {
  const publicData = usePublicDataStore((s) => s.data);
  const setPublicData = usePublicDataStore((s) => s.setPublicData);

  return [publicData, setPublicData];
};
