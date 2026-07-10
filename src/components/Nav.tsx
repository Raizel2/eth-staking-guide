import { Link } from 'react-router-dom'
import { Diamond } from './Diamond'
import { fmtUSD } from '../lib/format'
import type { LiveData } from '../lib/useLiveData'

const LINKS = [
  ['試算', '/#calc'],
  ['診斷', '/#quiz'],
  ['方式', '/#methods'],
  ['數據', '/#dashboard'],
]

export function Nav({ live }: { live: LiveData }) {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-line/60 bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2 text-white">
          <Diamond size={20} />
          <span className="font-display text-lg font-semibold tracking-tight">
            ETH 質押入門
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm text-white/65 transition-colors hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="font-mono text-xs text-white/70">
          ETH{' '}
          <span className="text-white">
            {live.loading ? '···' : fmtUSD(live.price)}
          </span>
          {live.priceChange24h != null && (
            <span
              className={
                live.priceChange24h >= 0 ? 'ml-1 text-yield' : 'ml-1 text-warn'
              }
            >
              {live.priceChange24h >= 0 ? '▲' : '▼'}
              {Math.abs(live.priceChange24h).toFixed(1)}%
            </span>
          )}
        </div>
      </div>
    </header>
  )
}
