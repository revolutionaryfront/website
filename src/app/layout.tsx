import type { Metadata } from "next";
import { Bebas_Neue, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-title",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Revolutionary Front",
  description: "Revolutionary Socialist organization in North Texas",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${poppins.variable} min-h-full antialiased`}
    >
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body className="bg-background flex font-body h-dvh flex-col items-center">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
