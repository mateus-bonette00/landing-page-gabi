import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Gabi Xavier | Studio de Pilates e Fisioterapia",
  description: "Transforme seu corpo e sua saúde com o método Pilates. Curso online completo de exercícios de Pilates com acompanhamento profissional.",
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
