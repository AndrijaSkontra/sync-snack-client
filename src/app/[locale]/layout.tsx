import type { Metadata } from "next";
import "./../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Footer from "../components/footer/Footer";
import { Providers } from "../components/Providers";
import { cookies } from "next/headers";
import { ColorModeScript } from "@chakra-ui/react";
import { theme } from "@/commons/chakra-theme";

export const metadata: Metadata = {
  title: "SyncSnack",
  description: "Application built for easier orders between colleagues",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const cookieStore = cookies();
  const colorMode =
    cookieStore.get("chakra-ui-color-mode")?.value ||
    theme.config.initialColorMode ||
    "light";
  const isDarkMode = colorMode === "dark";

  return (
    <html lang={locale} className={isDarkMode ? "dark" : ""}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      </head>
      <body className="h-screen antialiased">
        <NextIntlClientProvider messages={await getMessages()}>
          <Providers>
            {children}
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
