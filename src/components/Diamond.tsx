// 招牌元素:以太坊八面體。
//  ring=false → 純鑽石(nav / bullet)
//  ring=true  → hero 用:立體八面體 + 3D 軌道環 + 柔和光暈(淺底友善)

function Gem({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size * 1.25}
      viewBox="0 0 32 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M16 1 L30 18 L16 25 L2 18 Z" fill="var(--color-eth-2)" />
      <path d="M16 1 L30 18 L16 25 Z" fill="var(--color-eth)" />
      <path d="M2 18 L16 25 L16 39 Z" fill="var(--color-eth)" opacity="0.85" />
      <path
        d="M30 18 L16 25 L16 39 Z"
        fill="color-mix(in srgb, var(--color-eth) 72%, #000)"
      />
      <path
        d="M16 1 L30 18 L16 25 L2 18 Z"
        stroke="#ffffff"
        strokeOpacity="0.35"
        strokeWidth="0.5"
      />
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
        <Gem size={size * 0.8} />
      </span>
    )

  const box = size * 5.2
  return (
    <div
      className={`relative grid place-items-center ${className}`}
      style={{ width: box, height: box, perspective: '1000px' }}
    >
      {/* 掃描虛線外圈 */}
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
        <span key={pos} className={`absolute size-4 border-eth/40 ${pos}`} />
      ))}

      {/* 3D 軌道環 */}
      <OrbitPlane tilt="rotateX(74deg)" dur={8} color="var(--color-yield)" dot={11} />
      <OrbitPlane tilt="rotateX(74deg) rotateY(60deg)" dur={12} reverse color="var(--color-eth)" dot={8} />
      <OrbitPlane tilt="rotateX(66deg) rotateY(-50deg)" dur={16} color="var(--color-eth-2)" dot={5} />

      {/* 中央八面體 */}
      <div
        className="relative z-10 animate-float"
        style={{ filter: 'drop-shadow(0 12px 24px rgba(48,128,255,0.32))' }}
      >
        <Gem size={size * 1.7} />
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
      <div className="absolute inset-0 rounded-full border border-eth/25" />
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
            boxShadow: `0 0 ${dot + 4}px ${dot / 3}px ${color}`,
          }}
        />
      </div>
    </div>
  )
}
