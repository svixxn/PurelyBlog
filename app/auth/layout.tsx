import { Inter } from "next/font/google";
import "../globals.css";
import AuthProvider from "@/context/AuthProvider";

export const metadata = {
  title: "Authorization",
  description: "Authorization page",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <div className="w-full flex justify-center items-center min-h-screen">
            {children}
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
