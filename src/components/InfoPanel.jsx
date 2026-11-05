import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react'

// a layer that drifts with the pointer at its own depth (parallax)
function Layer({ sx, sy, depth, className, children }) {
  const x = useTransform(sx, [-1, 1], [-depth, depth])
  const y = useTransform(sy, [-1, 1], [-depth, depth])
  return <motion.div className={className} style={{ x, y }}>{children}</motion.div>
}

export default function InfoPanel({ card, index, total, onPrev, onNext, onClose }) {
  const px = useMotionValue(0), py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 140, damping: 18 })
  const sy = useSpring(py, { stiffness: 140, damping: 18 })
  const shine = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 })
  const rotateY = useTransform(sx, [-1, 1], [-12, 12])
  const rotateX = useTransform(sy, [-1, 1], [10, -10])
  const gx = useTransform(sx, [-1, 1], [0, 100])
  const gy = useTransform(sy, [-1, 1], [0, 100])
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,.32), transparent 60%)`

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    px.set(((e.clientX - r.left) / r.width) * 2 - 1)
    py.set(((e.clientY - r.top) / r.height) * 2 - 1)
    shine.set(1)
  }
  const leave = () => { px.set(0); py.set(0); shine.set(0) }

  return (
    <motion.aside className="panel" onPointerMove={move} onPointerLeave={leave}
      initial={{ opacity: 0, x: -140, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -140, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 90, damping: 16 }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}>
      <motion.div className="pglare" style={{ opacity: shine, backgroundImage: glare }} />
      <button className="close" onClick={onClose} aria-label="Close">✕</button>
      <AnimatePresence mode="wait">
        <motion.div key={card.id} className="body" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }}>
          <Layer sx={sx} sy={sy} depth={12}>
            <span className="badge">{card.type}</span>
            <h2>{card.name}</h2>
            <p className="num">Card number {card.number}</p>
          </Layer>
          <Layer sx={sx} sy={sy} depth={7} className="stats">
            {card.stats.map((s) => (
              <div className="stat" key={s.label}>
                <div className="row2"><span>{s.label}</span><b>{s.value}</b></div>
                <div className="bar"><motion.i initial={{ width: 0 }} animate={{ width: `${(s.value / s.max) * 100}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} /></div>
              </div>
            ))}
          </Layer>
          <Layer sx={sx} sy={sy} depth={4}>
            <dl className="meta">
              <div><dt>Weakness</dt><dd>{card.weak}</dd></div>
              <div><dt>Resistance</dt><dd>{card.resist}</dd></div>
            </dl>
            <p className="desc">{card.text}</p>
          </Layer>
        </motion.div>
      </AnimatePresence>
      <footer className="nav">
        <button onClick={onPrev}>Previous</button>
        <span>{index + 1} of {total}</span>
        <button onClick={onNext}>Next</button>
      </footer>
    </motion.aside>
  )
}
