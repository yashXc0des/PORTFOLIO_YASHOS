import "./globals.css";

export const metadata = {
  title: "YashOS",
  description: "Full Stack Engineer Terminal Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}