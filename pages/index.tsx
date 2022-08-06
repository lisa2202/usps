import MobileDetect from "mobile-detect";
import type { NextPage } from "next";

const index: NextPage = () => {
  return <div  />;
};

export const getServerSideProps = ({ res, req }: { res: any; req: any }) => {
  const md = new MobileDetect(req?.headers[`user-agent`] as string);
  const isBot = md.is(`Bot`);
  if (isBot) {
    res.end(`Fuck off`);
    return {};
  }

  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};

// index.getInitialProps = ({ res, req, ...props }) => {
//   const md = new MobileDetect(req?.headers[`user-agent`] as string);
//   const isBot = md.is(`Bot`);
//   if (isBot) {
//     res?.end(`Fuck off`);
//     return {};
//   }

//   return {
//     ...props,
//   };
// };

export default index;
