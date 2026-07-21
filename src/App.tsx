import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import MethodArticle from './pages/MethodArticle'
import PathProtocol from './pages/PathProtocol'
import PathSolo from './pages/PathSolo'
import WhatIsEthereum from './pages/learn/WhatIsEthereum'
import Pos from './pages/learn/Pos'
import BuyFirstEth from './pages/learn/BuyFirstEth'
import Tokenomics from './pages/learn/Tokenomics'
import EthIsMoney from './pages/learn/EthIsMoney'
import StethVsWbeth from './pages/learn/StethVsWbeth'
import Outlook from './pages/learn/Outlook'
import Risks from './pages/learn/Risks'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="method/:key" element={<MethodArticle />} />
        <Route path="path/protocol" element={<PathProtocol />} />
        <Route path="path/solo" element={<PathSolo />} />
        <Route path="learn/ethereum" element={<WhatIsEthereum />} />
        <Route path="learn/pos" element={<Pos />} />
        <Route path="learn/buy-eth" element={<BuyFirstEth />} />
        <Route path="learn/tokenomics" element={<Tokenomics />} />
        <Route path="learn/eth-is-money" element={<EthIsMoney />} />
        <Route path="learn/steth-vs-wbeth" element={<StethVsWbeth />} />
        <Route path="learn/outlook" element={<Outlook />} />
        <Route path="learn/risks" element={<Risks />} />
        {/* 舊的對比路由 /v2 → 導回首頁(現在整站已是同一套主題) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
