import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLive } from '../components/Layout'
import { useReveal } from '../lib/useReveal'
import { Diamond } from '../components/Diamond'
import { Calculator } from '../components/Calculator'
import { StatCard, SourceLink, Stars } from '../components/ui'
import { fmtUSD, fmtPct, fmtMillions, fmtInt } from '../lib/format'
import { METHOD_GROUPS } from '../lib/methods'

/* 進場滾動:數據到手後從 0 滾到實際值,~1 秒 ease-out。
   「親眼看到它算出來」是最強的實時感;reduced-motion 直接顯示終值。
   背景分頁 RAF 不會觸發 → 等分頁變可見那一刻才起跑,
   使用者第一眼永遠看到完整動畫(而不是卡在 ···)。 */
function useCountUp(
  target: number | null,
  replayKey = 0,
  dur = 1000,
): number | null {
  const [val, setVal] = useState<number | null>(null)
  useEffect(() => {
    if (target == null) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(target)
      return
    }
    let raf = 0
    const start = () => {
      const t0 = performance.now()
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / dur)
        const e = 1 - Math.pow(1 - p, 3)
        setVal(target * e)
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    const onVis = () => {
      if (!document.hidden) {
        document.removeEventListener('visibilitychange', onVis)
        start()
      }
    }
    if (document.hidden) document.addEventListener('visibilitychange', onVis)
    else start()
    return () => {
      document.removeEventListener('visibilitychange', onVis)
      cancelAnimationFrame(raf)
    }
  }, [target, replayKey, dur])
  return val
}

/* ── Hero：收益區間 + 即時價格 ── */
function Hero() {
  const live = useLive()
  // updatedAt 當 replayKey:手動刷新後即使 APR 沒變,也重播進場滾動
  const replay = live.updatedAt?.getTime() ?? 0
  const lo = useCountUp(live.aprLow, replay)
  const hi = useCountUp(live.aprHigh, replay)
  const range =
    lo != null && hi != null
      ? `${lo.toFixed(2)}% ~ ${hi.toFixed(2)}%`
      : '···'

  return (
    <section id="top" className="bg-hero-sky relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-24">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-ink/90 px-4 py-1.5 text-xs font-medium tracking-wider text-white">
            <span className="size-1.5 animate-pulse rounded-full bg-star" />
            ETH 質押收益率(APY)
          </div>

          <h1
            className="title-pop mt-6 text-6xl leading-tight tabular-nums md:text-[5.5rem] md:leading-[1.15]"
            data-text={range}
          >
            {range}
          </h1>

          <p className="mt-3 font-mono text-xs text-ink/70">
            <button
              onClick={live.refresh}
              title="按一下重新抓取最新數據"
              className="cursor-pointer rounded-[4px] px-1 py-0.5 transition-colors hover:bg-white/40 hover:text-ink"
            >
              ⟳ 更新於{' '}
              {live.updatedAt
                ? live.updatedAt.toLocaleTimeString('zh-TW', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : '--:--'}
            </button>{' '}
            · 來源 <SourceLink name="DefiLlama" />
          </p>

          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink/85">
            成為以太坊驗證者，免礦機、免耗電、持 ETH 賺 ETH 收益的複利魔法
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href="#methods"
              className="btn-orange rounded-[4px] px-7 py-3 text-[15px] font-bold transition-transform hover:-translate-y-0.5"
            >
              我有哪些選擇 →
            </a>
            <a
              href="#learn"
              className="rounded-[4px] bg-white px-7 py-3 text-[15px] font-bold text-eth shadow-card transition-transform hover:-translate-y-0.5"
            >
              什麼是以太幣質押
            </a>
          </div>
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
      <h2 className="reveal text-center font-display text-3xl tracking-wide text-eth md:text-4xl">
        三種最常見的質押方式
      </h2>
      <p className="reveal mt-3 text-center text-sm text-muted">
        星星越多,門檻與技術難度越高
      </p>

      <div className="reveal mt-10 grid gap-4 md:grid-cols-3">
        {METHOD_GROUPS.map((g) => {
          const apr = live[g.aprField]
          return (
            <div
              key={g.key}
              className="card-teal flex flex-col rounded-xl p-6 text-white shadow-panel"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-xl tracking-wide">
                  {g.title}
                </h3>
                <Stars n={g.difficulty} />
              </div>
              <div className="mt-1 font-mono text-sm text-[#7ee2a8]">
                實時年化 ~{apr != null ? apr.toFixed(2) + '%' : '—'}
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/85">
                {g.oneLiner}
              </p>

              <Link
                to={g.article}
                className="mt-5 flex items-center justify-center gap-1 rounded-[4px] bg-white px-4 py-3 text-sm font-bold text-eth transition-colors hover:bg-eth-soft"
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
    <section id="learn" className="bg-candles-light py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="reveal mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl leading-tight tracking-wide text-eth md:text-5xl">
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
              className="group rounded-xl bg-card p-6 shadow-card transition-transform hover:-translate-y-1"
            >
              <h3 className="font-display text-xl text-eth">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-eth transition-transform group-hover:translate-x-1">
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
          <h2 className="font-display text-3xl tracking-wide text-eth md:text-4xl">
            實時質押數據
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
          label="目前要排隊多久"
          value={live.queueLabel ?? '—'}
          sub="新存入的 ETH 進場等待時間"
          source="validatorqueue.com"
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
    <div className="reveal mt-6 overflow-hidden rounded-xl border border-line bg-card shadow-card">
      <div className="flex flex-wrap items-end justify-between gap-2 border-b border-line px-6 py-5">
        <div>
          <h3 className="font-display text-xl text-eth">
            各家流動性質押協議數據
          </h3>
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
                  i === 0 ? 'font-bold text-star' : 'text-faint'
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
      <Dashboard />
    </>
  )
}

function CalculatorWrap() {
  const live = useLive()
  return <Calculator live={live} />
}
