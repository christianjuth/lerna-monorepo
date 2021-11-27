# `@christianjuth/genetics`

A flexible genetics algorithm.

[Demo](https://npm.christianjuth.com/genetics)

### Evolving a sentence

```javascript
import { evolve } from '@christianjuth/genetics';

const TARGET = "TO BE OR NOT TO BE";

const { result, fitness, generations } = evolve<string>({
  geneRanges: Array(TARGET.length).fill([64,90]),
  spawn: (genes) => {
    return genes.map(charCode => {
      if (charCode >= 65) {
        return String.fromCharCode(charCode)
      } else {
        // Shhhh we are pretending 64 
        // is the char code for a space
        return " "
      }
    }).join('')
  },
  getFitness: (entity) => {
    return TARGET.length - stringDistance(entity, TARGET)
  },
  mutationRate: 0.1,
  log: false
});

console.log();
```

### Solving the backpack problem

```javascript
import { evolve } from '@christianjuth/genetics';

const items = {
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

const { fitness } = evolve({
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
```