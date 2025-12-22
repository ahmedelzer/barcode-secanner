import React from "react";
import policies from "./privacyPolicy.json";
export default function Terms() {
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
      {Object.keys(policies).map((key, sectionIndex) => {
        const section = policies[key];

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
