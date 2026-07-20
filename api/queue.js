// Vercel serverless function:伺服器端抓 validatorqueue.com 的「進場排隊等待時間」
// (瀏覽器因 CORS 抓不到,且它是烤在 HTML 裡的靜態值)。前端呼叫 /api/queue。
// validatorqueue.com 是開源、公開數據,回應加快取,不頻繁打它。

export default async function handler(_req, res) {
  try {
    const r = await fetch('https://www.validatorqueue.com/', {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; eth-staking-guide)' },
      signal: AbortSignal.timeout(8000),
    })
    const html = await r.text()
    const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ')

    // 取「Entry Queue … Wait:」到下一個欄位之間的字串
    // 可能長相:「43 days, 10 hours」「5 hours」「0 minutes」
    const seg =
      text.match(/Entry Queue.*?Wait:\s*(.*?)\s*(?:Churn|Exit Queue|$)/i)?.[1] ?? ''
    const days = seg.match(/(\d+)\s*days?/i)
    const hours = seg.match(/(\d+)\s*hours?/i)
    const matched = /\d/.test(seg)

    const d = days ? parseInt(days[1], 10) : matched ? 0 : null
    const h = hours ? parseInt(hours[1], 10) : 0
    const label = d != null && d >= 1 ? `${d} 天` : matched ? '不到 1 天' : null

    // 快取:CDN 30 分鐘,背景再更新(失敗時不設,免得空結果被快取住)
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600')
    res.status(200).json({ days: d, hours: h, label, source: 'validatorqueue.com' })
  } catch {
    res.status(200).json({ days: null, hours: null, label: null })
  }
}
