import { ArticleShell } from '../../components/ArticleShell'

export default function WhatIsEthereum() {
  return (
    <ArticleShell
      kicker="新手知識 · 01"
      title="什麼是以太坊？"
      intro="在談質押之前，先搞懂你要質押的這條網路。以太坊不只是一種幣，而是一台「全世界共用的電腦」。"
      related={[
        { to: '/learn/pos', label: '下一篇：PoS 與各種質押工具' },
        { to: '/learn/buy-eth', label: '買進你的第一顆 ETH' },
      ]}
    >
      <h2>一台世界共用的電腦</h2>
      <p>
        以太坊（Ethereum）是一個
        <strong>去中心化的程式執行平台</strong>。任何人都能在上面部署「智能合約」，也就是會自動執行、沒人能偷改的程式。它不歸任何一家公司管，由全世界的節點一起維護。
      </p>
      <p>
        <strong>ETH（以太幣）</strong>則是這台電腦的原生資產：你要在上面做任何事（轉帳、交易、質押）都得用 ETH 付「手續費（Gas）」。
      </p>

      <h2>跟比特幣有什麼不同？</h2>
      <p>
        比特幣比較像「數位黃金」，主要功能是儲值與轉帳。以太坊則更像「可程式化的金融基礎建設」：除了轉帳，還能跑借貸、交易所、NFT、遊戲等各種應用。
        <strong>比特幣是錢，以太坊是平台</strong>。
      </p>

      <h2>ETH 可以拿來做什麼</h2>
      <ul>
        <li>
          <strong>付手續費：</strong>在以太坊上做任何操作的「油錢」。
        </li>
        <li>
          <strong>質押：</strong>鎖進網路、幫忙維護安全，賺取獎勵（這整個網站在談的事）。
        </li>
        <li>
          <strong>參與應用：</strong>DeFi 借貸、去中心化交易、買 NFT 等等。
        </li>
      </ul>

      <h2>為什麼 ETH 能拿來「質押」？</h2>
      <p>
        因為以太坊在 2022 年改用了一套叫
        <strong>權益證明（Proof of Stake）</strong>
        的機制來維護網路安全：不再靠礦工拼算力，而是讓人押上 ETH 當保證金、誠實做事換獎勵。下一篇就來把這套機制講清楚。
      </p>

      <div className="note">
        重點帶走：以太坊是「世界電腦」，ETH 是它的燃料與保證金。質押 = 把這份保證金借給網路、分享它發的獎勵。
      </div>
    </ArticleShell>
  )
}
