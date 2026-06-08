import { useLocaleStore } from "..//localeStore";

export const useSystemLocalization = () => {
  return useLocaleStore((s) => s.localizationData?.system ?? "fail");
};
