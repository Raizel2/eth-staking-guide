import { Link } from 'react-router-dom'
import { useLive } from '../components/Layout'
import { useReveal } from '../lib/useReveal'
import { Diamond } from '../components/Diamond'
import { Calculator } from '../components/Calculator'
import { Quiz } from '../components/Quiz'
import { Eyebrow, StatCard, SourceLink } from '../components/ui'
import { fmtUSD, fmtPct, fmtMillions, fmtInt } from '../lib/format'
import { METHOD_GROUPS } from '../lib/methods'

/* ── Hero：收益區間 + 即時價格 ── */
function Hero() {
  const live = useLive()
  const range =
    live.aprLow != null && live.aprHigh != null
      ? `${live.aprLow.toFixed(1)}% ~ ${live.aprHigh.toFixed(1)}%`
      : '···'

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-eth-soft/50 via-paper to-paper text-text"
    >
      <div className="pointer-events-none absolute -right-32 -top-32 size-[480px] rounded-full bg-eth/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 size-[420px] rounded-full bg-eth-2/10 blur-[120px]" />

      <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-20 md:grid-cols-[1fr_0.9fr] md:py-28">
        <div>
          <div className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-eth">
            <span className="size-1.5 animate-pulse rounded-full bg-yield" />
            當前 ETH 質押收益率 (APY)
          </div>

          <h1 className="font-display text-6xl font-semibold leading-none tracking-tight tabular-nums text-ink md:text-8xl">
            {range}
            <span className="align-super text-2xl text-faint md:text-3xl">*</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
            質押是指將 ETH 存入驗證者節點，協助區塊驗證並賺取被動收益的操作。
            <span className="font-medium text-text">
              本站彙整鏈上實時數據、教學、與 0 基礎新手指南。
            </span>
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#methods"
              className="hero-primary rounded-lg bg-eth px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 hover:bg-eth-2"
            >
              我有哪些選擇 →
            </a>
            <a
              href="#learn"
              className="rounded-lg border border-line bg-card px-6 py-3 text-sm font-medium text-text transition-colors hover:border-eth hover:text-eth"
            >
              什麼是以太幣質押
            </a>
          </div>

          <p className="mt-6 font-mono text-[11px] leading-relaxed text-faint">
            * 實時浮動,資料源 <SourceLink name="DefiLlama" />、{' '}
            <SourceLink name="ultrasound.money" />。
          </p>
        </div>

        <div className="flex justify-center md:justify-end">
          <Diamond size={64} ring />
        </div>
      </div>
    </section>
  )
}

/* ── 兩道門 ── */
function MethodSpectrum() {
  const live = useLive()
  return (
    <section id="methods" className="mx-auto max-w-6xl px-5 py-20 md:py-24">
      <h2 className="reveal font-display text-3xl font-semibold leading-tight tracking-tight text-text md:text-4xl">
        三種最常見的質押方式
      </h2>

      <div className="reveal mt-10 grid gap-4 md:grid-cols-3">
        {METHOD_GROUPS.map((g) => {
          const accent = g.key === 'liquid'
          const apr = live[g.aprField]
          return (
            <div
              key={g.key}
              className={`flex flex-col rounded-2xl border p-6 ${
                accent ? 'border-eth bg-eth-soft/50' : 'border-line bg-card'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wider text-faint">
                  {g.tag}
                </span>
                <span
                  className="font-mono text-xs text-eth"
                  aria-label={`難度 ${g.difficulty}/4`}
                >
                  {'★'.repeat(g.difficulty)}
                  <span className="text-line">{'★'.repeat(4 - g.difficulty)}</span>
                </span>
              </div>

              <h3 className="mt-3 font-display text-xl font-semibold text-text">
                {g.title}
              </h3>
              <div className="mt-1 font-mono text-sm text-yield">
                實時年化 ~{apr != null ? apr.toFixed(2) + '%' : '—'}
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {g.oneLiner}
              </p>

              <Link
                to={g.article}
                className={`mt-5 flex items-center justify-center gap-1 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  accent
                    ? 'bg-eth text-white hover:bg-eth-2'
                    : 'border border-ink/15 text-text hover:border-eth hover:text-eth'
                }`}
              >
                {g.articleLabel} →
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ── 什麼是質押 + 三篇知識文章 ── */
function Learn() {
  const articles = [
    [
      '/learn/ethereum',
      '什麼是以太坊？',
      '在談質押之前，先搞懂你要質押的這條網路是什麼。',
    ],
    [
      '/learn/pos',
      'PoS 與各種質押工具',
      '權益證明怎麼運作？stETH、rETH 這些憑證又是什麼。',
    ],
    [
      '/learn/buy-eth',
      '買進你的第一顆 ETH',
      '從零開始：選平台、開戶、買幣、轉進錢包的完整流程。',
    ],
  ]
  return (
    <section id="learn" className="bg-eth-soft/30 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="reveal max-w-3xl">
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-text md:text-5xl">
            什麼是以太幣質押？
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            把 ETH
            鎖進以太坊的安全機制、幫忙確認交易，網路再發獎勵給你。它不像挖礦要拼電費與顯卡，靠的是「押上本金、誠實做事」。想從頭弄懂，從這三篇開始。
          </p>
        </div>

        <div className="reveal mt-10 grid gap-4 md:grid-cols-3">
          {articles.map(([to, title, desc]) => (
            <Link
              key={to}
              to={to}
              className="group rounded-xl border border-line bg-card p-6 transition-colors hover:border-eth"
            >
              <h3 className="font-display text-xl font-semibold text-text">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-eth transition-transform group-hover:translate-x-1">
                閱讀 →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── 即時數據儀表板（老手） ── */
function Dashboard() {
  const live = useLive()
  return (
    <section id="dashboard" className="mx-auto max-w-6xl px-5 py-20 md:py-24">
      <div className="reveal mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <Eyebrow>Live · 數據面板</Eyebrow>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
            此刻的質押網路
          </h2>
        </div>
        <p className="font-mono text-xs text-faint">
          {live.updatedAt
            ? `更新於 ${live.updatedAt.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}`
            : '讀取中…'}
        </p>
      </div>

      <div className="reveal grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="ETH 價格"
          value={fmtUSD(live.price)}
          sub={
            live.priceChange24h != null
              ? `近 24h ${live.priceChange24h >= 0 ? '+' : ''}${live.priceChange24h.toFixed(2)}%`
              : undefined
          }
          source="CoinGecko"
          loading={live.loading}
        />
        <StatCard
          label="全網質押量"
          value={fmtMillions(live.totalStaked) + ' ETH'}
          sub={
            live.stakingRatio != null
              ? `佔總供給 ${live.stakingRatio.toFixed(1)}%`
              : undefined
          }
          source="Rocket Pool"
          loading={live.loading}
        />
        <StatCard
          label="活躍驗證者"
          value={fmtInt(live.validators)}
          sub="個節點正在維護網路"
          source="Rocket Pool"
          loading={live.loading}
        />
        <StatCard
          label="共識基準 APR"
          value={fmtPct(live.beaconApr)}
          sub="不含執行層／MEV 的底層收益"
          source="Rocket Pool"
          loading={live.loading}
        />
        <StatCard
          label="自跑節點毛收益"
          value={fmtPct(live.soloApr)}
          sub={
            live.soloBreakdown
              ? `發行 ${live.soloBreakdown.issuance.toFixed(2)} + MEV ${live.soloBreakdown.mev.toFixed(2)} + 小費 ${live.soloBreakdown.tips.toFixed(2)}`
              : '無抽成、自備 32 ETH'
          }
          source="ultrasound.money"
          loading={live.loading}
        />
        <StatCard
          label="流動性質押區間"
          value={
            live.aprLow != null && live.aprHigh != null
              ? `${live.aprLow.toFixed(1)}–${live.aprHigh.toFixed(1)}%`
              : '—'
          }
          sub={`${live.protocols.length || ''} 家協議，最低～最高`}
          source="DefiLlama"
          loading={live.loading}
        />
      </div>

      <Leaderboard />
    </section>
  )
}

/* ── 協議 APR 即時排行榜 ── */
function Leaderboard() {
  const live = useLive()
  const top = live.aprHigh

  return (
    <div className="reveal mt-6 overflow-hidden rounded-2xl border border-line bg-card">
      <div className="flex flex-wrap items-end justify-between gap-2 border-b border-line px-6 py-5">
        <div>
          <h3 className="font-display text-xl font-semibold text-text">
            流動性質押協議 · APR 排行
          </h3>
          <p className="mt-1 text-sm text-muted">
            依「純質押收益」由高到低。額外獎勵來自再質押／代幣激勵，非 ETH
            質押本身。
          </p>
        </div>
        <span className="font-mono text-[11px] text-faint">
          來源 · <SourceLink name="DefiLlama" />
        </span>
      </div>

      {live.loading ? (
        <div className="px-6 py-10 text-center font-mono text-sm text-faint">
          讀取中…
        </div>
      ) : (
        <ul className="divide-y divide-line">
          {live.protocols.map((p, i) => (
            <li
              key={p.symbol}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-3.5"
            >
              <span
                className={`font-mono text-sm tabular-nums ${
                  i === 0 ? 'font-bold text-eth' : 'text-faint'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <div className="truncate font-medium text-text">{p.name}</div>
                <div className="font-mono text-xs text-faint">{p.symbol}</div>
              </div>
              <div className="flex items-center gap-2 text-right">
                {p.apyReward != null && p.apyReward > 0.01 && (
                  <span className="rounded-full bg-eth-soft px-2 py-0.5 font-mono text-[11px] text-eth">
                    +{p.apyReward.toFixed(2)}% 激勵
                  </span>
                )}
                <span
                  className={`font-mono text-lg font-semibold tabular-nums ${
                    p.apyBase === top ? 'text-yield' : 'text-text'
                  }`}
                >
                  {p.apyBase != null ? p.apyBase.toFixed(2) + '%' : '—'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Home() {
  useReveal()
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="reveal">
          <CalculatorWrap />
        </div>
      </section>
      <Learn />
      <MethodSpectrum />
      <Quiz />
      <Dashboard />
    </>
  )
}

function CalculatorWrap() {
  const live = useLive()
  return <Calculator live={live} />
}
