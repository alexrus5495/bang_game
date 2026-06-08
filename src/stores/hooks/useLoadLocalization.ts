import { useLocaleStore } from "..//localeStore";

export const useLoadLocalization = () => {
  return useLocaleStore((s) => s.loadLocalization);
};
