import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Diamond } from './Diamond'

type Related = { to: string; label: string }

// 深入頁／文章的共用外殼：深色標題區 + 內文 + 延伸閱讀。
export function ArticleShell({
  kicker,
  title,
  intro,
  children,
  related = [],
}: {
  kicker: string
  title: string
  intro: string
  children: ReactNode
  related?: Related[]
}) {
  // 換頁時回到頂端
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [title])

  return (
    <article>
      {/* 標題區 */}
      <header className="relative overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-eth/20 blur-[110px]" />
        <div className="mx-auto max-w-3xl px-5 py-16 md:py-20">
          <Link
            to="/"
            className="inline-flex items-center gap-1 font-mono text-xs text-white/55 transition-colors hover:text-white"
          >
            ← 回首頁
          </Link>
          <div className="mt-6 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-eth-2">
            <Diamond size={13} />
            {kicker}
          </div>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-white/70">{intro}</p>
        </div>
      </header>

      {/* 內文 */}
      <div className="mx-auto max-w-3xl px-5 py-14 md:py-16">
        <div className="prose">{children}</div>

        {related.length > 0 && (
          <nav className="mt-14 border-t border-line pt-8">
            <div className="font-mono text-xs uppercase tracking-wider text-faint">
              繼續看
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.to}
                  to={r.to}
                  className="group flex items-center justify-between rounded-xl border border-line bg-card px-5 py-4 transition-colors hover:border-eth"
                >
                  <span className="font-medium text-text">{r.label}</span>
                  <span className="text-eth transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </article>
  )
}
