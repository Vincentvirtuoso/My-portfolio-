import React from "react";
import SectionTitle from "../common/SectionTitle";
import IconText from "./IconText";

const InfoSection = ({
  title,
  listContainerClass = "",
  list = [],
  listType = "icon-text",
  headerColor = "text-brand",
}) => {
  const isArray = Array.isArray(list);

  return (
    <section className="mb-6">
      <SectionTitle title={title} size="lg" color={headerColor} />

      {isArray && list.length > 0 ? (
        <div className={listContainerClass}>
          {list.map(({ icon, label, text }) =>
            listType === "icon-text" ? (
              <IconText
                key={label}
                icon={
                  typeof icon === "string"
                    ? `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-original.svg`
                    : icon
                }
                label={label || text}
              />
            ) : (
              <p key={label} className="">
                {label}
              </p>
            )
          )}
        </div>
      ) : (
        <div>{list || <p>No items available</p>}</div>
      )}
    </section>
  );
};

export default InfoSection;
