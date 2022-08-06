import React from "react";

interface ContainerProps {
  children?: React.ReactNode;
  title?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, title }) => {
  return (
    <div
      className="Identification__desktop___2SaoW"
      style={{
        padding: `0.75rem`,
      }}
    >
      {title ? (
        <div className="Identification__centered___2hly-">
          <h1>
            <span data-localized="app.main.heading">{title}</span>
          </h1>
        </div>
      ) : null}
      <div className="WFSegmentedControl__container___1JK73 WFSegmentedControl__useWFFonts___2TZbt">
        <div className="Identification__formContainer___1BCdc">{children}</div>
      </div>
    </div>
  );
};
