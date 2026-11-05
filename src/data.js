const base = import.meta.env.BASE_URL
export const backImg = `${base}cards/back.png`
export const cards = [
  {
    id: 'lugia', name: 'Lugia EX', number: '102/113', type: 'Colorless', accent: '#5aa9ff',
    img: `${base}cards/lugia.png`, weak: 'Lightning ×2', resist: 'Fighting −20',
    stats: [{ label: 'HP', value: 180, max: 300 }, { label: 'Max damage', value: 120, max: 300 }, { label: 'Retreat cost', value: 2, max: 4 }],
    text: 'A Team Plasma Basic with the Overflow ability: if it is Knocked Out by an attack, you take 1 more Prize card. Plasma Gale hits for 120.'
  },
  {
    id: 'mewtwo', name: 'Mewtwo GX', number: '39/73', type: 'Psychic', accent: '#b084ff',
    img: `${base}cards/mewtwo.png`, weak: 'Psychic ×2', resist: 'None',
    stats: [{ label: 'HP', value: 190, max: 300 }, { label: 'Max damage', value: 200, max: 300 }, { label: 'Retreat cost', value: 2, max: 4 }],
    text: 'Full Burst scales with attached Energy, Super Absorption deals 60, and Psystrike GX hits for 200 while ignoring effects on your opponent’s Active Pokémon.'
  },
  {
    id: 'charizard', name: 'Charizard EX', number: 'XY17', type: 'Fire', accent: '#ff8a3d',
    img: `${base}cards/charizard.png`, weak: 'Water ×2', resist: 'None',
    stats: [{ label: 'HP', value: 180, max: 300 }, { label: 'Max damage', value: 120, max: 300 }, { label: 'Retreat cost', value: 3, max: 4 }],
    text: 'Mega Ascension searches your deck for M Charizard-EX. Brave Fire deals 120 damage but costs this Pokémon 30 damage to itself.'
  },
  {
    id: 'latias', name: 'Mega Latias ex', number: '100/132', type: 'Dragon', accent: '#f2c14e',
    img: `${base}cards/latias.png`, weak: 'None', resist: 'None',
    stats: [{ label: 'HP', value: 280, max: 300 }, { label: 'Max damage', value: 300, max: 300 }, { label: 'Retreat cost', value: 1, max: 4 }],
    text: 'The Mega-Evolved form of Latias. Strafe deals 40 and lets you switch it out; Illusory Impulse hits for 300 but discards all its Energy.'
  }
]
