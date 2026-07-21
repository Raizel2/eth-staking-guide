import { useParams, Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { ArticleShell } from '../components/ArticleShell'
import { DESTINATIONS, type DestKey } from '../lib/methods'

// 三種方式的說明文章。外部平台連結(幣安/Lido/Figment/以太坊官方)嵌在文章裡。

type Content = {
  kicker: string
  title: string
  intro: string
  body: ReactNode
  dests: DestKey[]
  related: { to: string; label: string }[]
}

const CONTENT: Record<string, Content> = {
  liquid: {
    kicker: '方式 · 流動性質押',
    title: '流動性質押',
    intro:
      '0 門檻、隨時變現,是最多人用的質押方式。存入 ETH 換一張「質押憑證」,它會替你賺質押收益,而你隨時能賣。',
    dests: ['binance', 'lido'],
    related: [
      { to: '/method/saas', label: '想保有金鑰?看 SaaS 質押' },
      { to: '/learn/steth-vs-wbeth', label: 'stETH、WBETH 到底是什麼?' },
    ],
    body: (
      <>
        <h2>它怎麼運作</h2>
        <p>
          你把 ETH 交給質押服務,它立刻給你一張等值的
          <strong>憑證代幣</strong>(例如 Lido 的 stETH、幣安的 WBETH)。這張憑證會隨質押收益慢慢增值,而且你
          <strong>隨時可以在市場上賣掉變現</strong>,不用等退出排隊,這就是「流動性」的意思。
        </p>
        <h2>兩種來源,本質都是流動性質押</h2>
        <p>
          市面上有上千種流動性質押管道。對你來說,差別主要在
          <strong>幣是誰保管</strong>:
        </p>
        <ul>
          <li>
            <strong>交易所(如幣安 WBETH):</strong>最無腦,在你買幣的地方一鍵完成,幣由平台保管。
          </li>
          <li>
            <strong>DeFi(如 Lido stETH):</strong>用你自己的錢包,私鑰自管,更去中心化。
          </li>
        </ul>
        <div className="note">
          收益都差不多(服務方通常抽約 10%)。新手想最快上手選交易所;在意「私鑰自管」選 DeFi。
        </div>
        <h2>要留意</h2>
        <ul>
          <li>用交易所 = 幣託管在平台,承擔平台風險。</li>
          <li>憑證(stETH/WBETH)市價極少數情況可能短暫低於 ETH。</li>
        </ul>
      </>
    ),
  },
  saas: {
    kicker: '方式 · SaaS 質押',
    title: 'SaaS 質押(質押即服務)',
    intro:
      '把跑節點的技術活外包給專業服務商,你出 32 ETH、保有自己的提款金鑰。介於「自己跑」與「流動性質押」之間。',
    dests: ['figment'],
    related: [
      { to: '/method/liquid', label: '不想湊 32 顆?看流動性質押' },
      { to: '/method/solo', label: '想完全自主?看自己跑節點' },
    ],
    body: (
      <>
        <h2>它怎麼運作</h2>
        <p>
          你提供 <strong>32 ETH 的倍數</strong>,服務商替你架設並維護專屬驗證者、負責出塊與在線;你
          <strong>保有提款金鑰</strong>(非託管),只需支付約 5% 的收益抽成。
        </p>
        <h2>適合誰</h2>
        <p>
          有 32 顆以上 ETH、想要
          <strong>機構級規格又不想碰技術</strong>、且在意「幣不交給別人保管」的人。灰度的以太坊
          ETF 就是用這類服務商在質押。
        </p>
        <div className="callout">
          兩個門檻:① 要 32 ETH 的倍數;② 進場尖峰要排隊(近期約需等待數十天才開始生息)。
        </div>
      </>
    ),
  },
  solo: {
    kicker: '方式 · 自己跑節點',
    title: '自己跑節點',
    intro:
      '押滿 32 ETH、自己架驗證節點。零抽成、收益全歸你、最去中心化;代價是技術與維運責任都在你身上。',
    dests: ['solo'],
    related: [
      { to: '/method/saas', label: '不想顧機器?看 SaaS 質押' },
      { to: '/learn/pos', label: '驗證者到底在做什麼?' },
    ],
    body: (
      <>
        <h2>你需要什麼</h2>
        <ul>
          <li>
            <strong>32 ETH:</strong>啟動一個驗證者的門檻。
          </li>
          <li>
            <strong>一台穩定的電腦 + 網路:</strong>要能 24 小時上線。
          </li>
          <li>
            <strong>一點學習意願:</strong>安裝執行層 + 共識層兩個客戶端並做好監控。
          </li>
        </ul>
        <h2>收益與風險</h2>
        <p>
          完整拿到共識、執行層手續費與 MEV,
          <strong>沒有任何抽成</strong>,長期年化通常最高。但作惡或重大失誤會被
          <strong>罰沒(slashing)</strong>,長期離線也會被扣分。
        </p>
        <div className="callout">
          最大的雷:同一把驗證者金鑰千萬別同時在兩台機器運行,這是觸發罰沒最常見的原因。
        </div>
        <p>官方的質押啟動器與客戶端清單,都在以太坊官網:</p>
      </>
    ),
  },
}

function DestCTA({ dests }: { dests: DestKey[] }) {
  return (
    <div className="not-prose my-8 space-y-3">
      <div className="font-mono text-xs uppercase tracking-wider text-faint">
        從這裡開始
      </div>
      {dests.map((dk, i) => {
        const d = DESTINATIONS[dk]
        const primary = i === 0
        return (
          <a
            key={dk}
            href={d.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-between gap-3 rounded-xl border p-5 shadow-card transition-all hover:-translate-y-0.5 ${
              primary
                ? 'border-gold/60 bg-[#fff6ea]'
                : 'border-line bg-card'
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-lg text-text">
                  {d.name}
                </span>
                <span className="rounded-full bg-ink/5 px-2 py-0.5 font-mono text-[11px] text-muted">
                  {d.tag}
                </span>
              </div>
              <div className="mt-1 text-sm text-muted">{d.ctaLabel}</div>
            </div>
            <span className={primary ? 'text-gold' : 'text-eth'}>→</span>
          </a>
        )
      })}
    </div>
  )
}

export default function MethodArticle() {
  const { key } = useParams()
  const c = key ? CONTENT[key] : undefined
  if (!c) return <Navigate to="/" replace />

  return (
    <ArticleShell
      kicker={c.kicker}
      title={c.title}
      intro={c.intro}
      related={c.related}
    >
      {c.body}
      <DestCTA dests={c.dests} />
    </ArticleShell>
  )
}
