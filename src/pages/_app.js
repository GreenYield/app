import { PrivyProvider } from '@privy-io/react-auth';
import { useRouter } from 'next/router';
import '@/styles/globals.css'


export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <PrivyProvider appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''} onSuccess={() => router.push('/app/home')}>
        <main className="font-montserrat">
          <Component {...pageProps} />
        </main>
      </PrivyProvider>
    </>
  )
}
