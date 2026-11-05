import { motion, useMotionValue, useSpring, useMotionTemplate } from 'motion/react'
import { backImg } from '../data'

export default function FlipCard({ card, front, onClick }) {
  const rx = useSpring(useMotionValue(0), { stiffness: 170, damping: 18 })
  const ry = useSpring(useMotionValue(0), { stiffness: 170, damping: 18 })
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const shine = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 })
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,.55), transparent 55%)`
  const foilPos = useMotionTemplate`${gx}% ${gy}%`

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * 30)
    rx.set((0.5 - py) * 30)
    gx.set(px * 100)
    gy.set(py * 100)
    shine.set(1)
  }
  const leave = () => { rx.set(0); ry.set(0); gx.set(50); gy.set(50); shine.set(0) }

  return (
    <motion.div className="cardwrap" initial={{ opacity: 0, y: 40, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}>
      <div
        className="hit" role="button" tabIndex={0} aria-label="Flip card"
        onClick={onClick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() } }}
        onPointerMove={move} onPointerLeave={leave} onPointerCancel={leave}
      >
        <motion.div className="tilt" style={{ rotateX: rx, rotateY: ry }}>
          <motion.div className="flip" initial={false} animate={{ rotateY: front ? 0 : 180 }} transition={{ type: 'spring', stiffness: 80, damping: 16 }}>
            <div className="face front">
              <img src={card.img} alt={`${card.name} card`} draggable={false} />
              <motion.div className="foil" style={{ opacity: shine, backgroundPosition: foilPos }} />
              <motion.div className="glare" style={{ opacity: shine, backgroundImage: glare }} />
            </div>
            <div className="face back">
              <img src={backImg} alt="Pokémon card back" draggable={false} />
              <motion.div className="glare" style={{ opacity: shine, backgroundImage: glare }} />
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="ground" />
    </motion.div>
  )
}
