import { Link } from 'react-router-dom'
import { Diamond } from './Diamond'
import { fmtUSD } from '../lib/format'
import type { LiveData } from '../lib/useLiveData'

const LINKS = [
  ['試算', '/#calc'],
  ['方式', '/#methods'],
  ['數據', '/#dashboard'],
]

export function Nav({ live }: { live: LiveData }) {
  return (
    <header className="sticky top-0 z-50 bg-ink/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2 text-white">
          <Diamond size={20} />
          <span className="font-display text-lg tracking-wide">
            ETH 質押入門
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm text-white/75 transition-colors hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="font-mono text-xs text-white/70">
            ETH{' '}
            <span className="text-white">
              {live.loading ? '···' : fmtUSD(live.price)}
            </span>
            {live.priceChange24h != null && (
              <span
                className={
                  live.priceChange24h >= 0
                    ? 'ml-1 text-[#7ee2a8]'
                    : 'ml-1 text-[#ffb4a2]'
                }
              >
                {live.priceChange24h >= 0 ? '▲' : '▼'}
                {Math.abs(live.priceChange24h).toFixed(1)}%
              </span>
            )}
          </div>
          <a
            href="/#calc"
            className="btn-orange hidden rounded-full px-4 py-1.5 text-xs font-bold sm:block"
          >
            免費試算
          </a>
        </div>
      </div>
    </header>
  )
}
