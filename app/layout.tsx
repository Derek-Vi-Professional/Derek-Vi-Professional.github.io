import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Derek Vieau | Software Systems & Tooling",
  description:
    "Portfolio of C#, Unity, Blender, and Aseprite development tools by Derek Vieau.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
