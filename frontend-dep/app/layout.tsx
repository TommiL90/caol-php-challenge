import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Projeto Web Caol',
  description:
    'Aplicacao de análise do desempenho dos consultores de uma empresa. Ele oferece uma variedade de funcionalidades para acessar informações sobre os consultores, gerar relatórios, gráficos.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
