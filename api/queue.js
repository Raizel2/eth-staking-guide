// Vercel serverless function:伺服器端抓 validatorqueue.com 的「進場排隊等待時間」
// (瀏覽器因 CORS 抓不到,且它是烤在 HTML 裡的靜態值)。前端呼叫 /api/queue。
// validatorqueue.com 是開源、公開數據,回應加快取,不頻繁打它。

export default async function handler(_req, res) {
  try {
    const r = await fetch('https://www.validatorqueue.com/', {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; eth-staking-guide)' },
    })
    const html = await r.text()
    const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ')
    // 取「Entry Queue ... Wait: 46 days, 18 hours」
    const m = text.match(
      /Entry Queue.*?Wait:\s*(\d+)\s*days?(?:,\s*(\d+)\s*hours?)?/i,
    )
    const days = m ? parseInt(m[1], 10) : null
    const hours = m && m[2] ? parseInt(m[2], 10) : 0

    // 快取:CDN 30 分鐘,背景再更新
    res.setHeader(
      'Cache-Control',
      's-maxage=1800, stale-while-revalidate=3600',
    )
    res.status(200).json({
      days,
      hours,
      label: days != null ? `${days} 天` : null,
      source: 'validatorqueue.com',
    })
  } catch {
    res.status(200).json({ days: null, hours: null, label: null })
  }
}
