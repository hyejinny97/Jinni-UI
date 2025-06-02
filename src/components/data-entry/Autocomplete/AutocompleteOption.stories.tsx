import type { Meta, StoryObj } from '@storybook/react';
import AutocompleteOption from './AutocompleteOption';

const meta: Meta<typeof AutocompleteOption> = {
  component: AutocompleteOption,
  argTypes: {
    children: {
      description: 'option content',
      table: {
        type: { summary: `React.ReactNode` }
      }
    },
    value: {
      description: 'option의 value',
      table: {
        type: { summary: `string` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof AutocompleteOption>;

export const BasicAutocompleteOption: Story = {};
