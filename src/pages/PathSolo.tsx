import { ArticleShell } from '../components/ArticleShell'
import { useLive } from '../components/Layout'
import { fmtPct } from '../lib/format'

// 自跑節點當下毛收益（無抽成），即時拆解：發行 + MEV + 小費
function SoloYield() {
  const live = useLive()
  const b = live.soloBreakdown
  const rows: [string, number | null, string][] = [
    ['共識發行', b?.issuance ?? null, '網路發的新幣'],
    ['MEV', b?.mev ?? null, '區塊排序額外收入'],
    ['交易小費', b?.tips ?? null, '使用者付的優先費'],
  ]
  return (
    <div className="not-prose my-6 rounded-xl border border-line bg-card p-6">
      <div className="flex items-baseline justify-between">
        <div className="font-mono text-xs uppercase tracking-wider text-faint">
          自跑節點當下毛收益（無抽成）
        </div>
        <div className="font-mono text-[11px] text-faint">ultrasound.money</div>
      </div>
      <div className="mt-2 font-display text-4xl font-semibold text-yield">
        {live.loading ? '··' : fmtPct(live.soloApr)}
      </div>
      <dl className="mt-5 space-y-2 border-t border-line pt-4 font-mono text-sm">
        {rows.map(([label, val, note]) => (
          <div key={label} className="flex items-baseline justify-between gap-3">
            <dt className="text-muted">
              {label}
              <span className="ml-2 text-[11px] text-faint">{note}</span>
            </dt>
            <dd className="tabular-nums text-text">{fmtPct(val)}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-[11px] leading-relaxed text-faint">
        無協議抽成，三塊全歸你。但 MEV 與小費隨網路活動浮動、且「看運氣」——單一節點某段時間可能高於或低於這個平均。
      </p>
    </div>
  )
}

export default function PathSolo() {
  return (
    <ArticleShell
      kicker="路線 · 自己跑節點"
      title="自己跑一個驗證節點"
      intro="押滿 32 ETH、自己架設並維護驗證者。沒有中間人抽成，收益與掌控權最高，也最貼近以太坊去中心化的精神——代價是技術門檻與責任都在你身上。"
      related={[
        { to: '/path/protocol', label: '另一條路：交給協議或平台' },
        { to: '/learn/pos', label: '驗證者到底在做什麼？' },
      ]}
    >
      <h2>這條路適合誰</h2>
      <p>
        你<strong>有 32 顆 ETH</strong>、願意動手學一點技術、能讓一台機器穩定上線，並且重視
        <strong>完全自管、不被抽成、最大化去中心化</strong>
        ——那自跑節點會給你最純粹的質押體驗。
      </p>

      <h2>你需要什麼</h2>
      <ul>
        <li>
          <strong>32 ETH：</strong>啟動一個驗證者的固定門檻（不足 32 顆無法獨立質押）。
        </li>
        <li>
          <strong>一台穩定的電腦：</strong>建議 SSD 2TB 以上、16GB RAM、能 24 小時開機。
        </li>
        <li>
          <strong>穩定的網路與電力：</strong>長時間離線會被扣分，斷線越久扣越多。
        </li>
        <li>
          <strong>一點學習意願：</strong>安裝「執行層 + 共識層」兩個客戶端，並做好監控。
        </li>
      </ul>

      <h2>收益怎麼來</h2>
      <p>
        自跑節點會完整拿到三塊收益：
        <strong>共識層獎勵</strong>（發新幣）、<strong>執行層手續費</strong>、以及{' '}
        <strong>MEV（區塊排序的額外收入）</strong>。因為
        <strong>沒有中間人抽成</strong>，三塊全歸你。下面是當下的真實拆解：
      </p>

      <SoloYield />

      <h2>安全性與風險</h2>
      <ul>
        <li>
          <strong>罰沒（Slashing）：</strong>若你的節點做出互相矛盾的簽章（多半是設定錯誤、同一把鑰匙同時在兩處運行），會被網路扣掉 ETH 並強制退出。
        </li>
        <li>
          <strong>離線罰款：</strong>沒做到該做的見證，會被小額扣分。偶爾離線影響很小，長期離線才痛。
        </li>
        <li>
          <strong>維運責任：</strong>更新、備份、監控都得自己來——把它當成一台要長期照顧的小伺服器。
        </li>
      </ul>

      <div className="note">
        想要自跑的收益、又不想顧機器？可以考慮「質押即服務（SaaS）」：你保留鑰匙與
        32 ETH，節點交給服務商代管、付一筆月費。
      </div>

      <h2>怎麼開始</h2>
      <ul>
        <li>備好硬體，安裝一個<strong>執行層客戶端</strong>與一個<strong>共識層客戶端</strong>，等它們同步完成。</li>
        <li>用官方的<strong>質押啟動器</strong>產生驗證者金鑰，並<strong>離線備份助記詞</strong>。</li>
        <li>透過官方存款合約，存入 <strong>32 ETH</strong>。</li>
        <li>等待啟用排隊，上線後<strong>設定監控與警報</strong>，確保長期穩定在線。</li>
      </ul>

      <div className="callout">
        最大的雷：千萬不要讓同一把驗證者金鑰同時在兩台機器上運行——這是觸發罰沒最常見的原因。換機器要先確認舊的完全停止。
      </div>
    </ArticleShell>
  )
}
