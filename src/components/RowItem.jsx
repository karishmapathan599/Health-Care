export default function RowItem({ icon, title, subtitle, meta }) {
  return (
    <div className="row-item">
      <div className="icon">{icon}</div>
      <div className="info">
        <div className="t1">{title}</div>
        <div className="t2">{subtitle}</div>
      </div>
      <div className="meta">{meta}</div>
    </div>
  )
}
