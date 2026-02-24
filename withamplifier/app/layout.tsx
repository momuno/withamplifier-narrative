import './globals.css'
import '../styles/community-cards.css'
import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
// import AmplifierChat from '@/components/AmplifierChat' // Temporarily disabled
import { getGitHubStats } from '@/lib/github'

export const metadata: Metadata = {
  title: 'Amplifier',
  description: 'AI that\'s yours for the making.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch GitHub stats server-side, cached for 1 hour
  const githubStats = await getGitHubStats()
  
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Epilogue:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col bg-canvas text-ink antialiased">
        <Navigation stars={githubStats.stars} />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        {/* <AmplifierChat /> */}{/* Temporarily disabled */}
      </body>
    </html>
  )
}
