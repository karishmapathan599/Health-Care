import { useEffect, useRef, useState } from 'react'

const THREADS = [
  { id: 't1', title: "Dr. Patel's Office", sub: 'Cardiology · last reply Sep 26' },
  { id: 't2', title: 'Pharmacy', sub: 'Refill notifications' },
  { id: 't3', title: 'Billing', sub: 'No new messages' }
]

export default function Messages({ msgs, onSend }) {
  const [activeThread, setActiveThread] = useState('t1')
  const [text, setText] = useState('')
  const logRef = useRef(null)

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [msgs])

  function send() {
    const trimmed = text.trim()
    if (!trimmed) return
    onSend(trimmed)
    setText('')
  }

  return (
    <section className="view active">
      <div className="topbar"><div><h2>Messages</h2><p>Secure messages with your care team.</p></div></div>

      <div className="msg-shell">
        <div className="thread-list">
          {THREADS.map((t) => (
            <div
              key={t.id}
              className={'thread-item' + (activeThread === t.id ? ' active' : '')}
              onClick={() => setActiveThread(t.id)}
            >
              <div className="t1">{t.title}</div>
              <div className="t2">{t.sub}</div>
            </div>
          ))}
        </div>
        <div className="msg-panel">
          <div className="msg-panel-head">Dr. Patel's Office · Cardiology</div>
          <div className="msg-log" ref={logRef}>
            {msgs.map((m, i) =>
              m.from === 'system' ? (
                <div className="bubble system" key={i}>{m.text}</div>
              ) : (
                <div className={'bubble ' + (m.from === 'me' ? 'me' : 'them')} key={i}>
                  {m.text}
                  {m.time && <span className="time">{m.time}</span>}
                </div>
              )
            )}
          </div>
          <div className="msg-input">
            <input
              type="text"
              placeholder="Type a message to your care team…"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') send() }}
            />
            <button className="btn" onClick={send}>Send</button>
          </div>
        </div>
      </div>
    </section>
  )
}
