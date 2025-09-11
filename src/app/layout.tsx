import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";

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
        {/* Fixed navbar that overlays content */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        
        {/* Main content with no padding for full-width slider */}
        <main className="min-h-screen">{children}</main>
        
        <Footer />
      </body>
    </html>
  );
}