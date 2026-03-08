import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, Space_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--nf-inter",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--nf-space-grotesk",
  weight: ["300", "400", "500", "700"],
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--nf-jetbrains-mono",
  weight: ["400", "500", "700"],
  display: "swap",
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--nf-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

const fontVars = `${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${spaceMono.variable}`;

export const metadata: Metadata = {
  title: "Chase Gobble — Creative Director & Design Engineer",
  description:
    "Designer and creative director working across visual design, brand storytelling, product design, and engineering for early-stage AI product companies.",
  openGraph: {
    title: "Chase Gobble — Creative Director & Design Engineer",
    description:
      "Designer and creative director working across visual design, brand storytelling, product design, and engineering.",
    type: "website",
    url: "https://chasegobble.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVars} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t){try{t=JSON.parse(t)}catch(e){}document.documentElement.setAttribute('data-theme',t)}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
