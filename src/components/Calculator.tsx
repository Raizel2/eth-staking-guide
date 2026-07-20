import { useState } from 'react'
import type { LiveData } from '../lib/useLiveData'
import { Eyebrow, SourceLink } from './ui'

// 質押試算器：左卡設定（方式 + 投入量），右卡顯示預估總額 + 成長曲線 + 期間分頁。
// 借鏡交易所 earn 頁的雙卡版面，但維持誠實教育立場：
//   • 用真實浮動 APR（非固定促銷利率）
//   • 沒有「立即投入」買鈕，改成導向教學頁
//   • 換算台幣 TWD（在台灣用），可切 USD

type Path = 'liquid' | 'saas' | 'solo'

const PERIODS = [1, 3, 5, 10] // 年

// 成長曲線：把 amount 以 apr 複利 years 年的價值畫成面積圖
function GrowthChart({
  amount,
  r,
  years,
}: {
  amount: number
  r: number
  years: number
}) {
  const W = 320
  const H = 130
  const PAD = 6
  const N = 48
  const total = amount * Math.pow(1 + r, years)
  const maxV = total > 0 ? total : 1

  const pts = Array.from({ length: N + 1 }, (_, i) => {
    const t = (i / N) * years
    const v = amount * Math.pow(1 + r, t)
    const x = (i / N) * W
    const y = H - (v / maxV) * (H - PAD)
    return [x, y] as const
  })

  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  const area = `${line} L${W} ${H} L0 ${H} Z`
  const baseY = H - (amount / maxV) * (H - PAD) // 本金水平線
  const [endX, endY] = pts[pts.length - 1]

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="h-32 w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="growth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-yield)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-yield)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* 本金基準（虛線） */}
      <line
        x1="0"
        y1={baseY}
        x2={W}
        y2={baseY}
        stroke="var(--color-eth)"
        strokeOpacity="0.35"
        strokeWidth="1"
        strokeDasharray="3 4"
      />
      <path d={area} fill="url(#growth)" />
      <path
        d={line}
        fill="none"
        stroke="var(--color-yield)"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={endX} cy={endY} r="3.5" fill="var(--color-yield)" />
    </svg>
  )
}

export function Calculator({ live }: { live: LiveData }) {
  const [amount, setAmount] = useState(10)
  const [years, setYears] = useState(5)
  const [path, setPath] = useState<Path>('liquid')
  // 自訂「未來 ETH 價格」:null = 跟隨當下實時價
  const [projPrice, setProjPrice] = useState<number | null>(null)

  // 三種方式,收益扣完各自手續費:自跑 > SaaS > 流動性
  const apr =
    path === 'solo'
      ? live.soloApr
      : path === 'saas'
        ? live.saasApr
        : live.liquidApr
  const r = apr != null ? apr / 100 : 0
  const total = amount * Math.pow(1 + r, years)
  const reward = total - amount

  // 換算美元用「未來價」(沒填就用當下實時價)
  const effPrice = projPrice ?? live.price
  const priceFieldVal = projPrice ?? (live.price ? Math.round(live.price) : '')
  const usingLivePrice = projPrice == null

  const toFiat = (eth: number) =>
    effPrice ? '$' + Math.round(eth * effPrice).toLocaleString('en-US') : '—'
  const ethStr = (eth: number) =>
    eth.toLocaleString('en-US', { maximumFractionDigits: 4 })

  const quick = [1, 5, 10, 32]
  const aprText = (a: number | null) => (a != null ? a.toFixed(2) + '%' : '—')

  return (
    <div id="calc">
      <div className="grid gap-5 md:grid-cols-2">
      {/* ── 左卡：設定 ── */}
      <div className="rounded-xl border border-line bg-card p-7 shadow-card md:p-8">
        <Eyebrow>以太坊質押試算</Eyebrow>

        {/* 投入方案 */}
        <label className="mt-2 block text-sm text-muted">投入方案</label>
        <div className="relative mt-2">
          <select
            value={path}
            onChange={(e) => setPath(e.target.value as Path)}
            className="w-full appearance-none rounded-xl border border-line bg-paper px-4 py-3.5 font-medium text-text outline-none transition-colors focus:border-eth"
          >
            <option value="liquid">
              流動性質押 · 實時年化 {aprText(live.liquidApr)}
            </option>
            <option value="saas">
              SaaS 質押 · 實時年化 {aprText(live.saasApr)}
            </option>
            <option value="solo">
              自己跑節點 · 實時年化 {aprText(live.soloApr)}
            </option>
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-faint">
            ▾
          </span>
        </div>

        {/* 投入量 */}
        <div className="mt-6 flex items-baseline justify-between">
          <label className="text-sm text-muted">預期投入數量</label>
          <span className="font-mono text-xs text-faint">ETH</span>
        </div>
        <input
          type="number"
          min={0}
          step={0.1}
          value={amount}
          onChange={(e) => setAmount(Math.max(0, +e.target.value))}
          className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3.5 text-right font-mono text-2xl font-semibold tabular-nums text-text outline-none transition-colors focus:border-eth"
          aria-label="投入 ETH 數量"
        />
        <input
          type="range"
          min={0.1}
          max={64}
          step={0.1}
          value={Math.min(amount, 64)}
          onChange={(e) => setAmount(+e.target.value)}
          className="mt-4 w-full accent-eth"
          aria-label="投入數量滑桿"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {quick.map((q) => (
            <button
              key={q}
              onClick={() => setAmount(q)}
              className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
                amount === q
                  ? 'border-eth bg-eth-soft text-eth'
                  : 'border-line text-muted hover:border-eth/40'
              }`}
            >
              {q} ETH
            </button>
          ))}
        </div>

        {/* 未來 ETH 價格(可自訂,預設當下實時價) */}
        <div className="mt-6 flex items-baseline justify-between">
          <label className="text-sm text-muted">
            {years} 年後 ETH 價格
          </label>
          <button
            onClick={() => setProjPrice(null)}
            className={`font-mono text-xs transition-colors ${
              usingLivePrice
                ? 'text-yield'
                : 'text-muted hover:text-eth'
            }`}
          >
            {usingLivePrice ? '● 當下實時價' : '↺ 用當下價'}
          </button>
        </div>
        <div className="mt-2 flex items-center rounded-xl border border-line bg-paper px-4 focus-within:border-eth">
          <span className="font-mono text-lg text-faint">$</span>
          <input
            type="number"
            min={0}
            value={priceFieldVal}
            onChange={(e) =>
              setProjPrice(e.target.value === '' ? null : Math.max(0, +e.target.value))
            }
            className="w-full bg-transparent px-2 py-3.5 text-right font-mono text-xl font-semibold tabular-nums text-text outline-none"
            aria-label="未來 ETH 價格（美元）"
          />
          <span className="font-mono text-xs text-faint">USD</span>
        </div>
        <p className="mt-1.5 font-mono text-[11px] text-faint">
          想估未來價值?改成你預期的 ETH 價格看看。
        </p>

        <a
          href="#methods"
          className="btn-blue mt-7 flex w-full items-center justify-center gap-1 rounded-[4px] px-6 py-3.5 text-sm font-bold"
        >
          怎麼開始?看三種方式 →
        </a>
      </div>

      {/* ── 右卡：結果 + 曲線 ── */}
      <div className="flex flex-col rounded-xl border border-line bg-eth-soft/50 p-7 text-text shadow-panel md:p-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-muted">
              {years} 年後預估總額
            </div>
            <div className="mt-2 font-display text-4xl font-semibold text-yield tabular-nums md:text-5xl">
              {live.loading ? '··' : ethStr(total)}{' '}
              <span className="text-2xl text-muted">ETH</span>
            </div>
            <div className="mt-1 font-mono text-sm text-muted">
              ≈ {toFiat(total)} USD
            </div>
          </div>
        </div>

        {/* 成長曲線 */}
        <div className="mt-6">
          <GrowthChart amount={amount} r={r} years={years} />
        </div>

        {/* 期間分頁 */}
        <div className="mt-4 grid grid-cols-4 gap-2">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setYears(p)}
              className={`rounded-[4px] py-2 font-mono text-sm transition-colors ${
                years === p
                  ? 'bg-eth text-white'
                  : 'bg-card text-muted hover:text-eth'
              }`}
            >
              {p} 年
            </button>
          ))}
        </div>

        {/* 明細 */}
        <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line font-mono text-sm">
          <div className="bg-card p-4">
            <dt className="text-xs text-faint">投入本金</dt>
            <dd className="mt-1 tabular-nums text-text">{ethStr(amount)} ETH</dd>
          </div>
          <div className="bg-card p-4">
            <dt className="text-xs text-faint">累積報酬</dt>
            <dd className="mt-1 tabular-nums text-yield">
              + {live.loading ? '··' : ethStr(reward)} ETH
            </dd>
          </div>
        </dl>

        <p className="mt-5 text-[11px] leading-relaxed text-faint">
          依目前 APR 複利推估，<strong className="text-muted">非保證</strong>
          ；APR 會隨參與人數浮動，未計手續費、稅與幣價變動。報酬以 ETH
          計；顆數變多，幣價下跌仍可能讓帳面縮水。
        </p>
      </div>
      </div>

      {/* 即時提示:讓觀眾知道數字是實時抓取、會變動的 */}
      <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center font-mono text-[11px] text-faint">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-1.5 animate-pulse rounded-full bg-yield" />
          即時計算
        </span>
        <span>· 每次載入更新{live.updatedAt ? ` · ${live.updatedAt.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}` : ''}</span>
        <span>
          · 來源 <SourceLink name="ultrasound.money" /> ·{' '}
          <SourceLink name="DefiLlama" /> · <SourceLink name="CoinGecko" />
        </span>
      </p>
    </div>
  )
}
