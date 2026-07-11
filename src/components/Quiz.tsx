import { useState } from 'react'
import { Diamond } from './Diamond'
import { DESTINATIONS, type DestKey } from '../lib/methods'

// 「30 秒找出你的質押方式」診斷器。誠實路由,不把所有人硬導去幣安。

type Answer = { label: string; hint?: string; next?: string; result?: DestKey }
type Step = { q: string; answers: Answer[] }

const STEPS: Record<string, Step> = {
  start: {
    q: '你現在的狀況是?',
    answers: [
      { label: '我還沒有 ETH / 加密貨幣', hint: '從零開始', result: 'binance' },
      { label: '我有 ETH,放在交易所', hint: '例如幣安', next: 'exchange' },
      { label: '我有 ETH,放在自己的錢包', hint: '冷錢包 / MetaMask', next: 'wallet' },
    ],
  },
  exchange: {
    q: '你比較想要?',
    answers: [
      { label: '最簡單、一鍵開始就好', hint: '不想搬幣', result: 'binance' },
      { label: '把幣提出來、自己掌控私鑰', hint: 'Not your keys, not your coins', result: 'lido' },
    ],
  },
  wallet: {
    q: '你比較想要?',
    answers: [
      { label: '方便、隨時能變現', hint: '低門檻、可再運用', result: 'lido' },
      { label: '完全自主 / 機構級規格', hint: '進階', next: 'advanced' },
    ],
  },
  advanced: {
    q: '你有 32 顆 ETH 以上嗎?',
    answers: [
      { label: '有,想要專人代管節點', hint: '保有提款金鑰', result: 'figment' },
      { label: '有,想完全自己跑', hint: '零抽成', result: 'solo' },
      { label: '沒有 32 顆', hint: '', result: 'lido' },
    ],
  },
}

export function Quiz() {
  const [stepId, setStepId] = useState('start')
  const [history, setHistory] = useState<string[]>([])
  const [result, setResult] = useState<DestKey | null>(null)
  const step = STEPS[stepId]

  function choose(a: Answer) {
    if (a.result) setResult(a.result)
    else if (a.next) {
      setHistory((h) => [...h, stepId])
      setStepId(a.next)
    }
  }
  function back() {
    const prev = history[history.length - 1]
    setHistory((h) => h.slice(0, -1))
    setStepId(prev)
  }
  function reset() {
    setResult(null)
    setStepId('start')
    setHistory([])
  }

  return (
    <section id="quiz" className="mx-auto max-w-5xl px-5 py-16 md:py-20">
      <h2 className="reveal font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
        不確定選哪個?<span className="text-eth">30 秒告訴你答案。</span>
      </h2>

      <div className="reveal mt-8">
        {result ? (
          <ResultCard result={result} onReset={reset} />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-[0_8px_30px_rgba(20,20,30,0.06)] md:grid md:grid-cols-[0.9fr_1.1fr]">
            {/* 左:問題 */}
            <div className="flex flex-col justify-between gap-6 border-b border-line bg-eth-soft/60 p-8 md:border-b-0 md:border-r">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-eth">
                <Diamond size={13} />
                第 {history.length + 1} 題
              </div>
              <h3 className="font-display text-2xl font-semibold leading-snug text-text md:text-3xl">
                {step.q}
              </h3>
              {history.length > 0 && (
                <button
                  onClick={back}
                  className="w-fit font-mono text-xs text-muted transition-colors hover:text-text"
                >
                  ← 上一題
                </button>
              )}
            </div>

            {/* 右:選項 */}
            <div className="flex flex-col justify-center gap-3 p-6 md:p-8">
              {step.answers.map((a) => (
                <button
                  key={a.label}
                  onClick={() => choose(a)}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-paper px-5 py-4 text-left transition-all hover:border-eth hover:bg-eth-soft/40"
                >
                  <span className="font-medium text-text">{a.label}</span>
                  <span className="text-eth transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function ResultCard({ result, onReset }: { result: DestKey; onReset: () => void }) {
  const m = DESTINATIONS[result]
  return (
    <div className="overflow-hidden rounded-2xl border border-eth bg-card shadow-[0_12px_40px_rgba(110,102,232,0.15)] md:grid md:grid-cols-[1fr_1fr]">
      <div className="bg-eth p-8 text-white md:p-10">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white/80">
          <Diamond size={14} />
          最適合你的起點
        </div>
        <div className="mt-3 font-display text-4xl font-semibold md:text-5xl">
          {m.name}
        </div>
        <p className="mt-3 text-white/85">{m.blurb}</p>
        {result === 'binance' && (
          <p className="mt-4 text-[11px] leading-relaxed text-white/60">
            WBETH 由幣安保管——最無腦,適合新手與已在幣安的人。堅持私鑰完全自管,選 Lido 或冷錢包更合適。
          </p>
        )}
      </div>

      <div className="p-8 md:p-10">
        <dl className="grid grid-cols-2 gap-4">
          {[
            ['門檻', m.min],
            ['資產保管', m.custody],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-faint">
                {k}
              </dt>
              <dd className="mt-1 text-text">{v}</dd>
            </div>
          ))}
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-wider text-yield">
              優點
            </dt>
            <dd className="mt-1 text-sm text-text">{m.pro}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-wider text-warn">
              要留意
            </dt>
            <dd className="mt-1 text-sm text-text">{m.con}</dd>
          </div>
        </dl>

        <div className="mt-7 flex flex-col gap-3">
          <a
            href={m.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 rounded-xl bg-eth px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-eth-2"
          >
            {m.ctaLabel} →
          </a>
          <button
            onClick={onReset}
            className="text-center font-mono text-xs text-muted transition-colors hover:text-text"
          >
            重新測一次
          </button>
        </div>
      </div>
    </div>
  )
}
