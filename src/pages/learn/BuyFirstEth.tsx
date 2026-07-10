import { ArticleShell } from '../../components/ArticleShell'

export default function BuyFirstEth() {
  return (
    <ArticleShell
      kicker="新手知識 · 03"
      title="買進你的第一顆 ETH"
      intro="還沒有 ETH？這篇帶你從零走一遍：選平台、開戶、買幣，再決定要不要轉進自己的錢包。"
      related={[
        { to: '/path/protocol', label: '有 ETH 了，挑一條路質押' },
        { to: '/learn/pos', label: '回顧：PoS 與質押工具' },
      ]}
    >
      <h2>整體流程一眼看完</h2>
      <p>
        選一間<strong>交易所</strong> → <strong>開戶並完成身分驗證（KYC）</strong>{' '}
        → <strong>入金</strong>（用台幣或銀行轉帳）→ <strong>買進 ETH</strong> →
        （進階）<strong>轉到自己的錢包</strong>。對新手來說，前四步就能開始了。
      </p>

      <h2>1. 選一間交易所</h2>
      <p>
        交易所是你用法幣換加密貨幣的入口。挑選時看三件事：
        <strong>合規與信譽</strong>、<strong>是否支援台幣入金</strong>、
        <strong>手續費</strong>。台灣與國際都有不少選擇——這裡不替任何一家背書，請自己多查評價、從規模大、營運久的開始。
      </p>

      <h2>2. 開戶與身分驗證</h2>
      <p>
        註冊後通常要上傳證件、做人臉驗證（KYC）。這是合法平台的標準流程，目的是防洗錢。準備好身分證件，照指示完成即可。
      </p>

      <h2>3. 入金</h2>
      <p>
        綁定銀行帳戶或信用卡，把台幣存進交易所。第一次建議
        <strong>只入一小筆你能承受全部損失的金額</strong>，先熟悉流程。
      </p>

      <h2>4. 買進 ETH</h2>
      <p>
        在交易所找到 ETH 交易對，輸入金額下單即可。你不必買「一整顆」——ETH
        可以買零頭，幾百塊台幣也能開始。
      </p>

      <h2>5.（進階）轉到自己的錢包</h2>
      <p>
        想完全自管、或要去用 Lido／Rocket Pool 這類協議，就需要一個自管錢包（例如
        MetaMask）。把 ETH 從交易所「提幣」到你的錢包地址即可。
      </p>

      <div className="callout">
        安全三鐵則：① <strong>助記詞</strong>（錢包的 12／24 個英文字）抄在紙上、離線保存，
        <strong>絕不拍照、不上傳、不告訴任何人</strong>；② 別把大筆資產長期放在交易所；③
        天上不會掉「保證高報酬」，標榜穩賺的幾乎都是詐騙。
      </div>

      <div className="note">
        小提醒：轉帳前先用很小的金額試一次，確認地址正確、到帳沒問題，再轉大額。加密貨幣轉錯地址通常拿不回來。
      </div>
    </ArticleShell>
  )
}
