import { ArticleShell } from '../components/ArticleShell'

export default function PathProtocol() {
  return (
    <ArticleShell
      kicker="路線 · 用協議或平台"
      title="交給協議或平台來質押"
      intro="不用 32 ETH、不用架機器。把質押交給 Lido、Rocket Pool 這類協議，或直接用交易所——任意金額、幾下完成，是大多數人的起點。"
      related={[
        { to: '/path/solo', label: '另一條路：自己跑節點' },
        { to: '/learn/pos', label: 'stETH、rETH 到底是什麼？' },
      ]}
    >
      <h2>這條路適合誰</h2>
      <p>
        如果你想<strong>用少少的錢先試</strong>、希望資金能
        <strong>隨時靈活運用</strong>，又不想碰指令列、顧伺服器，那這條路就是為你準備的。代價是：你把「維護節點」這件事外包出去，要承擔對方（協議或平台）的風險。
      </p>

      <h2>三種常見做法</h2>

      <h3>1. 流動性質押（Lido）</h3>
      <p>
        存入 ETH，拿到等值的{' '}
        <strong>stETH</strong>{' '}
        憑證，餘額會隨獎勵每天慢慢長大。最大、最多人用，stETH 幾乎到處都能再運用。缺點是高度集中、且完全依賴它的智能合約。
      </p>

      <h3>2. 去中心化流動性質押（Rocket Pool）</h3>
      <p>
        一樣存 ETH、拿到 <strong>rETH</strong> 憑證，但背後節點由社群營運者組成，較去中心化。rETH 的價格會相對 ETH 緩慢上升（不是靠餘額變多）。
      </p>

      <h3>3. 交易所質押（Binance、Coinbase 等）</h3>
      <p>
        最簡單：在你買幣的交易所裡點一下就開始。介面友善、門檻最低。但 ETH{' '}
        <strong>完全託管在平台</strong>——平台若凍結、倒閉，你可能拿不回來。
      </p>

      <div className="note">
        懶人優先序：只想體驗 → 交易所；想兼顧方便與自管 → 流動性質押；在意去中心化
        → Rocket Pool。
      </div>

      <h2>收益怎麼來</h2>
      <p>
        協議幫你跑節點、賺到共識與執行層獎勵，
        <strong>扣掉一筆服務費</strong>後分給你。所以協議的淨年化通常會
        <strong>比自跑節點略低一點</strong>，換來的是省事。實際數字以首頁的即時面板與各平台公告為準。
      </p>

      <h2>安全性與風險</h2>
      <ul>
        <li>
          <strong>智能合約風險：</strong>流動性質押靠合約運作，合約有漏洞就有風險（選經過長期審計、規模大的協議）。
        </li>
        <li>
          <strong>憑證脫鉤：</strong>stETH／rETH 在市場上的價格，可能短暫低於它對應的
          ETH。
        </li>
        <li>
          <strong>平台託管風險：</strong>用交易所等於把幣交給對方保管，請分散、別全壓。
        </li>
      </ul>

      <h2>怎麼開始</h2>
      <ul>
        <li>準備好一些 ETH（沒有的話先看「買進你的第一顆 ETH」）。</li>
        <li>選定做法：協議（需要錢包）或交易所（用既有帳號即可）。</li>
        <li>用<strong>很小的金額</strong>完整跑一次：存入 → 確認拿到憑證或看到質押紀錄。</li>
        <li>記下時間與金額，之後再決定要不要加碼。</li>
      </ul>

      <div className="callout">
        提醒：第一次務必小額測試。看懂整個流程、確認錢確實在動，再投入較大金額。
      </div>
    </ArticleShell>
  )
}
