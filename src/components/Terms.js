import React, { useEffect, useState } from "react";
import policies from "./privacyPolicy.json";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { DeepMerge } from "../utils/DeepMerge";
export default function Terms() {
  const [policiesLocalize, setPoliciesLocalize] = useState(policies);
  const [searchParams] = useSearchParams();

  const projectName = searchParams.get("projectName");
  const languageName = searchParams.get("languageName");

  const { data: localization } = useFetch(
    "/Language/GetProjectLocalization/ENG_US/BrandingMartE-ShopTerms%26Conditions",
    "BrandingMartLanguage"
  );
  useEffect(() => {
    if (!localization) return;

    const localFormat = localization.replace(/ObjectId\("([^"]+)"\)/g, '"$1"');
    const dataObject = JSON.parse(localFormat);
    delete dataObject._id;

    const merged = DeepMerge(policies, dataObject);
    setPoliciesLocalize(merged);
  }, [localization]);
  console.log(projectName, languageName, fetch);

  const renderTextWithLinks = (text) => {
    const emailRegex = /\S+@\S+\.\S+/g;
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    let parts = text.split(/(\S+@\S+\.\S+|https?:\/\/[^\s]+)/g);

    return parts.map((part, index) => {
      if (emailRegex.test(part)) {
        return (
          <a
            key={index}
            href={`mailto:${part}`}
            className="text-blue-600 underline"
          >
            {part}
          </a>
        );
      } else if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {part}
          </a>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  };
  return (
    <div className="container mx-auto px-4 py-8">
      {/* loop over all policy sections */}
      {Object.keys(policiesLocalize).map((key, sectionIndex) => {
        const section = policiesLocalize[key];

        return (
          <div key={sectionIndex} className="mb-8">
            {/* Section Title */}
            <h2 className="text-3xl font-bold mb-4">{section.title}</h2>

            {/* Section Content */}
            {section.content.map((block, index) => {
              if (block.type === "subtitle") {
                return (
                  <h3 key={index} className="text-2xl font-bold mb-2">
                    {block.text}
                  </h3>
                );
              }
              if (block.type === "paragraph") {
                return (
                  <p key={index} className="mb-4">
                    {renderTextWithLinks(block.text)}
                  </p>
                );
              }
              if (block.type === "list") {
                return (
                  <ul key={index} className="list-disc pl-5 mb-4">
                    {block.items.map((item, i) => (
                      <li key={i}>{renderTextWithLinks(item)}</li>
                    ))}
                  </ul>
                );
              }
              return null;
            })}
          </div>
        );
      })}
    </div>
  );
}
