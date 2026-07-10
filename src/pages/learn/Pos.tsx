import { ArticleShell } from '../../components/ArticleShell'

export default function Pos() {
  return (
    <ArticleShell
      kicker="新手知識 · 02"
      title="PoS 與各種質押工具"
      intro="權益證明（PoS）是以太坊維護安全的方式，也是質押收益的源頭。搞懂它，就懂了 stETH、rETH 這些憑證到底是什麼。"
      related={[
        { to: '/learn/buy-eth', label: '下一篇：買進你的第一顆 ETH' },
        { to: '/path/protocol', label: '挑一條路開始質押' },
      ]}
    >
      <h2>從「挖礦」到「質押」</h2>
      <p>
        以太坊在 2022 年完成了一次大升級（俗稱 The
        Merge），把維護網路的方式從
        <strong>工作量證明（PoW，挖礦拼算力）</strong>換成
        <strong>權益證明（PoS，押本金做事）</strong>。從此維護網路的不再是礦工，而是
        <strong>驗證者（Validators）</strong>，能耗也降了約 99.9%。
      </p>

      <h2>驗證者在做什麼？</h2>
      <p>
        押滿 32 ETH 就能成為一個驗證者。它的工作很單純：
        <strong>輪到時提議新區塊</strong>、平時則
        <strong>幫別人的區塊「見證（背書）」</strong>，確認交易沒問題。做對了領獎勵；該做的沒做（離線）會被小扣，蓄意作惡（雙重簽章）則會被
        <strong>罰沒</strong>並踢出場。
      </p>
      <p>
        押上的那 32 ETH 就是「我會誠實」的保證金——這就是「權益證明」名字的由來：用你的權益（本金）來證明你會守規矩。
      </p>

      <h2>四種質押工具，差在哪？</h2>

      <h3>獨立質押（Solo）</h3>
      <p>
        自己備 32 ETH、自己跑節點。掌控與收益最高、無抽成，但要技術與維運。
      </p>

      <h3>質押即服務（SaaS）</h3>
      <p>
        一樣 32 ETH，但節點交給服務商代管、付月費。保留鑰匙，省去顧機器。
      </p>

      <h3>流動性質押（Liquid Staking）</h3>
      <p>
        門檻最低、最熱門。存任意金額，拿到一張「憑證」代表你的質押部位，而且這張憑證
        <strong>可以拿去 DeFi 再利用</strong>，資金不會被鎖死。兩種常見憑證：
      </p>
      <ul>
        <li>
          <strong>stETH（Lido）：</strong>採「rebase」——你錢包裡的 stETH
          餘額會隨獎勵每天慢慢變多，1 stETH 大致對應 1 ETH。
        </li>
        <li>
          <strong>rETH（Rocket Pool）：</strong>數量不變，但
          <strong>每顆 rETH 能換回的 ETH 會隨時間變多</strong>——獎勵反映在價格上。
        </li>
      </ul>

      <h3>交易所質押（CEX）</h3>
      <p>
        在交易所一鍵質押，最簡單。但幣完全託管在平台，承擔平台風險。
      </p>

      <div className="note">
        憑證（stETH／rETH）的意義：它讓你「一邊質押、一邊還能用這筆錢」，這是流動性質押最大的吸引力，但也多了一層智能合約與脫鉤風險。
      </div>
    </ArticleShell>
  )
}
