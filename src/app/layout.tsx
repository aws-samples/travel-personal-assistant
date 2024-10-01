import { AuthWrapper } from "@/components/AuthWrapper";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@aws-amplify/ui-react/styles.css";

const inter = Inter({ subsets: ["latin"] });



export const metadata: Metadata = {
  title: "Travel Personal Assistant",
  description: "Meet Your Personal Travel AI Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthWrapper>{children}</AuthWrapper>
      </body>
    </html>
  );
}