import React from 'react';
import { StringTuneProvider } from '../src/components/string-tune';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Essential', 'StringTune', ['Basic', 'Advanced', '*']],
      },
    },
  },
  decorators: [
    (Story) => (
      <StringTuneProvider debug={false}>
        <Story />
      </StringTuneProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default preview;
