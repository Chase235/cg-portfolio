import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme) {
                    document.documentElement.setAttribute('data-theme', JSON.parse(theme));
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
