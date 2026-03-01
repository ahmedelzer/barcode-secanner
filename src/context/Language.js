import React, { useState, createContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import staticLocalization from "./StaticLocalization.json";
import useFetch from "../hooks/useFetch";
import { DeepMerge } from "../utils/DeepMerge";
//context
export const LanguageContext = createContext();

const Language = ({ children }) => {
  const [localization, setLocalization] = useState(staticLocalization);
  const [searchParams] = useSearchParams();

  const projectName = searchParams.get("projectName");
  const languageName = searchParams.get("languageName") || "ENG_US";

  const { data: localizationReq } = useFetch(
    `/Language/GetProjectLocalization/${languageName}/BrandingMartE-ShopTerms%26Conditions`,
    "BrandingMartLanguage",
  );
  useEffect(() => {
    if (!localizationReq) return;

    const localFormat = localizationReq.replace(
      /ObjectId\("([^"]+)"\)/g,
      '"$1"',
    );
    const dataObject = JSON.parse(localFormat);
    delete dataObject._id;

    const merged = DeepMerge(staticLocalization, dataObject);
    setLocalization(merged);
  }, [localization]);
  return (
    <LanguageContext.Provider
      value={{
        localization,
        setLocalization,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default Language;
