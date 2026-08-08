import { useLocaleStore } from "..//localeStore";
const EMPTY_LOCALE: Record<string, string> = {};

export const useSystemLocalization = () => {
  const system = useLocaleStore((s) => s.localizationData?.system);
  return system ?? EMPTY_LOCALE;
};
