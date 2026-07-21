import { ArticleShell } from '../../components/ArticleShell'

// ETH is Money 觀點匯集(2026-07 依研究筆記撰寫)。全篇是「觀點整理」不是事實,
// 行文標日期、附反方;Tom Lee 價格預測紀錄不佳,依筆記要求平衡呈現。
export default function EthIsMoney() {
  return (
    <ArticleShell
      kicker="市場觀點 · 01"
      title="ETH is Money：把以太幣當貨幣的論點"
      intro="「ETH 不只是燃料,它本身就是錢。」從華爾街的 Tom Lee 到以太坊研究員,這個說法這幾年越喊越大聲。這篇整理正反雙方的代表性觀點,幫你建立自己的判斷,不是投資建議。"
      related={[
        { to: '/learn/outlook', label: '下一篇：以太幣的漲跌與前景' },
        { to: '/learn/tokenomics', label: '回頭看：以太幣的代幣經濟學' },
      ]}
    >
      <h2>Tom Lee：華爾街最大聲的 ETH 多頭</h2>
      <p>
        Fundstrat 創辦人 Tom Lee 是這波「ETH 資產化」敘事的代表人物。他主導的
        <strong> BitMine </strong>是全球最大的 ETH 財庫公司：截至 2026 年
        7 月持有約 577 萬顆 ETH,約佔流通量 4.8%,其中八成五拿去質押生息,並公開喊出「持有全網
        5%」的目標。
      </p>
      <p>
        他的核心論點：穩定幣是加密世界的「ChatGPT
        時刻」,美國穩定幣法案（GENIUS Act）通過後,華爾街的代幣化資產與穩定幣主要跑在以太坊上,ETH
        作為這條金融軌道的原生資產,地位類似「持有曼哈頓的地」。
      </p>
      <div className="callout">
        平衡提醒：Tom Lee 的價格預測紀錄並不漂亮。他在 2025 年中喊出年底
        $10,000~$12,000,實際上 ETH 在 2025 年 8 月見頂約 $4,950
        後回落。聽論述,別照單全收目標價。
      </div>

      <h2>以太坊圈內的三個經典論述</h2>
      <ul>
        <li>
          <strong>Ultrasound Money（2021,Justin Drake）：</strong>比特幣供給固定,是「sound
          money」;ETH 在 EIP-1559 燒幣後供給可能負成長,所以是「ultra
          sound」。這個說法在 2022~2023 年的淨通縮期最風光,目前則處於「低通脹、有條件成立」的狀態（詳見代幣經濟學那篇）。
        </li>
        <li>
          <strong>三重資產論（2019,Bankless）：</strong>ETH 同時是(1)
          資本資產：質押生息;(2) 消耗性資產：付 gas 被燒掉;(3)
          價值儲存：DeFi 的抵押品。傳統金融裡很少有資產同時扮演三種角色。
        </li>
        <li>
          <strong>數位石油（2025,Etherealize）：</strong>由前以太坊基金會研究員參與的機構報告,把
          ETH 定位成「未來金融軌道的必要燃料」,主打機構投資人,主張 ETH
          被嚴重錯價。
        </li>
      </ul>

      <h2>機構的真金白銀</h2>
      <ul>
        <li>
          <strong>現貨 ETF：</strong>美國 SEC 於 2024 年 5 月核准、7
          月開始交易。累計淨流入曾達百億美元等級,但規模隨幣價波動劇烈,2026
          年也出現過連續流出,不是單向的買盤。
        </li>
        <li>
          <strong>企業財庫:</strong>除了 BitMine,SharpLink 持有約 89 萬顆
          ETH 並持續質押。企業把 ETH 當儲備資產並「開著生息」,是這輪跟上輪週期最大的差別。
        </li>
      </ul>

      <h2>反方觀點:錢沒那麼好當</h2>
      <ul>
        <li>
          <strong>L2 吸走價值:</strong>2024 年 Dencun 升級後,L2
          付給主網的費用大減,以太坊主網收入年減七成以上。批評者說得很尖銳:「以太坊作為基礎設施越成功,ETH
          作為稀缺資產越失敗」。支持方則指出 2025 年底的 Fusaka
          升級已為費用設下地板,且結算層的價值本來就不該用短期手續費衡量。
        </li>
        <li>
          <strong>貨幣政策多變:</strong>比特幣陣營長期批評 ETH
          的發行規則改過多次、沒有固定上限,不符合「健全貨幣」的定義。
        </li>
        <li>
          <strong>通縮敘事退燒:</strong>ultrasound money 需要鏈上活動夠熱才成立,2026
          年的 ETH 實際上是小幅通脹。
        </li>
      </ul>

      <div className="note">
        重點帶走:「ETH is Money」是一組論述,不是事實。多方的根據是質押生息 +
        燒幣稀缺 + 機構採用;反方的根據是 L2 分流 +
        政策多變。兩邊都拿得出數據,倉位請自己決定。
      </div>

      <h2>常見問題</h2>
      <h3>質押跟這個敘事有什麼關係？</h3>
      <p>
        「資本資產」是三重資產論的第一支柱:ETH
        能生息,才有資格被類比成債券或房地產。你質押的那一刻,就是在實踐這個敘事,無論你信不信它。
      </p>
      <h3>所以 ETH 會漲嗎？</h3>
      <p>
        本站不做預測。這篇的目的是讓你聽得懂市場在吵什麼,判斷與風險自負,可搭配下一篇的多空數據一起看。
      </p>
    </ArticleShell>
  )
}
