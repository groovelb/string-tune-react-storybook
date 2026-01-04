import type { Preview } from '@storybook/react';
import React from 'react';
import { StringTuneProvider } from '../src/components/string-tune';

const preview: Preview = {
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
        order: ['StringTune', ['Basic', 'Advanced', '*']],
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
