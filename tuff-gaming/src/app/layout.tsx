import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/layout/toastProvider";

export const metadata: Metadata = {
  title: "TUFF® Gaming Controllers",
  description:
    "Enthusiast grade gaming controllers designed for gamers, by gamers. Explore our range of personalized gamepads controllers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
