import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "bacaxnot/admin",
  description: "admin",
  applicationName: "admin",
};

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta name="viewport" content="width=device-width" />
      {/* icons */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icon/apple-touch-icon.png?v=2"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/icon/favicon-32x32.png?v=2"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/icon/favicon-16x16.png?v=2"
      />
      <link rel="manifest" href="/site.webmanifest?v=2" />
      <meta name="theme-color" content="#000000" />
      <link rel="shortcut icon" href="/icon/favicon.ico?v=2" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="msapplication-config" content="/browserconfig.xml?v=2" />
      <link
        rel="mask-icon"
        href="/icon/safari-pinned-tab.svg?v=2"
        color="#000000"
      />
      {/* icons */}
      <body
        className={cn(
          "min-h-[100dvh] standalone:touch-none standalone:px-2",
          robotoMono.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
