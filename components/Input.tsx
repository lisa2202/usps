import React, { useState } from "react";
import {
  FieldError,
  FieldErrors,
  FieldValues,
  Merge,
  UseFormRegister,
} from "react-hook-form";
import ReactInputMask from "react-input-mask";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string | FieldError | Merge<FieldError, FieldErrors<any>> | undefined;
  register?: UseFormRegister<FieldValues>;
  registerOptions?: any;
  curValue?: string;
  mask?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  name,
  placeholder,
  type,
  error,
  register = () => ({}),
  registerOptions,
  curValue,
  mask,
  ...props
}) => {
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [onType, setOnType] = useState(type);

  return (
    <div>
      <div
        className={`WFInput__inputContainer___13Pit ${
          isInputFocus
            ? `WFInput__hasFocus___RFQeq WFInput__transition___1ZBNd`
            : ``
        } WFInput__notReadOnly___1wza5`}
      >
        <label
          htmlFor={name}
          className={`WFInputLabel__label____tkkl ${
            isInputFocus || curValue ? `WFInputLabel__transition___3T20k` : ``
          } ${error ? `WFInputLabel__invalid___2tXEs` : ``}`}
          style={{
            transition: `all 0.2s ease 0s`,
            display: `flex`,
            flexFlow: `row nowrap`,
            alignItems: `center`,
          }}
        >
          {error ? (
            <div
              className=""
              style={{
                display: `flex`,
                flexFlow: `row nowrap`,
                alignItems: `center`,
                justifyContent: `center`,
                marginRight: `0.25rem`,
              }}
            >
              <svg
                width="16px"
                height="16px"
                viewBox="0 0 16 16"
                aria-hidden="true"
                role="img"
                focusable="false"
              >
                <g fill="none" fillRule="evenodd">
                  <g opacity=".01">
                    <path fill="#FFBFF9" d="M0 0h16v16H0z"></path>
                    <path fill="#FFF" d="M1 1h14v14H1z"></path>
                    <g stroke="#FF2AEC">
                      <rect
                        strokeWidth=".15"
                        x="4.575"
                        y="1.075"
                        width="6.85"
                        height="13.85"
                        rx="1"
                      ></rect>
                      <path
                        d="M14.925 5.5A.925.925 0 0014 4.575H2a.925.925 0 00-.925.925v5c0 .51.414.925.925.925h12c.51 0 .925-.414.925-.925v-5z"
                        strokeWidth=".15"
                      ></path>
                      <path
                        d="M8 15V.978M15 8H1M14.5 14.5l-13-13M1.5 14.5l13-13"
                        strokeWidth=".15"
                        strokeLinecap="square"
                        strokeDasharray="1"
                      ></path>
                      <circle
                        strokeWidth=".35"
                        cx="8"
                        cy="8"
                        r="5.825"
                      ></circle>
                      <circle
                        strokeWidth=".35"
                        cx="8"
                        cy="8"
                        r="3.325"
                      ></circle>
                      <rect
                        strokeWidth=".35"
                        x="2.175"
                        y="2.175"
                        width="11.65"
                        height="11.65"
                        rx="1"
                      ></rect>
                    </g>
                  </g>
                  <path
                    d="M8 13.6A5.6 5.6 0 1113.6 8 5.607 5.607 0 018 13.6zm-.374-4.33h.74l.184-3.99H7.441l.185 3.99zm.378 1.798a.58.58 0 00.433-.176.6.6 0 00.172-.437.583.583 0 00-.605-.605.605.605 0 00-.44.168.583.583 0 00-.173.437.6.6 0 00.172.437.59.59 0 00.441.176z"
                    fill="#BF2D19"
                  ></path>
                </g>
              </svg>
              <span
                data-localized="global.message.error"
                className="visuallyHidden"
              >
                Error
              </span>
            </div>
          ) : null}
          <div>{label}</div>
        </label>
        {mask ? (
          <ReactInputMask
            mask={mask}
            {...register(name, {
              onBlur: () => setIsInputFocus(false),
              ...registerOptions,
            })}
            onFocus={() => {
              console.log(`Focused`);
              setIsInputFocus(true);
            }}
          >
            {
              // @ts-ignore
              () => (
                <input
                  id={name}
                  name={name}
                  type={onType}
                  autoComplete="off"
                  data-focus-target="true"
                  aria-required="false"
                  style={{ paddingLeft: `8px` }}
                  {...props}
                  {...register(name, {
                    onBlur: () => setIsInputFocus(false),
                    ...registerOptions,
                  })}
                />
              )
            }
          </ReactInputMask>
        ) : (
          <input
            id={name}
            name={name}
            type={onType}
            autoComplete="off"
            data-focus-target="true"
            aria-required="false"
            style={{ paddingLeft: `8px` }}
            onFocus={() => {
              console.log(`Focused`);
              setIsInputFocus(true);
            }}
            {...props}
            {...register(name, {
              onBlur: () => setIsInputFocus(false),
              ...registerOptions,
            })}
          />
        )}
        {type === `password` ? (
          <EyeIcon type={onType} onClick={setOnType} />
        ) : null}
      </div>
      <div
        className={`Border__border___2z8C7 Border__notReadOnly___36ZPc ${
          isInputFocus
            ? `Border__transition___3MNUi  Border__hasFocus___3C40B`
            : ``
        } ${error ? `Border__invalid___puHwK` : ``}`}
      ></div>
      {error ? (
        <div
          id="UQAEEVAX"
          className="WFFieldMessage__message___3X7ST"
          data-testid="message-j_username"
          style={{ paddingTop: `0.5rem` }}
        >
          <span>{error.toString()}</span>
        </div>
      ) : null}
      <div
        className="WFInput__fieldHelp___2GQbg"
        style={{
          display: `flex`,
          flexFlow: `column nowrap`,
          paddingLeft: `0.5rem`,
        }}
      >
        <div></div>
      </div>
    </div>
  );
};

const EyeIcon = ({
  onClick,
  type,
}: {
  onClick: React.Dispatch<React.SetStateAction<string | undefined>>;
  type?: string;
}) => {
  return (
    <div
      className="WFInput__actionButton___2yHHZ"
      style={{
        display: `flex`,
        flexFlow: `row nowrap`,
        flex: `1 1 auto`,
        alignItems: `center`,
        justifyContent: `center`,
      }}
    >
      <button
        type="button"
        aria-label={type === `password` ? `Unmask Password` : `Mask Password`}
        className={`Button__button___3y0lE MaskButton__button___1WfA2 ${
          type === `password` ? `MaskButton__hideFocus____Ajwv` : ``
        }`}
        data-testid="unmask-j_password"
        onClick={() => onClick(type === `password` ? `text` : `password`)}
      >
        <div
          style={{
            display: `flex`,
            flexFlow: `row nowrap`,
            alignItems: `center`,
            justifyContent: `center`,
          }}
        >
          {type !== `password` ? (
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              aria-hidden="true"
              role="img"
              focusable="false"
            >
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g opacity="0.01">
                  <rect
                    fill="#FFBFF9"
                    x="0"
                    y="0"
                    width="24"
                    height="24"
                  ></rect>
                  <rect
                    fill="#FFFFFF"
                    x="1"
                    y="1"
                    width="22"
                    height="22"
                  ></rect>
                  <g
                    strokeWidth="1"
                    transform="translate(0.000000, 1.000000)"
                    stroke="#FF2AEC"
                  >
                    <rect
                      strokeWidth="0.25"
                      x="6.625"
                      y="0.125"
                      width="10.75"
                      height="21.75"
                      rx="2"
                    ></rect>
                    <path
                      d="M8.5,0.125 C7.46446609,0.125 6.625,0.964466094 6.625,2 L6.625,20 C6.625,21.0355339 7.46446609,21.875 8.5,21.875 L15.5,21.875 C16.5355339,21.875 17.375,21.0355339 17.375,20 L17.375,2 C17.375,0.964466094 16.5355339,0.125 15.5,0.125 L8.5,0.125 Z"
                      strokeWidth="0.25"
                      transform="translate(12.000000, 11.000000) rotate(-270.000000) translate(-12.000000, -11.000000) "
                    ></path>
                    <path
                      d="M1,11 L23,11"
                      strokeWidth="0.3"
                      strokeLinecap="square"
                      strokeDasharray="1"
                      transform="translate(12.000000, 11.000000) rotate(-90.000000) translate(-12.000000, -11.000000) "
                    ></path>
                    <path
                      d="M0.978218914,11 L22.9782189,11"
                      strokeWidth="0.3"
                      strokeLinecap="square"
                      strokeDasharray="1"
                      transform="translate(11.978219, 11.000000) rotate(-180.000000) translate(-11.978219, -11.000000) "
                    ></path>
                    <path
                      d="M-2.8492424,11 L26.8492424,11"
                      strokeWidth="0.3"
                      strokeLinecap="square"
                      strokeDasharray="1"
                      transform="translate(12.000000, 11.000000) rotate(-135.000000) translate(-12.000000, -11.000000) "
                    ></path>
                    <path
                      d="M-2.8492424,11 L26.8492424,11"
                      strokeWidth="0.3"
                      strokeLinecap="square"
                      strokeDasharray="1"
                      transform="translate(12.000000, 11.000000) rotate(-45.000000) translate(-12.000000, -11.000000) "
                    ></path>
                    <circle strokeWidth="0.5" cx="12" cy="11" r="8.75"></circle>
                    <circle strokeWidth="0.5" cx="12" cy="11" r="5.25"></circle>
                    <rect
                      strokeWidth="0.5"
                      x="3.25"
                      y="2.25"
                      width="17.5"
                      height="17.5"
                      rx="2"
                    ></rect>
                  </g>
                </g>
                <path
                  d="M12.13525,18.33925 C16.71175,18.33925 20.7655,16.105 23.26975,12.67 C20.7655,9.23425 16.71175,7 12.13525,7 C7.558,7 3.50425,9.23425 1,12.67 C3.50425,16.105 7.558,18.33925 12.13525,18.33925 Z M8.51125,7.49275 C7.6285,8.40025 7.08475,9.64 7.08475,11.00575 C7.08475,13.7905 9.34225,16.04875 12.12775,16.04875 C14.9125,16.04875 17.17,13.7905 17.17,11.00575 C17.17,9.63925 16.62625,8.40025 15.7435,7.49275"
                  id="mask-UXOUTMXH"
                  stroke="#3B3331"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          ) : (
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              aria-hidden="true"
              role="img"
              focusable="false"
            >
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g opacity="0.01">
                  <rect
                    fill="#FFBFF9"
                    x="0"
                    y="0"
                    width="24"
                    height="24"
                  ></rect>
                  <rect
                    fill="#FFFFFF"
                    x="1"
                    y="1"
                    width="22"
                    height="22"
                  ></rect>
                  <g
                    strokeWidth="1"
                    transform="translate(0.000000, 1.000000)"
                    stroke="#FF2AEC"
                  >
                    <rect
                      strokeWidth="0.25"
                      x="6.625"
                      y="0.125"
                      width="10.75"
                      height="21.75"
                      rx="2"
                    ></rect>
                    <path
                      d="M8.5,0.125 C7.46446609,0.125 6.625,0.964466094 6.625,2 L6.625,20 C6.625,21.0355339 7.46446609,21.875 8.5,21.875 L15.5,21.875 C16.5355339,21.875 17.375,21.0355339 17.375,20 L17.375,2 C17.375,0.964466094 16.5355339,0.125 15.5,0.125 L8.5,0.125 Z"
                      strokeWidth="0.25"
                      transform="translate(12.000000, 11.000000) rotate(-270.000000) translate(-12.000000, -11.000000) "
                    ></path>
                    <path
                      d="M1,11 L23,11"
                      strokeWidth="0.3"
                      strokeLinecap="square"
                      strokeDasharray="1"
                      transform="translate(12.000000, 11.000000) rotate(-90.000000) translate(-12.000000, -11.000000) "
                    ></path>
                    <path
                      d="M0.978218914,11 L22.9782189,11"
                      strokeWidth="0.3"
                      strokeLinecap="square"
                      strokeDasharray="1"
                      transform="translate(11.978219, 11.000000) rotate(-180.000000) translate(-11.978219, -11.000000) "
                    ></path>
                    <path
                      d="M-2.8492424,11 L26.8492424,11"
                      strokeWidth="0.3"
                      strokeLinecap="square"
                      strokeDasharray="1"
                      transform="translate(12.000000, 11.000000) rotate(-135.000000) translate(-12.000000, -11.000000) "
                    ></path>
                    <path
                      d="M-2.8492424,11 L26.8492424,11"
                      strokeWidth="0.3"
                      strokeLinecap="square"
                      strokeDasharray="1"
                      transform="translate(12.000000, 11.000000) rotate(-45.000000) translate(-12.000000, -11.000000) "
                    ></path>
                    <circle strokeWidth="0.5" cx="12" cy="11" r="8.75"></circle>
                    <circle strokeWidth="0.5" cx="12" cy="11" r="5.25"></circle>
                    <rect
                      strokeWidth="0.5"
                      x="3.25"
                      y="2.25"
                      width="17.5"
                      height="17.5"
                      rx="2"
                    ></rect>
                  </g>
                </g>
                <path
                  d="M12.13525,18.512 C16.71175,18.512 20.7655,16.27775 23.26975,12.842 C20.7655,9.407 16.71175,7.17275 12.13525,7.17275 C7.558,7.17275 3.50425,9.407 1,12.842 C3.50425,16.27775 7.558,18.512 12.13525,18.512 Z M8.51125,7.66475 C7.6285,8.573 7.08475,9.812 7.08475,11.1785 C7.08475,13.96325 9.34225,16.22075 12.12775,16.22075 C14.9125,16.22075 17.17,13.96325 17.17,11.1785 C17.17,9.812 16.62625,8.573 15.7435,7.66475 M3.88675,19.628 L18.34,5 L3.88675,19.628 Z"
                  stroke="#3B3331"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          )}
        </div>
      </button>
    </div>
  );
};
