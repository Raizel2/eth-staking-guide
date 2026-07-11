import { Link } from 'react-router-dom'
import { Diamond } from './Diamond'

export function Footer() {
  return (
    <footer className="border-t border-line bg-eth-soft/20 text-text">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="rounded-xl border border-line bg-card p-6">
          <h3 className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-muted">
            <span className="text-warn">⚠</span> 免責聲明
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            本網站僅供教育用途，不構成任何投資、財務或法律建議。加密資產風險極高，價格劇烈波動，你可能損失全部本金。即時數據由第三方提供、僅供參考，請以各平台實際公告為準。做任何決定前，請自行研究（DYOR）。
          </p>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-sm text-muted md:flex-row md:items-center">
          <Link to="/" className="flex items-center gap-2">
            <Diamond size={16} />
            <span className="font-display font-semibold text-text">
              ETH 質押入門
            </span>
          </Link>
          <div className="font-mono text-xs">
            製表：
            <a
              href="https://chainee.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-eth underline decoration-dotted underline-offset-2 hover:text-eth-2"
            >
              鏈習生 Chainee
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
