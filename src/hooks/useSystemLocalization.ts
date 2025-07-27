import { useAppSelector } from "../hooks/useAppSelector";
import { useMemo } from "react";
import type { RootState } from "../store/index";

export const useSystemLocalization = () => {
  const cardData = useAppSelector(
    (state: RootState) => state.locale.localizationData?.system,
  );

  return useMemo(() => {
    return cardData ? cardData : "fail";
  }, [cardData]);
};
