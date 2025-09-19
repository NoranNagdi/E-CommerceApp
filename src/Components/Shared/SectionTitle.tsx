import React from "react";

export default function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-15">
      <span className="font-semibold text-main-color ps-9 relative title">
        {title}
      </span>
      <h2 className="text-4xl font-semibold mt-5">{subtitle}</h2>
    </div>
  );
}
