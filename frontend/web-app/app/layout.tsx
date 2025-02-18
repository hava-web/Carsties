import type { Metadata } from 'next';
import './globals.css';
import Navbar from './nav/Navbar';
import ToasterProvider from './providers/ToasterProvider';
import SignalIRProvider from './providers/SignalIRProvider';
import getCurrentUser from './actions/authAction';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  const notifyUrl = process.env.NOTIFY_URL;
  return (
    <html lang='en'>
      <body>
        <ToasterProvider />
        <Navbar />
        <main className='container mx-auto px-5 pt-5'>
          <SignalIRProvider user={user} notifyUrl={notifyUrl!}>{children} no</SignalIRProvider>
        </main>
      </body>
    </html>
  );
}
