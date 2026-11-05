import { motion } from 'motion/react'

export default function CardList({ cards, index, onSelect }) {
  return (
    <motion.nav className="list" aria-label="All cards" initial="hide" animate="show" exit="hide"
      variants={{ show: { transition: { staggerChildren: 0.07 } }, hide: { transition: { staggerChildren: 0.04, staggerDirection: -1 } } }}>
      {cards.map((c, i) => (
        <motion.button key={c.id} className={`thumb ${i === index ? 'on' : ''}`} style={{ '--c': c.accent }} onClick={() => onSelect(i)} aria-label={c.name} aria-pressed={i === index}
          variants={{ hide: { opacity: 0, x: 120, scale: 0.7 }, show: { opacity: 1, x: 0, scale: 1 } }}
          transition={{ type: 'spring', stiffness: 120, damping: 15 }}
          whileHover={{ y: -4, scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <img src={c.img} alt="" draggable={false} />
        </motion.button>
      ))}
    </motion.nav>
  )
}
