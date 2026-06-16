import type { Preview } from '@storybook/react';
import JinniProvider, {
  createDesignSystem
} from '../src/components/JinniProvider';
import ChangeThemeContrastByStorage from './ChangeThemeContrastByStorage';

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
        order: [
          'Get Started',
          ['Introduction', 'All Components'],
          'Design System',
          [
            'Basic',
            'Theme',
            'Contrast',
            'Color',
            'Typography',
            'Breakpoint',
            'Overlay',
            'Box Shadow',
            'Elevation',
            'Font Weight',
            'Z-Index',
            'Round',
            '[Motion] Easing',
            '[Motion] Duration'
          ],
          'Components'
        ]
      }
    }
  },
  decorators: [
    (Story) => {
      const designSystem = createDesignSystem();
      return (
        <JinniProvider designSystem={designSystem}>
          <ChangeThemeContrastByStorage />
          <Story />
        </JinniProvider>
      );
    }
  ],
  argTypes: {
    className: {
      description: '추가 클래스',
      type: 'string'
    },
    style: {
      description: '스타일',
      table: { type: { summary: 'StyleType' } }
    },
    as: {
      description: 'root node (HTML Element, Component)',
      table: { type: { summary: 'AsType' } }
    }
  }
};

export default preview;
