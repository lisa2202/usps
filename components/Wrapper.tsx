/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { HeaderAlt } from "./HeaderAlt";
import { Spinner } from "./Spinner";

interface WrapperProps {
  children?: React.ReactNode;
  altH?: boolean;
  hideBg?: boolean;
  loading?: boolean
}

export const Wrapper: React.FC<WrapperProps> = ({ children, altH, hideBg, loading }) => {
  const isDesktop = useMediaQuery("(min-width: 480px)");
  const bgImg = useRef(
    ["bg--01", "bg--02", "bg--03"][Math.round(Math.random() * 2)]
  );
  useEffect(() => {
    const body = document.querySelector(`body`);

    body?.setAttribute(`class`, `bodyWFFonts useWFFonts`);

    return () => {
      body?.removeAttribute(`class`);
    };
  }, []);

  return (
    <div className="viewport">
      {loading ?<div
        style={{
          position: "fixed",
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 101,
          background: "rgba(0, 0, 0, .4)",
        }}
      >
        <Spinner />
      </div>:null}
      <div
        style={{
          display: `flex`,
          flexFlow: `column nowrap`,
          flex: `1 1 auto`,
        }}
      >
        <div className="base__appWrapper___1z7Dj">
          <div className="visuallyHidden">
            Sign On to View Your Personal Accounts | Wells Fargo
          </div>
          <div
            className="Main__pageContainer___28fNw"
            style={{
              display: `flex`,
              flexFlow: `column nowrap`,
              flex: `1 1 auto`,
            }}
          >
            <div className="Page__swipeableContainer___3NFVH">
              <div
                style={{
                  display: `flex`,
                  flexFlow: `column nowrap`,
                  flex: `1 1 auto`,
                }}
              >
                <div
                  className="LifestyleImage__lifestyleImage___22v45"
                  style={{
                    display: hideBg || !isDesktop ? `none` : `block`,
                  }}
                >
                  <img src={`/images/${bgImg.current}.jpeg`} alt="Lifestyle" />
                </div>
                {altH ? <HeaderAlt /> : <Header />}
                <div className="Page__page____A8cG Page__useWFFonts___18j_Q Page__useAltMasthead___3xvnU Page__desktop___3k0uo">
                  <div
                    style={{
                      display: `flex`,
                      flexFlow: `column nowrap`,
                      flex: `1 1 auto`,
                      alignItems: `center`,
                    }}
                  >
                    <div
                      className="PageContent__content___3yKyO"
                      style={{
                        display: `flex`,
                        flexFlow: `column nowrap`,
                        flex: `1 1 auto`,
                        alignItems: `center`,
                        paddingTop: `60px`,
                      }}
                    >
                      <div
                        className="Guttered__guttered___3glPq Guttered__desktop___1S7rz"
                        style={{
                          display: `flex`,
                          flexFlow: `column nowrap`,
                          flex: `1 1 auto`,
                          alignItems: `stretch`,
                        }}
                      >
                        {children}
                      </div>
                    </div>
                  </div>
                </div>
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
