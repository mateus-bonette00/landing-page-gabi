import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Desafio Pilates 8 GX: Transformação em Casa | Gabi Xavier",
  description: "Desafio Pilates 8 GX: Transformação em Casa. Transforme seu corpo e sua saúde com o método Pilates da Gabi Xavier. Curso online completo com acompanhamento profissional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
