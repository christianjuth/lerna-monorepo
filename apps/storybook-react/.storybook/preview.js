import { Theme } from '@christianjuth/react-is-lit'
import { DocsWrapper, StoryWrapper } from './Providers'

const LIT_HIDDEN_PROPS = [
  'renderOptions',
  'connectedCallback',
  'disconnectedCallback',
  'renderRoot',
  'isUpdatePending',
  'hasUpdated',
  'addController',
  'removeController',
  'attributeChangedCallback',
  'requestUpdate',
  'updateComplete',
  'render'
]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    exclude: [...LIT_HIDDEN_PROPS]
  },
  options: {
    storySort: {
      method: '',
      order: ['Getting Started', 'Layout', 'Atoms', 'Molecules', 'Organisms', 'Examples', 'Lit'],
      locales: '',
    },
  },
  docs: {
    container: DocsWrapper,
  },
}

export const decorators = [
  (Story, info) => info.title.indexOf('Lit') === 0 ? (
    <Theme>
      <Story />
    </Theme>
  ) : (
    <StoryWrapper>
      <Story />
    </StoryWrapper>
  )
]