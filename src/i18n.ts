import type { BiologicEntityName } from "@bridg/api-ts";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/ru";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration, { type Duration } from "dayjs/plugin/duration";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ru from "./locales/ru.json";

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
// for Mantine date input
dayjs.extend(customParseFormat);

export const resources = { en, ru };

export const languages = Object.keys(resources);

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: languages,
    resources,
  })
  .catch(console.error);

// FIXME: handle null? See also https://github.com/yoursdearboy/bridg/issues/162
i18next.services.formatter!.add("dayjsDuration", (value: Duration, lng) => {
  return value.locale(lng!).humanize();
});

// FIXME: Add option for components orders
i18next.services.formatter!.add(
  "entityName",
  (
    en: BiologicEntityName | null,
    lng,
    { defaultValue }: { defaultValue: string }
  ) => {
    if (!en) return defaultValue;
    const parts = [en.family, en.given, en.middle || en.patronymic];
    const s = parts.filter((x) => x).join(" ");
    return s || defaultValue;
  }
);

export default i18next;
