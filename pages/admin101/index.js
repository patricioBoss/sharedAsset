import { useEffect } from 'react';
import { useRouter } from 'next/router';
// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname == '/admin101') {
      router.push('/admin101/home');
    }
  });

  return null;
}
