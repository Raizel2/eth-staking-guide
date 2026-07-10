import type { ReactNode } from 'react'
import { Diamond } from './Diamond'

// 小標籤（eyebrow）：mono + 旋轉鑽石，深淺底兩種色
export function Eyebrow({
  children,
  tone = 'light',
}: {
  children: ReactNode
  tone?: 'light' | 'dark'
}) {
  return (
    <div
      className={`mb-4 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] ${
        tone === 'dark' ? 'text-eth-2' : 'text-eth'
      }`}
    >
      <Diamond size={13} />
      {children}
    </div>
  )
}

// 數據卡（儀表板用）
export function StatCard({
  label,
  value,
  sub,
  source,
  loading,
}: {
  label: string
  value: string
  sub?: string
  source?: string
  loading: boolean
}) {
  return (
    <div className="rounded-xl border border-line bg-card p-6 shadow-[0_1px_2px_rgba(20,20,30,0.04)]">
      <div className="font-mono text-xs uppercase tracking-wider text-faint">
        {label}
      </div>
      <div className="mt-3 font-mono text-3xl font-semibold tabular-nums text-text md:text-4xl">
        {loading ? <span className="text-faint">···</span> : value}
      </div>
      {sub && <div className="mt-1 text-sm text-muted">{sub}</div>}
      {source && (
        <div className="mt-4 border-t border-line pt-3 font-mono text-[11px] text-faint">
          來源 · {source}
        </div>
      )}
    </div>
  )
}
