import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-canvas-mist relative z-10" style={{ backgroundColor: '#ffffffc4' }}>
      <div className="max-w-wide mx-auto px-6 md:px-12 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="text-ink font-semibold tracking-tight">
              Amplifier
            </Link>
            <p className="mt-2 text-ink-fog text-sm">
              Build AI Your Way.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-3">
            <Link href="/learn" className="text-ink-slate text-sm hover:text-ink transition-colors duration-200">
              Learn
            </Link>
            <Link href="/stories" className="text-ink-slate text-sm hover:text-ink transition-colors duration-200">
              Stories
            </Link>
            <Link href="https://github.com/microsoft/amplifier" className="text-ink-slate text-sm hover:text-ink transition-colors duration-200">
              GitHub
            </Link>
          </nav>
        </div>

        <div className="mt-12 pt-6 border-t border-canvas-mist text-center">
          <p className="text-micro text-ink-fog">
            Built with Amplifier &middot; Open Source
          </p>
        </div>
      </div>
    </footer>
  )
}
