import { useEffect, useState } from 'react'
import { parseNum } from './format'

// 即時資料，全部免金鑰、CORS 全開、可在瀏覽器直接 fetch：
//  • CoinGecko          → ETH 價格 + 24h
//  • Rocket Pool payload → 全網質押量 / 驗證者數 / ETH 供給 / 共識基準 APR
//  • ultrasound.money   → 自跑節點真實毛收益（發行 + MEV + 小費，無抽成）
//  • DefiLlama /chart    → 各大流動性質押協議當下 APR（每家一個輕量端點，~26KB）
//
// 頭條收益區間:下緣 = 流動性質押(毛收益扣 10% 服務費),
// 上緣 = max(自跑毛收益, 排行榜最高純質押 apyBase)——兩者都是真實數據,
// 站內排行榜就查得到,樂觀但誠實。排除再質押/代幣激勵。

// 各協議在 DefiLlama 的 pool id（用 /chart/{id} 取最新一筆）
const PROTOCOLS: { id: string; name: string; symbol: string }[] = [
  { id: '747c1d2a-c668-4682-b9f9-296708a3dd90', name: 'Lido', symbol: 'stETH' },
  { id: 'd4b3c522-6127-4b89-bedf-83641cdcd2eb', name: 'Rocket Pool', symbol: 'rETH' },
  { id: '46bd2bdf-6d92-4066-b482-e885ee172264', name: 'EtherFi', symbol: 'weETH' },
  { id: '0f45d730-b279-4629-8e11-ccb5cc3038b4', name: 'Coinbase', symbol: 'cbETH' },
  { id: '80b8bf92-b953-4c20-98ea-c9653ef2bb98', name: 'Binance', symbol: 'wbETH' },
  { id: '5b3aebb3-891d-47fc-92e2-927ada3d5b82', name: 'Frax', symbol: 'sfrxETH' },
  { id: '90bfb3c2-5d35-4959-a275-ba5085b08aa3', name: 'Stader', symbol: 'ETHx' },
  { id: '4d01599c-69ae-41a3-bae1-5fab896f04c8', name: 'StakeWise', symbol: 'osETH' },
  { id: 'b9f2f00a-ba96-4589-a171-dde979a23d87', name: 'Mantle', symbol: 'mETH' },
  { id: 'ca2acc2d-6246-44aa-ae91-8725b2c62c7c', name: 'Swell', symbol: 'swETH' },
  { id: '465d177e-3d0d-42c0-b5f5-31c857567135', name: 'Liquid Collective', symbol: 'lsETH' },
]

export type Protocol = {
  name: string
  symbol: string
  apy: number | null // 總 APR
  apyBase: number | null // 純質押收益
  apyReward: number | null // 額外獎勵（再質押/代幣激勵）
}

export type LiveData = {
  price: number | null
  priceChange24h: number | null

  protocols: Protocol[] // 依 apyBase 由高到低排序（排行榜用）

  // 三種方式的年化，全部從「毛收益」推導，扣掉各自手續費 →
  // 邏輯上一定是 自跑(0%) > SaaS(5%) > 流動性(10%)。
  soloApr: number | null // 自己跑節點：毛收益（0 抽成）
  saasApr: number | null // SaaS 質押：毛收益 ×(1−5%)
  liquidApr: number | null // 流動性質押：毛收益 ×(1−10%)
  soloBreakdown: { issuance: number; mev: number; tips: number } | null

  aprLow: number | null // Hero 區間下緣 = 流動性
  aprHigh: number | null // Hero 區間上緣 = 自跑

  totalStaked: number | null
  validators: number | null
  totalSupply: number | null
  stakingRatio: number | null
  beaconApr: number | null

  queueDays: number | null // 進場排隊要等幾天(validatorqueue,走 /api)
  queueLabel: string | null

  updatedAt: Date | null
  loading: boolean
}

const init: LiveData = {
  price: null,
  priceChange24h: null,
  protocols: [],
  soloApr: null,
  saasApr: null,
  liquidApr: null,
  soloBreakdown: null,
  aprLow: null,
  aprHigh: null,
  totalStaked: null,
  validators: null,
  totalSupply: null,
  stakingRatio: null,
  beaconApr: null,
  queueDays: null,
  queueLabel: null,
  updatedAt: null,
  loading: true,
}

async function getJSON(url: string) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return res.json()
}

async function fetchProtocol(p: (typeof PROTOCOLS)[number]): Promise<Protocol> {
  const j = await getJSON(`https://yields.llama.fi/chart/${p.id}`)
  const arr = j?.data
  const last = Array.isArray(arr) && arr.length ? arr[arr.length - 1] : null
  return {
    name: p.name,
    symbol: p.symbol,
    apy: last?.apy ?? null,
    apyBase: last?.apyBase ?? null,
    apyReward: last?.apyReward ?? null,
  }
}

export function useLiveData(): LiveData {
  const [data, setData] = useState<LiveData>(init)

  useEffect(() => {
    let alive = true

    async function load() {
      const results = await Promise.allSettled([
        getJSON(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true',
        ),
        getJSON('https://api.rocketpool.net/api/mainnet/payload'),
        getJSON('https://ultrasound.money/api/v2/fees/validator-rewards'),
        getJSON('https://ultrasound.money/api/v2/fees/eth-supply-parts'),
        getJSON('/api/queue'),
        ...PROTOCOLS.map(fetchProtocol),
      ])

      if (!alive) return

      const [priceR, rpR, soloR, supplyR, queueR, ...protoR] = results

      // 價格
      let price: number | null = null
      let priceChange24h: number | null = null
      if (priceR.status === 'fulfilled') {
        price = priceR.value?.ethereum?.usd ?? null
        priceChange24h = priceR.value?.ethereum?.usd_24h_change ?? null
      }

      // 驗證者數 / ETH 總供給 / 共識基準 APR：Rocket Pool payload
      let validators: number | null = null
      let totalSupply: number | null = null
      let beaconApr: number | null = null
      if (rpR.status === 'fulfilled') {
        const d = rpR.value
        validators = parseNum(d?.validators)
        totalSupply = parseNum(d?.ethTotalSupply)
        const beaconRaw = parseNum(d?.beaconChainAPR)
        beaconApr = beaconRaw != null ? beaconRaw * 100 : null
      }

      // 全網質押量：改用 ultrasound（信標鏈總餘額,Gwei→ETH,約 40M)。
      // RP payload 的 ethStaked 偏低(~32M),與 stakingRewards/ultrasound 不符,故棄用。
      let totalStaked: number | null = null
      if (supplyR.status === 'fulfilled') {
        const g = parseNum(supplyR.value?.beaconBalancesSum)
        totalStaked = g != null ? g / 1e9 : null
      }
      if (totalStaked == null && rpR.status === 'fulfilled') {
        totalStaked = parseNum(rpR.value?.ethStaked) // 退而求其次
      }
      const stakingRatio =
        totalStaked != null && totalSupply
          ? (totalStaked / totalSupply) * 100
          : null

      // 自跑節點毛收益（ultrasound：發行 + MEV + 小費，apr 是分數）
      let soloApr: number | null = null
      let soloBreakdown: LiveData['soloBreakdown'] = null
      if (soloR.status === 'fulfilled') {
        const d = soloR.value
        const iss = d?.issuance?.apr
        const mev = d?.mev?.apr
        const tips = d?.tips?.apr
        if (iss != null && mev != null && tips != null) {
          soloBreakdown = {
            issuance: iss * 100,
            mev: mev * 100,
            tips: tips * 100,
          }
          soloApr = (iss + mev + tips) * 100
        }
      }

      // 協議排行榜（純數據,保留全部含 Rocket Pool）
      const protocols = protoR
        .map((r) => (r.status === 'fulfilled' ? r.value : null))
        .filter((p): p is Protocol => p != null && p.apyBase != null)
        .sort((a, b) => (b.apyBase ?? 0) - (a.apyBase ?? 0))

      // 毛收益（自跑,0 抽成）：優先用 ultrasound;失敗就用主流協議中位數反推
      const bases = protocols
        .map((p) => p.apyBase)
        .filter((x): x is number => x != null)
        .sort((a, b) => a - b)
      const median = bases.length ? bases[Math.floor(bases.length / 2)] : null
      const gross = soloApr ?? (median != null ? median / 0.9 : null)

      // 三種方式：扣各自手續費 → 自跑 > SaaS > 流動性
      const saasApr = gross != null ? gross * 0.95 : null
      const liquidApr = gross != null ? gross * 0.9 : null

      // 進場排隊(走 /api/queue,本機 dev 無 serverless 會拿不到 → null)
      let queueDays: number | null = null
      let queueLabel: string | null = null
      if (queueR.status === 'fulfilled') {
        queueDays = queueR.value?.days ?? null
        queueLabel = queueR.value?.label ?? null
      }

      setData({
        price,
        priceChange24h,
        protocols,
        soloApr: gross,
        saasApr,
        liquidApr,
        soloBreakdown,
        aprLow: liquidApr, // 區間下緣 = 流動性(扣完服務費)
        // 區間上緣 = 自跑毛收益 vs 排行榜最高純質押年化,取大者(都是真實值)
        aprHigh:
          gross != null || bases.length
            ? Math.max(gross ?? 0, bases.length ? bases[bases.length - 1] : 0)
            : null,
        totalStaked,
        validators,
        totalSupply,
        stakingRatio,
        beaconApr,
        queueDays,
        queueLabel,
        updatedAt: new Date(),
        loading: false,
      })
    }

    load()
    return () => {
      alive = false
    }
  }, [])

  return data
}
