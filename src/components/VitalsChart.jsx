import { fmtDate } from '../utils/format.js'

const W = 600, H = 150, PAD_L = 34, PAD_R = 10, PAD_T = 14, PAD_B = 22

export default function VitalsChart({ metric, data }) {
  if (!data.length) return <svg className="chart" viewBox={`0 0 ${W} ${H}`} />

  const isBP = metric === 'bp'
  const vals = isBP
    ? data.flatMap((d) => [d.sys, d.dia])
    : data.map((d) => d.v)
  let min = Math.min(...vals)
  let max = Math.max(...vals)
  const span = max - min || 1
  min -= span * 0.15
  max += span * 0.15

  const x = (i) => PAD_L + (i / (data.length - 1 || 1)) * (W - PAD_L - PAD_R)
  const y = (v) => H - PAD_B - ((v - min) / (max - min)) * (H - PAD_T - PAD_B)

  const pathFor = (key) =>
    data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(d[key]).toFixed(1)}`).join(' ')

  const gridLines = [0, 1, 2].map((g) => {
    const gy = PAD_T + g * ((H - PAD_T - PAD_B) / 2)
    return (
      <line key={g} x1={PAD_L} y1={gy} x2={W - PAD_R} y2={gy} stroke="var(--border)" strokeWidth="1" />
    )
  })

  const last = data[data.length - 1]

  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      {gridLines}

      {isBP ? (
        <>
          <path d={pathFor('sys')} fill="none" stroke="var(--accent)" strokeWidth="2" />
          {data.map((d, i) => (
            <circle key={'s' + i} cx={x(i)} cy={y(d.sys)} r="2.6" fill="var(--accent)" />
          ))}
          <path d={pathFor('dia')} fill="none" stroke="var(--accent-2)" strokeWidth="2" strokeDasharray="4 3" />
          {data.map((d, i) => (
            <circle key={'d' + i} cx={x(i)} cy={y(d.dia)} r="2.6" fill="var(--accent-2)" />
          ))}
          <text x={W - PAD_R} y="14" textAnchor="end" fontSize="9" fill="var(--accent)" fontFamily="IBM Plex Mono, monospace">
            ● systolic
          </text>
          <text x={W - PAD_R} y="26" textAnchor="end" fontSize="9" fill="var(--accent-2)" fontFamily="IBM Plex Mono, monospace">
            - - diastolic
          </text>
        </>
      ) : (
        <>
          <path d={pathFor('v')} fill="none" stroke="var(--accent)" strokeWidth="2" />
          {data.map((d, i) => (
            <circle key={i} cx={x(i)} cy={y(d.v)} r="2.6" fill="var(--accent)" />
          ))}
        </>
      )}

      <text x={PAD_L} y={H - 4} fontSize="9" fill="var(--text-muted)" fontFamily="IBM Plex Mono, monospace">
        {fmtDate(data[0].date)}
      </text>
      <text x={W - PAD_R} y={H - 4} textAnchor="end" fontSize="9" fill="var(--text-muted)" fontFamily="IBM Plex Mono, monospace">
        {fmtDate(last.date)}
      </text>
    </svg>
  )
}
