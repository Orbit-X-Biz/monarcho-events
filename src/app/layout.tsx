import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/common/NavBar";


export const metadata: Metadata = {
  title: "Monarcho Events",
  description: "Where moments take flight",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang="en">
      <body className={`font-[Poppins] h-full w-full`}>
        <Navbar />
        <main className="min-h-screen px-4 sm:px-4">{children}</main>

      </body>
    </html>
  );
}
