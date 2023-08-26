import Header from "@/components/shared/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/shared/Footer";
import LeftSideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar";
import AuthProvider from "@/context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PurelyBlog",
  description: "Blog application using NextJS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <AuthProvider> */}
      <body className={inter.className}>
        <Header />
        <main>
          <LeftSideBar />
          <div className="w-full flex justify-center items-center min-h-screen">
            {children}
          </div>
          <RightSideBar />
        </main>
        <Footer />
      </body>
      {/* </AuthProvider> */}
    </html>
  );
}
