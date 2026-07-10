import { Outlet, useOutletContext } from 'react-router-dom'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { useLiveData, type LiveData } from '../lib/useLiveData'

// 整站共用骨架：抓一次即時資料，透過 Outlet context 分給各頁，避免每頁重抓。
export function Layout() {
  const live = useLiveData()
  return (
    <>
      <Nav live={live} />
      <main>
        <Outlet context={live} />
      </main>
      <Footer />
    </>
  )
}

export const useLive = () => useOutletContext<LiveData>()
