import { Context, createContext, useContext, useEffect, useState } from "react";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { fetchNui } from "../utils/fetchNui";
import { debugData } from "../utils/debugData";

interface Locale {
  ui_heading: string;
  ui_back: string;
  ui_select: string;
  ui_text_speed: string;
  ui_text_fuel: string;
  ui_text_engine: string;
  ui_text_body: string;
  ui_plate: string;
  ui_specification: string;
  ui_take_out: string;
  ui_share_key: string;
  ui_iv_form_heading: string;
  ui_iv_heading: string;
  ui_iv_pay: string;
  ui_fine_text: string;
}

debugData(
  [
    {
      action: "setLocale",
      data: {
        ui_heading: "garage",
        ui_back: "Back",
        ui_select: "Select",
        ui_text_speed: "Speed",
        ui_text_fuel: "Fuel",
        ui_text_engine: "Engine Health",
        ui_text_body: "Body Health",
        ui_plate: "Plate",
        ui_specification: "Specification",
        ui_take_out: "Take Out",
        ui_share_key: "Share Key",
        ui_iv_form_heading: "Impound Form",
        ui_iv_heading: "Impound",
        ui_iv_pay: "Pay and Spawn the vehicle",
        ui_fine_text: "Fine",
      },
    },
  ],
  2000,
);

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locales: Locale) => void;
}

const LocaleCtx = createContext<LocaleContextValue | null>(null);

const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocale] = useState<Locale>({
    ui_heading: "",
    ui_back: "",
    ui_select: "",
    ui_text_speed: "",
    ui_text_fuel: "",
    ui_text_engine: "",
    ui_text_body: "",
    ui_plate: "",
    ui_specification: "",
    ui_take_out: "",
    ui_share_key: "",
    ui_iv_form_heading: "",
    ui_iv_heading: "",
    ui_iv_pay: "",
    ui_fine_text: "",
  });

  useEffect(() => {
    fetchNui("loadLocale");
  }, []);

  useNuiEvent("setLocale", async (data: Locale) => setLocale(data));

  return (
    <LocaleCtx.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleCtx.Provider>
  );
};

export default LocaleProvider;

export const useLocales = () =>
  useContext<LocaleContextValue>(LocaleCtx as Context<LocaleContextValue>);
