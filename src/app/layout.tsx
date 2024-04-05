import React from "react";
import { getServerSession } from "next-auth";
import type { Metadata } from "next";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Provider from "./core/providers/client-providers";

export const metadata: Metadata = {
  title: "Codara",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider session={session}>{children}</Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
