import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
        <LeftSideBar />
        <div className="w-3/5 flex justify-center items-center">{children}</div>
        <RightSideBar />
      </body>
      {/* </AuthProvider> */}
    </html>
  );
}
