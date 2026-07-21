import { ArticleShell } from '../../components/ArticleShell'

// stETH vs WBETH(2026-07 依研究筆記撰寫):rebase vs 匯率型是核心差異,
// WBETH 匯率 1.0973(2026-07-21 CoinGecko)會過時,行文用「約 1.09~1.10」。
export default function StethVsWbeth() {
  return (
    <ArticleShell
      kicker="進階知識 · 02"
      title="stETH 與 WBETH 差在哪？"
      intro="同樣是流動性質押憑證,為什麼 stETH 的價格始終貼著 ETH,而 WBETH 卻永遠比 ETH 貴、還越來越貴?搞懂 rebase 與匯率型這兩種設計,你就懂了大部分的質押憑證。"
      related={[
        { to: '/method/liquid', label: '回頭看：流動性質押怎麼開始' },
        { to: '/learn/risks', label: '質押有哪些風險？' },
      ]}
    >
      <h2>核心差異：獎勵記在「數量」還是「匯率」</h2>
      <p>
        兩張憑證都代表「你質押中的 ETH + 累積獎勵」,差別只在獎勵怎麼記帳：
      </p>
      <ul>
        <li>
          <strong>stETH（Lido）＝ rebase 型：</strong>
          每天中午（UTC）結算一次,你錢包裡的 stETH
          <strong>餘額自動變多</strong>。因為獎勵直接加在數量上,單價就沒有理由偏離
          ETH,所以 1 stETH ≈ 1 ETH 長期錨定。
        </li>
        <li>
          <strong>WBETH（幣安）＝ 匯率型：</strong>持有
          <strong>數量永遠不變</strong>
          ,幣安每天更新「1 WBETH 可兌換多少 ETH」的匯率,獎勵累積在匯率裡單向上升。2023
          年 4 月上線時 1:1,到 2026 年中 1 WBETH 已約可換 1.09~1.10 顆
          ETH。它「總是超漲 ETH」不是市場炒作,是機制使然：那個溢價就是你兩年多來累積的質押獎勵。
        </li>
      </ul>
      <p>
        順帶一提,Lido 自己也出了匯率型的包裝版
        <strong>wstETH</strong>
        ：把 stETH 包起來,餘額固定、靠匯率增值,原理跟 WBETH
        一模一樣。看懂這兩種設計,市面上幾乎所有質押憑證都是其中之一。
      </p>

      <h2>其他重要差異</h2>
      <ul>
        <li>
          <strong>誰在保管：</strong>stETH 是鏈上非託管協議,幣在智能合約、你自持憑證；WBETH
          的底層 ETH 由幣安代管,匯率也由幣安更新,信任對象是一家公司。
        </li>
        <li>
          <strong>贖回：</strong>Lido 走鏈上退出佇列,多數提領 1~5
          天、不收手續費（只付 gas）；幣安依當日匯率贖回,有每日額度限制,到帳要幾天。兩邊也都能直接在市場上賣掉,不用等。
        </li>
        <li>
          <strong>費用：</strong>Lido 抽質押獎勵的 10%。幣安也抽獎勵的一部分（約
          10%,以官方頁面當下公告為準）。
        </li>
      </ul>

      <h2>脫錨可能發生嗎？2022 年的教訓</h2>
      <p>
        2022 年 6 月,Terra 崩盤引發連鎖清算,Celsius 與三箭資本大舉拋售
        stETH,市價一度折價 6~7%。當時的關鍵背景是：質押提領還沒開放,stETH
        <strong>換不回 ETH</strong>
        ,套利者無法把折價買回來。2023 年 Shapella
        升級開放提領後,結構已經不同：折價一出現就有人買進贖回套利,錨定牢固許多。但「極端行情下短暫折價」永遠是流動性質押的固有風險,別拿它當穩定幣用。
      </p>

      <h2>用戶須知</h2>
      <ul>
        <li>
          <strong>rebase 型有相容性地雷：</strong>不少 DeFi
          協議與幾乎所有跨鏈橋不支援餘額會變的代幣,直接把 stETH
          過橋,獎勵可能卡在橋裡。要跨鏈或進 DeFi,用 wstETH 或 WBETH 這種匯率型。
        </li>
        <li>
          <strong>記帳與稅務：</strong>rebase
          型每天都在「入帳」,有些地區的稅務解讀會把每次 rebase
          當成收入事件；匯率型通常到賣出才結算。這不是稅務建議,申報前請查當地規定。
        </li>
        <li>
          <strong>別被「WBETH 比較貴」騙了：</strong>貴的部分是累積獎勵,不是它比較值錢。比較兩者收益要看年化,不是價格。
        </li>
      </ul>

      <div className="note">
        重點帶走：stETH 獎勵記在數量（餘額變多,價格錨定 1:1),WBETH/wstETH
        獎勵記在匯率（數量不變,越來越貴）。功能等價,選哪個看你信任誰、要去哪用。
      </div>

      <h2>常見問題</h2>
      <h3>我該選 stETH 還是 WBETH？</h3>
      <p>
        本來就在幣安、想一鍵搞定,WBETH 順手；想自持私鑰、在 DeFi 活動,選
        stETH/wstETH。收益差距不大,差在信任模型。
      </p>
      <h3>持有憑證還要做什麼才能領獎勵嗎？</h3>
      <p>
        不用。獎勵自動反映在餘額（stETH）或匯率（WBETH）裡,持有就是領息。
      </p>
      <h3>憑證可以隨時換回 ETH 嗎？</h3>
      <p>
        可以,兩條路：市場直接賣（即時,吃市價）,或走官方贖回（等幾天,拿足額）。這正是「流動性」質押的意義。
      </p>
    </ArticleShell>
  )
}
