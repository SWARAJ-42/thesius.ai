import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "thesius.ai",
  description: "Don't research alone !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`bg-cover bg-center ${geistSans.variable} ${geistMono.variable} antialiased`}
          style={{
            backgroundSize: "100% 100%",
            backgroundPosition: "0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px",
            backgroundImage: `
            radial-gradient(49% 81% at 45% 47%, rgba(152, 0, 255, 0.27) 0%, rgba(7, 58, 255, 0) 100%),
            radial-gradient(113% 91% at 17% -2%, rgba(255, 255, 255, 1) 1%, rgba(255, 0, 0, 0) 99%),
            radial-gradient(142% 91% at 83% 7%, rgba(249, 220, 255, 1) 24%, rgba(255, 0, 0, 0) 99%),
            radial-gradient(142% 91% at -6% 74%, rgba(249, 220, 255, 1) 13%, rgba(255, 0, 0, 0) 99%),
            conic-gradient(from 60deg at 50% 50%, rgba(117, 126, 255, 1) 2%, rgba(255, 255, 255, 1) 100%)
          `,
            backgroundRepeat: "no-repeat",
          }}
        >
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
