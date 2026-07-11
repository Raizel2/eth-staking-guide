// Chainee(/v2)專用裝飾層:實際的 SVG 設計物件(藍色半透明玻璃三角 + 漂浮區塊鏈立方體),
// 放在版面空白處。只在 /v2 渲染,不影響紫色版。低調、不干擾閱讀。

function GlassTriangle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 220" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ct-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#cfe8f6" stopOpacity="0.7" />
          <stop offset="1" stopColor="#7cbfe6" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      <path
        d="M120 14 L214 196 Q220 208 206 208 L34 208 Q20 208 26 196 Z"
        fill="url(#ct-glass)"
        stroke="#1878b9"
        strokeOpacity="0.28"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M120 16 L120 206" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="1.5" />
    </svg>
  )
}

function IsoCube({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="#17698c"
      strokeOpacity="0.42"
      strokeWidth="2"
      strokeLinejoin="round"
    >
      <path d="M32 5 L56 19 L56 45 L32 59 L8 45 L8 19 Z" fill="#1878b9" fillOpacity="0.06" />
      <path d="M32 32 L32 5 M32 32 L56 45 M32 32 L8 45" />
    </svg>
  )
}

export function ChaineeDecor() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* hero 右側:玻璃三角 + 立方體群 */}
      <GlassTriangle className="absolute right-[5%] top-24 w-60 rotate-6 opacity-80 md:w-80" />
      <IsoCube className="absolute right-[32%] top-36 w-11 opacity-70 md:w-14" />
      <IsoCube className="absolute right-[12%] top-[22rem] w-16 opacity-60 md:w-20" />
      {/* hero 左側邊緣:小立方體(大螢幕才顯示,免得擠到文字) */}
      <IsoCube className="absolute left-[2%] top-[19rem] hidden w-14 opacity-50 lg:block" />
      {/* 更下面一點的空白處再點綴一顆 */}
      <IsoCube className="absolute left-[4%] top-[62rem] hidden w-12 opacity-40 xl:block" />
    </div>
  )
}
