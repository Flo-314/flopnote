import "./globals.css";

export const metadata = {
  title: "FlopNote",
  description: "p",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
