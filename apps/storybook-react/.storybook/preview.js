import { Providers } from './Providers'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      method: '',
      order: ['Theming', 'GridSystem', 'Atoms'], 
      locales: '', 
    },
  },
}

export const decorators = [
  (Story) => (
    <Providers>
      <Story />
    </Providers>
  ),
]