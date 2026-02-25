import type { Metadata } from "next";
import 'antd/dist/reset.css';
import "./globals.css";
import ReactQueryProvider from "./components/common/ReactQueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <body>
          {children}
        </body>
      </ReactQueryProvider>
    </html>
  );
}
