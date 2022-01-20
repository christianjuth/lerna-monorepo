import { MultiSelect } from '@christianjuth/ui'
import { Meta } from '@storybook/react/types-6-0';

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

const meta: Meta = { component: MultiSelectExample, title: "Atoms/MultiSelect" };
export default meta;

export const BasicUsage = {};