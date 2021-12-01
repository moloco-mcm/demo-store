import type { NextPage, GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { res } = context;

  // delete session cookie
  res.setHeader(
    'Set-Cookie',
    `session=deleted; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/;`
  );

  return {
    redirect: {
      destination: '/',
      permanent: true,
    },
  };
};

const SignOut: NextPage = () => {
  return null;
};

export default SignOut;
