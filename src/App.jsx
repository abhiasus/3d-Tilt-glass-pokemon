import { useRef, useState, useEffect } from 'react'
import { AnimatePresence } from 'motion/react'
import { cards, backImg } from './data'
import FlipCard from './components/FlipCard'
import CardList from './components/CardList'
import InfoPanel from './components/InfoPanel'

export default function App() {
  const [open, setOpen] = useState(false)   // left list + right info visible
  const [index, setIndex] = useState(0)     // selected pokemon (list highlight + info)
  const [shown, setShown] = useState(0)     // pokemon currently printed on the card front
  const [front, setFront] = useState(false) // false = card back (image 2)
  const timer = useRef()

  useEffect(() => {
    cards.forEach((c) => { new Image().src = c.img })
    new Image().src = backImg
    return () => clearTimeout(timer.current)
  }, [])

  const choose = (i) => {
    clearTimeout(timer.current)
    setIndex(i)
    if (front && i !== shown) {
      setFront(false) // flip to back, swap the face, flip to front
      timer.current = setTimeout(() => { setShown(i); setFront(true) }, 450)
    } else {
      setShown(i); setFront(true)
    }
  }
  const step = (d) => choose((index + d + cards.length) % cards.length)
  const onCard = () => { if (!open) setOpen(true); else setFront((f) => !f) }
  const close = () => { clearTimeout(timer.current); setOpen(false); setFront(false) }

  const hint = !open ? 'Click the card to open the collection' : front ? 'Click the card to flip it back' : 'Click the card to flip it'

  return (
    <div className="stage" style={{ '--accent': cards[index].accent }}>
      <main className="row">
        <div className="col left">
          <AnimatePresence>{open && <CardList key="list" cards={cards} index={index} onSelect={choose} />}</AnimatePresence>
        </div>

        <div className="col center">
          <FlipCard card={cards[shown]} front={front} onClick={onCard} />
          <p className="hint">{hint}</p>
        </div>

        <div className="col right">
          <AnimatePresence>
            {open && <InfoPanel key="panel" card={cards[index]} index={index} total={cards.length} onPrev={() => step(-1)} onNext={() => step(1)} onClose={close} />}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
