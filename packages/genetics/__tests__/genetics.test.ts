import { evolve } from '../src/genetics'

function stringDistance(a: string, b: string) {
  let distance = 0
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] !== b[i]) {
      distance++
    }
  }
  return distance + Math.abs(a.length - b.length)
}

describe('evolve', () => {
  it('sentence "TO BE OR NOT TO BE"', () => {
    const TARGET = "TO BE OR NOT TO BE"

    const { result } = evolve<string>({
      geneRanges: Array(TARGET.length).fill([64,90]),
      spawn: (genes) => {
        return genes.map(charCode => {
          if (charCode >= 65) {
            return String.fromCharCode(charCode)
          } else {
            return " "
          }
        }).join('')
      },
      getFitness: (entity) => {
        return TARGET.length - stringDistance(entity, TARGET)
      },
      mutationRate: 0.1,
      log: false
    })

    expect(result).toBe(TARGET)
  });

  it('finds the optimal items to fill a backpack with', () => {
    type Item = {
      value: number,
      weight: number
    }

    const items: Record<string, Item> = {
      'baseball cap': { value: 100, weight: 70 },
      socks: { value: 10, weight: 38 },
      tissues: { value: 15, weight: 80 },
      mints: { value: 5, weight: 25 },
      phone: { value: 500, weight: 200 },
      headphones: { value: 150, weight: 160 },
      laptop: { value: 500, weight: 2200 },
      notepad: { value: 40, weight: 333, },
      'coffee mug': { value: 60, weight: 350 },
      'water bottle': { value: 30, weight: 192 }
    }

    const MAX_WEIGHT = 3000

    const { fitness } = evolve<Record<string, Item>>({
      geneRanges: Array(Object.keys(items).length).fill([0,1]),
      spawn: (genes) => {
        const itemsArray = Object.entries(items)
        const selectedItems: Record<string, Item> = {}
        genes.forEach((selected, index) => {
          if (selected === 1) {
            const [key, value] = itemsArray[index]
            selectedItems[key] = value
          }
        })
        return selectedItems
      },
      getFitness: (items) => {
        const totalWeight = Object.values(items).reduce((acc, item) => acc + item.weight, 0)
        const totalValue = Object.values(items).reduce((acc, item) => acc + item.value, 0)
        if (totalWeight > MAX_WEIGHT) {
          return -Infinity
        } else {
          return totalValue 
        }
      },
      mutationRate: 0.1
    }) 

    expect(fitness).toEqual(1310)
  })
});
