import { useEffect } from 'react';
import { useRouter } from 'next/router';
import pageAuth from '../../middleware/pageAuthAccess';
// ----------------------------------------------------------------------

async function handler({ req }) {
  const user = req.session.user;
  return {
    props: { user: user },
  };
}

export const getServerSideProps = pageAuth(handler);

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname == '/dashboard') {
      router.push('/dashboard/home');
    }
  });

  return null;
}
