// 導流目的地(4 個 leaf,診斷器結果與 CTA 共用)+ 三大方式分組(顯示用)。
// 三大方式:自己跑節點 / SaaS 質押 / 流動性質押。
// 流動性質押底下再分:幣安 WBETH(CeFi,最無腦)與 Lido(DeFi,自管)。

// ⚠️ TODO: 換成你的幣安推薦連結(帶回饋 + 使用者省手續費)
export const BINANCE_REF_URL = 'https://accounts.binance.com/register?ref=XXXXXX'

export type DestKey = 'binance' | 'lido' | 'figment' | 'solo'

export type Dest = {
  key: DestKey
  name: string
  tag: string // 一句話標籤(CeFi/DeFi 等)
  custody: string
  min: string
  blurb: string
  pro: string
  con: string
  ctaLabel: string
  url: string
}

export const DESTINATIONS: Record<DestKey, Dest> = {
  binance: {
    key: 'binance',
    name: '幣安 WBETH',
    tag: 'CeFi · 交易所',
    custody: '託管(幣安保管)',
    min: '0 門檻',
    blurb: '本來就在幣安的話,買 WBETH 就開始生息——最無腦的一站。',
    pro: '最簡單、免錢包、免研究、隨時買賣',
    con: '幣託管在幣安(私鑰不在你手上)',
    ctaLabel: '由此註冊幣安 · 省 20% 手續費',
    url: BINANCE_REF_URL,
  },
  lido: {
    key: 'lido',
    name: 'Lido stETH',
    tag: 'DeFi · 自管',
    custody: '自管(你持有 stETH)',
    min: '0 門檻',
    blurb: '存 ETH 換 stETH,私鑰自己保管、隨時能變現。',
    pro: '自管、去中心化、可在 DeFi 再運用',
    con: '要會用錢包、自負助記詞保管',
    ctaLabel: '前往 Lido Finance',
    url: 'https://stake.lido.fi/',
  },
  figment: {
    key: 'figment',
    name: 'Figment',
    tag: 'SaaS · 機構級',
    custody: '非託管(自管提款金鑰)',
    min: '32 ETH 起',
    blurb: '專人替你跑節點,你保有提款金鑰。灰度 ETH ETF 的質押商。',
    pro: '機構級、非託管、免技術',
    con: '門檻 32 ETH、要註冊、進場需排隊',
    ctaLabel: '前往 Figment',
    url: 'https://www.figment.io/staking/stake-eth/',
  },
  solo: {
    key: 'solo',
    name: '自己跑節點',
    tag: '完全自主',
    custody: '完全自管',
    min: '32 ETH + 硬體',
    blurb: '自己架驗證節點,零抽成、最去中心化,但要技術與維運。',
    pro: '零抽成、完全自主、最貼近以太坊精神',
    con: '要 32 ETH、要顧機器、技術門檻高',
    ctaLabel: '以太坊官方質押指南',
    url: 'https://ethereum.org/zh-tw/staking/',
  },
}

// 三大方式(由進階到無腦,呼應影片鋪陳:直接 → SaaS → 流動性)
export type MethodGroup = {
  key: 'solo' | 'saas' | 'liquid'
  title: string
  tag: string
  difficulty: number // 1–4
  oneLiner: string
  aprField: 'soloApr' | 'saasApr' | 'liquidApr'
  article: string // 內部文章頁路由(按鈕連到這;外部平台連結嵌在文章裡)
  articleLabel: string
  dests: DestKey[] // 文章頁裡要嵌的外部平台連結
}

export const METHOD_GROUPS: MethodGroup[] = [
  {
    key: 'solo',
    title: '自己跑節點',
    tag: '完全自主 · 0 抽成',
    difficulty: 4,
    oneLiner: '自己架驗證節點,收益全歸你——但要 32 ETH、要技術與維運。',
    aprField: 'soloApr',
    article: '/method/solo',
    articleLabel: '了解自己跑節點',
    dests: ['solo'],
  },
  {
    key: 'saas',
    title: 'SaaS 質押',
    tag: '專人代管 · 保有金鑰',
    difficulty: 3,
    oneLiner: '節點交給專業服務商,你保有提款金鑰,但仍需 32 ETH。',
    aprField: 'saasApr',
    article: '/method/saas',
    articleLabel: '前往了解 SaaS 質押',
    dests: ['figment'],
  },
  {
    key: 'liquid',
    title: '流動性質押',
    tag: '0 門檻 · 最多人用',
    difficulty: 1,
    oneLiner: '0 門檻、隨時變現,是最多人用的方式。',
    aprField: 'liquidApr',
    article: '/method/liquid',
    articleLabel: '前往了解流動性質押',
    dests: ['binance', 'lido'],
  },
]
