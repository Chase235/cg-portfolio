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

const siteUrl = "https://chasegobble.com";
const title = "Chase Gobble — Creative Director & Design Engineer for AI Products";
const description =
  "Creative director and design engineer building brands and products for AI companies. Founding Partner at Clerestory Group. Previously nCino, W2O Group, Amazon. Specializing in brand design, product design, and design systems for early-stage AI startups.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Chase Gobble",
  },
  description,
  keywords: [
    "Chase Gobble",
    "creative director",
    "design engineer",
    "AI design",
    "AI product design",
    "brand design for AI",
    "product design for AI companies",
    "AI brand designer",
    "design systems",
    "AI-native design",
    "creative direction AI startups",
    "Clerestory Group",
    "design engineering",
    "brand storytelling",
    "visual design",
    "interaction design",
    "design operations",
    "AI UX design",
    "founding designer",
    "head of design AI",
  ],
  authors: [{ name: "Chase Gobble", url: siteUrl }],
  creator: "Chase Gobble",
  publisher: "Chase Gobble",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Chase Gobble",
    title,
    description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Chase Gobble — Creative Director & Design Engineer for AI Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here once you have it:
    // google: "your-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Chase Gobble",
    url: siteUrl,
    jobTitle: "Creative Director & Design Engineer",
    description:
      "Creative director and design engineer specializing in brand design, product design, and design systems for AI companies.",
    worksFor: {
      "@type": "Organization",
      name: "Clerestory Group",
      description: "AI-native design practice",
    },
    knowsAbout: [
      "Creative Direction",
      "Design Engineering",
      "AI Product Design",
      "Brand Design",
      "Design Systems",
      "Product Design",
      "Visual Design",
      "Interaction Design",
      "Design Operations",
      "AI-Native Workflows",
    ],
    alumniOf: [
      { "@type": "Organization", name: "nCino" },
      { "@type": "Organization", name: "W2O Group" },
      { "@type": "Organization", name: "Amazon" },
    ],
    sameAs: [
      "https://www.linkedin.com/in/chasegobble",
      "https://github.com/Chase235",
      "https://instagram.com/chase_gobble",
    ],
    image: `${siteUrl}/og-image.png`,
  };

  const professionalServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Chase Gobble — Creative Direction & Design Engineering",
    url: siteUrl,
    description:
      "Creative direction, brand design, and product design services for AI and technology companies.",
    provider: {
      "@type": "Person",
      name: "Chase Gobble",
    },
    areaServed: "Worldwide",
    serviceType: [
      "Creative Direction",
      "Brand Design",
      "Product Design",
      "Design Engineering",
      "Design Systems",
      "AI Product Design",
    ],
  };

  return (
    <html lang="en" className={fontVars} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t){try{t=JSON.parse(t)}catch(e){}document.documentElement.setAttribute('data-theme',t)}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
