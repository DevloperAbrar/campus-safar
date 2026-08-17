export const WaveDivider = ({ fromColor, toColor, flip = false, height = 72 }) => (
    <div style={{ position: 'relative', lineHeight: 0, margin: 0, padding: 0, background: fromColor }}>
      <svg viewBox="0 0 1440 72" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height, transform: flip ? 'scaleY(-1)' : 'none' }}>
        <path d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z" fill={toColor} />
      </svg>
    </div>
  )
  
  export const CurveDivider = ({ fromColor, toColor, height = 80, invert = false }) => (
    <div style={{ position: 'relative', lineHeight: 0, background: fromColor }}>
      <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height, transform: invert ? 'scaleY(-1)' : 'none' }}>
        <path d="M0,0 Q720,80 1440,0 L1440,80 L0,80 Z" fill={toColor} />
      </svg>
    </div>
  )
  
  export const DiagonalDivider = ({ fromColor, toColor, height = 60, direction = 'right' }) => {
    const path = direction === 'right'
      ? `M0,0 L1440,${height} L0,${height} Z`
      : `M0,${height} L1440,0 L1440,${height} Z`
    return (
      <div style={{ position: 'relative', lineHeight: 0, margin: 0, padding: 0, background: fromColor }}>
        <svg viewBox={`0 0 1440 ${height}`} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height }}>
          <rect width="1440" height={height} fill={fromColor} />
          <path d={path} fill={toColor} />
        </svg>
      </div>
    )
  }
  
  export const StadiumDivider = ({ fromColor, toColor, height = 72 }) => (
    <div style={{ position: 'relative', lineHeight: 0, background: fromColor }}>
      <svg viewBox="0 0 1440 72" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height }}>
        <path d="M0,72 Q720,-20 1440,72 L1440,72 L0,72 Z" fill={toColor} />
      </svg>
    </div>
  )