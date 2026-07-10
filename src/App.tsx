import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import MethodArticle from './pages/MethodArticle'
import PathProtocol from './pages/PathProtocol'
import PathSolo from './pages/PathSolo'
import WhatIsEthereum from './pages/learn/WhatIsEthereum'
import Pos from './pages/learn/Pos'
import BuyFirstEth from './pages/learn/BuyFirstEth'

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
      </Route>
    </Routes>
  )
}
