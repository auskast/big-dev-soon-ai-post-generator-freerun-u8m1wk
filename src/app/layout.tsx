import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";

const poppinsRegular = Poppins({ subsets: ["latin"], weight: "400" });
const poppinsMedium = Poppins({ subsets: ["latin"], weight: "500" });
const poppinsSemibold = Poppins({ subsets: ["latin"], weight: "600" });

export const metadata: Metadata = {
  title: "BigDevSoon - AI Post Generator Project",
  other: {
    bds: "<bds />",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={[
          poppinsRegular.className,
          poppinsMedium.className,
          poppinsSemibold.className,
        ].join(" ")}
      >
        {children}
      </body>
    </html>
  );
}
