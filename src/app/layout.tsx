import Head from 'next/head'
import './globals.css'

export const metadata = {
  title: 'FlopNote',
  description: 'p',
  google: "notranslate"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
      </Head>
      <body>{children}</body>
    </html>
  )
}
