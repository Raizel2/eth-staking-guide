import { Link } from 'react-router-dom'
import { Diamond } from './Diamond'

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="rounded-xl border border-white/15 bg-white/5 p-6">
          <h3 className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-white/80">
            <span className="text-star">⚠</span> 免責聲明
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            本網站僅供教育用途，不構成任何投資、財務或法律建議。加密資產風險極高，價格劇烈波動，你可能損失全部本金。即時數據由第三方提供、僅供參考，請以各平台實際公告為準。做任何決定前，請自行研究（DYOR）。
          </p>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-6 text-sm text-white/70 md:flex-row md:items-center">
          <Link to="/" className="flex items-center gap-2">
            <Diamond size={16} />
            <span className="font-display text-white">ETH 質押入門</span>
          </Link>
          <div className="font-mono text-xs">
            製表：
            <a
              href="https://chainee.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-star underline decoration-dotted underline-offset-2 hover:text-gold-2"
            >
              鏈習生 Chainee
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
