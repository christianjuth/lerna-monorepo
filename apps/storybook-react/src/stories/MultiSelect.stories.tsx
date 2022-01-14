import { MultiSelect } from '@christianjuth/ui'

const options = ['One', 'Two', 'Three', 'Four', 'Five']

function MultiSelectExample() {
  return (
    <MultiSelect 
      title='Multi Select'
      options={options.map(option => ({
        label: option,
        value: option
      }))}
    />
  )
}

export default { component: MultiSelectExample };

export const BasicUsage = {};