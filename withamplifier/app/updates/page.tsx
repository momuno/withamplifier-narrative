import Link from 'next/link'
import RevealOnScroll, { RevealStagger } from '@/components/RevealOnScroll'

// These would ideally be pulled from GitHub releases API
const updates = [
  {
    date: '2026-01-15',
    title: 'withamplifier.com launches',
    description: 'The new home for Amplifier documentation, examples, and community.',
    type: 'announcement',
  },
  {
    date: '2026-01-10',
    title: 'Design Intelligence bundle',
    description: 'New bundle for design system architecture, component design, and visual strategy.',
    type: 'feature',
    link: 'https://github.com/microsoft/amplifier',
  },
  {
    date: '2026-01-05',
    title: 'Recipe system improvements',
    description: 'Better context flow between steps, improved approval gates, resumability fixes.',
    type: 'improvement',
    link: 'https://github.com/microsoft/amplifier',
  },
]

const typeStyles = {
  announcement: 'bg-signal-soft text-signal',
  feature: 'bg-green-100 text-green-700',
  improvement: 'bg-blue-100 text-blue-700',
  fix: 'bg-orange-100 text-orange-700',
}

const typeLabels = {
  announcement: 'Announcement',
  feature: 'New Feature',
  improvement: 'Improvement',
  fix: 'Fix',
}

export default function UpdatesPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="section gradient-radial">
        <div className="container-reading">
          <RevealOnScroll>
            <h1 className="text-display text-ink">Updates</h1>
          </RevealOnScroll>
          
          <RevealOnScroll delay={100}>
            <p className="mt-6 text-body-lg text-ink-slate">
              What's new in Amplifier. Features, improvements, and announcements.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="https://github.com/microsoft/amplifier/releases"
                className="text-signal text-sm font-medium link-underline"
              >
                GitHub Releases →
              </Link>
              <span className="text-ink-fog">|</span>
              <Link
                href="https://github.com/microsoft/amplifier/discussions"
                className="text-signal text-sm font-medium link-underline"
              >
                Join the discussion →
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Updates list */}
      <section className="section border-t border-canvas-mist">
        <div className="container-reading">
          <RevealStagger className="space-y-8">
            {updates.map((update, index) => (
              <article 
                key={index}
                className="pb-8 border-b border-canvas-mist last:border-0"
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <time className="text-micro text-ink-fog">
                    {new Date(update.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span className={`px-2 py-0.5 text-micro font-medium rounded ${
                    typeStyles[update.type as keyof typeof typeStyles]
                  }`}>
                    {typeLabels[update.type as keyof typeof typeLabels]}
                  </span>
                </div>
                
                <h2 className="text-heading text-ink">{update.title}</h2>
                <p className="mt-2 text-ink-slate leading-relaxed">
                  {update.description}
                </p>
                
                {update.link && (
                  <Link
                    href={update.link}
                    className="mt-3 inline-block text-signal text-sm font-medium link-underline"
                  >
                    Learn more →
                  </Link>
                )}
              </article>
            ))}
          </RevealStagger>

          {/* More updates CTA */}
          <div className="mt-12 p-6 bg-canvas-stone rounded-gentle text-center">
            <p className="text-ink-slate">
              For the complete history, see{' '}
              <Link
                href="https://github.com/microsoft/amplifier/releases"
                className="text-signal link-underline"
              >
                GitHub Releases
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Subscribe/Follow */}
      <section className="section bg-canvas-stone">
        <div className="container-reading text-center">
          <RevealOnScroll>
            <h2 className="text-title text-ink">Stay updated</h2>
            <p className="mt-4 text-ink-slate">
              Watch the repository to get notified of new releases.
            </p>
            <div className="mt-8">
              <Link
                href="https://github.com/microsoft/amplifier"
                className="btn-primary"
              >
                Watch on GitHub
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  )
}
