import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Desafio Pilates 8 GX: Transformação em Casa | Gabi Xavier",
  description:
    "Desafio Pilates 8 GX: Transformação em Casa. Transforme seu corpo e sua saúde com o método Pilates da Gabi Xavier. Curso online completo com acompanhamento profissional.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Desafio Pilates 8 GX: Transformação em Casa | Gabi Xavier",
    description:
      "Transforme seu corpo e sua saúde com o método Pilates da Gabi Xavier. Curso online completo com acompanhamento profissional.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Desafio Pilates 8 GX: Transformação em Casa - Gabi Xavier",
      },
    ],
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Desafio Pilates 8 GX: Transformação em Casa | Gabi Xavier",
    description:
      "Transforme seu corpo e sua saúde com o método Pilates da Gabi Xavier. Curso online completo com acompanhamento profissional.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
