import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DockDue — Recover detention claims",
  description: "Demo detention claim calculator and evidence workflow for small trucking fleets."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
