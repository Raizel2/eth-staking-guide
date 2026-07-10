// 共用格式化工具

export const fmtUSD = (n: number | null, d = 0) =>
  n == null
    ? '—'
    : '$' + n.toLocaleString('en-US', { maximumFractionDigits: d })

export const fmtPct = (n: number | null, d = 2) =>
  n == null ? '—' : n.toFixed(d) + '%'

// 32_771_893 → "32.77M"
export const fmtMillions = (n: number | null, d = 2) =>
  n == null ? '—' : (n / 1_000_000).toFixed(d) + 'M'

// 973652 → "973,652"
export const fmtInt = (n: number | null) =>
  n == null ? '—' : Math.round(n).toLocaleString('en-US')

// 把 "32,771,893 ETH" 之類的字串抓成數字
export const parseNum = (v: unknown): number | null => {
  if (typeof v === 'number') return Number.isFinite(v) ? v : null
  if (typeof v === 'string') {
    const n = parseFloat(v.replace(/[^0-9.]/g, ''))
    return Number.isFinite(n) ? n : null
  }
  return null
}
