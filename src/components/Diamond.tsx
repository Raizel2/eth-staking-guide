// 招牌元素:以太坊八面體。
//  ring=false → 純鑽石(nav / bullet / 頁尾)
//  ring=true  → hero 主視覺:立體寶石 + 金幣 + 星芒(鏈習生 3D 插畫感)

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

// 四點星芒(鏈習生標題旁的 ✦)
function Spark({
  x,
  y,
  s,
  fill,
  delay = 0,
}: {
  x: number
  y: number
  s: number
  fill: string
  delay?: number
}) {
  return (
    <path
      d={`M${x} ${y - s} Q${x + s * 0.18} ${y - s * 0.18} ${x + s} ${y} Q${x + s * 0.18} ${y + s * 0.18} ${x} ${y + s} Q${x - s * 0.18} ${y + s * 0.18} ${x - s} ${y} Q${x - s * 0.18} ${y - s * 0.18} ${x} ${y - s}Z`}
      fill={fill}
      className="animate-twinkle"
      style={{ animationDelay: `${delay}s` }}
    />
  )
}

// 有厚度的 Ξ 金幣
function Coin({
  cx,
  cy,
  r,
  delay = 0,
}: {
  cx: number
  cy: number
  r: number
  delay?: number
}) {
  const bar = r * 0.78
  return (
    <g className="animate-float" style={{ animationDelay: `${delay}s` }}>
      <circle cx={cx} cy={cy + r * 0.14} r={r} fill="#c68e08" />
      <circle cx={cx} cy={cy} r={r} fill="#f0ac0a" />
      <circle cx={cx} cy={cy} r={r * 0.8} fill="#ffd76a" />
      <circle
        cx={cx}
        cy={cy}
        r={r * 0.8}
        fill="none"
        stroke="#b57f00"
        strokeOpacity="0.35"
        strokeWidth={r * 0.05}
      />
      {/* Ξ:三條橫槓 */}
      {[-0.36, 0, 0.36].map((dy, i) => (
        <rect
          key={dy}
          x={cx - bar / 2 + (i === 1 ? bar * 0.1 : 0)}
          y={cy + dy * r - r * 0.09}
          width={i === 1 ? bar * 0.8 : bar}
          height={r * 0.18}
          rx={r * 0.09}
          fill="#b57f00"
        />
      ))}
      <path
        d={`M${cx - r * 0.55} ${cy - r * 0.62} A ${r * 0.82} ${r * 0.82} 0 0 1 ${cx + r * 0.4} ${cy - r * 0.72}`}
        fill="none"
        stroke="#fff3cf"
        strokeWidth={r * 0.1}
        strokeLinecap="round"
        opacity="0.9"
      />
    </g>
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
    <div className={className} style={{ width: box, height: box }}>
      <svg
        viewBox="0 0 360 360"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* 背景底盤:柔白圓 + 細環,像商品攝影的打光台 */}
        <circle cx="180" cy="176" r="150" fill="#ffffff" opacity="0.22" />
        <circle
          cx="180"
          cy="176"
          r="150"
          stroke="#ffffff"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
        <circle
          cx="180"
          cy="176"
          r="122"
          stroke="#ffffff"
          strokeOpacity="0.22"
          strokeWidth="1"
        />

        {/* 地面陰影 */}
        <ellipse cx="180" cy="312" rx="86" ry="15" fill="#053c53" opacity="0.16" />

        {/* 主寶石:四面光影 + 白稜線(光源右上) */}
        <g className="animate-float">
          <polygon points="180,58 96,182 166,204" fill="#0d6288" />
          <polygon points="180,58 264,182 166,204" fill="#1085bc" />
          <polygon points="96,182 180,300 166,204" fill="#084a68" />
          <polygon points="264,182 180,300 166,204" fill="#053c53" />
          <g stroke="#ffffff" strokeLinejoin="round">
            <polyline
              points="96,182 180,58 264,182"
              strokeOpacity="0.55"
              strokeWidth="2.5"
              fill="none"
            />
            <polyline
              points="96,182 166,204 264,182"
              strokeOpacity="0.35"
              strokeWidth="1.5"
              fill="none"
            />
            <polyline
              points="180,58 166,204 180,300"
              strokeOpacity="0.3"
              strokeWidth="1.5"
              fill="none"
            />
            <polygon
              points="180,58 96,182 180,300 264,182"
              strokeOpacity="0.5"
              strokeWidth="2"
              fill="none"
            />
          </g>
          {/* 頂部高光 */}
          <polygon
            points="180,58 208,100 190,106"
            fill="#ffffff"
            opacity="0.5"
          />
        </g>

        {/* 金幣:一大一小,浮動相位錯開 */}
        <Coin cx={84} cy={252} r={36} delay={1.2} />
        <Coin cx={290} cy={92} r={24} delay={2.6} />

        {/* 星芒 */}
        <Spark x={62} y={96} s={12} fill="#ffffff" delay={0} />
        <Spark x={306} y={196} s={9} fill="#ffd76a" delay={1.4} />
        <Spark x={238} y={40} s={7} fill="#ffffff" delay={2.2} />
      </svg>
    </div>
  )
}
