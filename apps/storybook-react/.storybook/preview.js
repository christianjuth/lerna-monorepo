import { StoryWrapper, DocsWrapper } from './Providers'

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
      order: ['Getting Started', 'Layout', 'Atoms', 'Molecules', 'Organisms'], 
      locales: '', 
    },
  },
  docs: {
    container: DocsWrapper,
  },
}

export const decorators = [
  (Story) => (
    <StoryWrapper>
      <Story />
    </StoryWrapper>
  ),
]