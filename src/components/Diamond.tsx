// 招牌元素:以太坊八面體。
//  ring=false → 純鑽石(nav / 項目符號 / 分隔用,實心)
//  ring=true  → hero 用的科技 HUD 版:全像霓虹八面體 + 3D 軌道環 + 雷達掃描 + 角標

// 實心小鑽石(nav / bullet)
function SolidGem({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M16 1 L30 18 L16 25 L2 18 Z" fill="var(--color-eth-2)" />
      <path d="M16 1 L30 18 L16 25 Z" fill="var(--color-eth)" />
      <path d="M2 18 L16 25 L16 39 Z" fill="var(--color-eth)" opacity="0.85" />
      <path d="M30 18 L16 25 L16 39 Z" fill="#4f48bd" />
    </svg>
  )
}

// 霓虹全像八面體(hero)
function NeonGem({ px }: { px: number }) {
  return (
    <svg
      width={px}
      height={px * 1.25}
      viewBox="0 0 32 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 0 14px rgba(138,131,240,0.85))' }}
    >
      {/* 半透明面(玻璃/全像感) */}
      <path d="M16 1 L30 18 L16 25 L2 18 Z" fill="var(--color-eth-2)" opacity="0.55" />
      <path d="M16 1 L30 18 L16 25 Z" fill="var(--color-eth)" opacity="0.7" />
      <path d="M2 18 L16 25 L16 39 Z" fill="var(--color-eth)" opacity="0.45" />
      <path d="M30 18 L16 25 L16 39 Z" fill="#4f48bd" opacity="0.7" />
      {/* 霓虹亮邊 */}
      <g stroke="#c9c5ff" strokeWidth="0.7" strokeLinejoin="round">
        <path d="M16 1 L30 18 L16 39 L2 18 Z" />
        <path d="M2 18 L30 18" strokeOpacity="0.8" />
        <path d="M16 1 L16 25 M16 25 L16 39" strokeOpacity="0.6" />
        <path d="M16 25 L2 18 M16 25 L30 18" strokeOpacity="0.5" />
      </g>
    </svg>
  )
}

export function Diamond({
  size = 28,
  ring = false,
  className = '',
}: {
  size?: number
  ring?: boolean
  className?: string
}) {
  if (!ring)
    return (
      <span className={className}>
        <SolidGem size={size} />
      </span>
    )

  const box = size * 5.2
  return (
    <div
      className={`relative grid place-items-center ${className}`}
      style={{ width: box, height: box, perspective: '1000px' }}
    >
      {/* 核心輝光 */}
      <div className="absolute inset-[20%] rounded-full bg-eth/35 blur-[46px]" />
      <div className="absolute inset-[34%] rounded-full bg-eth-2/45 blur-[26px]" />

      {/* 雷達掃描:虛線外圈慢轉 */}
      <div
        className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-eth/25"
        style={{ animationDuration: '30s' }}
      />
      <div className="absolute inset-[8%] rounded-full border border-eth/10" />

      {/* HUD 角標 */}
      {[
        'left-0 top-0 border-l border-t',
        'right-0 top-0 border-r border-t',
        'left-0 bottom-0 border-l border-b',
        'right-0 bottom-0 border-r border-b',
      ].map((pos) => (
        <span
          key={pos}
          className={`absolute size-4 border-eth-2/50 ${pos}`}
        />
      ))}

      {/* 3D 軌道環 */}
      <OrbitPlane tilt="rotateX(74deg)" dur={8} color="var(--color-yield)" dot={11} />
      <OrbitPlane tilt="rotateX(74deg) rotateY(60deg)" dur={12} reverse color="var(--color-eth-2)" dot={8} />
      <OrbitPlane tilt="rotateX(66deg) rotateY(-50deg)" dur={16} color="#ffffff" dot={5} />

      {/* 中央全像八面體 */}
      <div className="relative z-10 animate-float">
        <NeonGem px={size * 1.7} />
      </div>
    </div>
  )
}

function OrbitPlane({
  tilt,
  dur,
  reverse = false,
  color,
  dot,
}: {
  tilt: string
  dur: number
  reverse?: boolean
  color: string
  dot: number
}) {
  return (
    <div className="absolute inset-[5%]" style={{ transform: tilt }}>
      <div className="absolute inset-0 rounded-full border border-eth/30" />
      <div
        className="absolute inset-0 animate-spin-slow"
        style={{
          animationDuration: `${dur}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        <span
          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: dot,
            height: dot,
            background: color,
            boxShadow: `0 0 ${dot + 5}px ${dot / 2}px ${color}`,
          }}
        />
      </div>
    </div>
  )
}
