import '@/styles/globals.css'
import { PrivyProvider } from '@privy-io/react-auth';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <PrivyProvider appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''} onSuccess={() => router.push('/app/home')}>
        <Component {...pageProps} />
      </PrivyProvider>
    </>
  )
}
