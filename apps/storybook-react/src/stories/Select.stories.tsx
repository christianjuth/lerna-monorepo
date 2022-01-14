import { Select } from '@christianjuth/ui'

const options = ['One', 'Two', 'Three', 'Four', 'Five']

function SelectExample() {
  return (
    <Select
      options={options.map(option => ({
        label: option,
        value: option
      }))}
    />
  )
}

export default { component: SelectExample };

export const BasicUsage = {};