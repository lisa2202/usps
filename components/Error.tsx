import React from "react";

interface ErrorProps {}

export const Error: React.FC<ErrorProps> = ({}) => {
  return (
    <div
      className="ErrorMessage__errorMessageContainer___2bbny ErrorMessage__desktop___2G-Ze"
      data-testid="errorMessage"
      role="alert"
    >
      <div
        className="WFMessage__wfMessage___38yE4"
        role="region"
        aria-label="Alerts and Notifications"
        style={{
          display: `flex`,
          flexFlow: `row nowrap`,
          flex: `1 1 auto`,
          alignItems: `stretch`,
        }}
      >
        <span className="visuallyHidden">
          <span data-localized="global.begin.region">Begin region</span>
        </span>
        <div
          className="WFMessage__iconContainer___zBXb4"
          style={{
            display: `flex`,
            flexFlow: `column nowrap`,
            alignItems: `center`,
            justifyContent: `flex-start`,
          }}
        >
          <span className="visuallyHidden">Error</span>
          <svg
            width="40px"
            height="40px"
            viewBox="0 0 40 40"
            aria-hidden="true"
            role="img"
            className="WFErrorIcon__alertIcon___2SYkM"
            focusable="false"
          >
            <path
              d="M20 34c-7.732 0-14-6.268-14-14S12.268 6 20 6s14 6.268 14 14c-.01 7.728-6.272 13.99-14 14zm-.934-10.824h1.848l.461-9.975h-2.771l.462 9.975zm.945 4.494c.434 0 .794-.147 1.081-.44.287-.295.43-.659.43-1.093 0-.448-.143-.812-.43-1.092-.287-.28-.647-.42-1.081-.42-.449 0-.816.14-1.103.42-.287.28-.43.644-.43 1.092 0 .434.143.798.43 1.092.287.294.654.441 1.102.441z"
              className="WFErrorIcon__fillColor___lw6qP"
            ></path>
          </svg>
        </div>
        <div
          className="WFMessage__contentContainer___R7vF0"
          style={{ display: `flex`, flexFlow: `column nowrap` }}
        >
          <div
            role="presentation"
            className="ContentEventWrapper__content___1Is72"
          >
            <div>
              <div className="ErrorMessage__errorMessageText___3b9lQ">
                <p>
                  {` That combination doesn't match our records. You can try again,
                  or we can help you`}{" "}
                  <a href="https://oam.wellsfargo.com/oamo/identity/help/passwordhelp">
                    create a new password{" "}
                  </a>{" "}
                  or{" "}
                  <a href="https://oam.wellsfargo.com/oamo/identity/help/usernamehelp">
                    find your username
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
