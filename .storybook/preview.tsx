import React from 'react';
import type { Preview } from '@storybook/react';
import { JinniProvider } from '../src/components/_share/JinniProvider';
import '@/styles/color.scss';
import '@/styles/typography.scss';
import '@/styles/breakpoint.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    layout: 'centered',
    docs: {
      toc: { headingSelector: 'h2, h3' }
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Design System', 'Components']
      }
    }
  },
  decorators: [
    (Story) => (
      <JinniProvider>
        <Story />
      </JinniProvider>
    )
  ],
  argTypes: {
    className: {
      description: '추가 클래스',
      type: 'string'
    },
    style: {
      description: '스타일',
      table: { type: { summary: 'StyleType' } }
    }
  }
};

export default preview;
