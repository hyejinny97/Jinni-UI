import type { Meta, StoryObj } from '@storybook/react';
import AutocompleteOption from './AutocompleteOption';
import { StoryErrorBoundary } from '@/components/_share/StoryErrorBoundary';

const meta: Meta<typeof AutocompleteOption> = {
  component: AutocompleteOption,
  argTypes: {
    children: {
      description: '메뉴 내 option의 content',
      table: {
        type: { summary: `React.ReactNode` }
      }
    },
    label: {
      description:
        '해당 option이 선택될 때 입력란에 보여질 label (Autocomplete 내에서 inputValue 값과 비교되는 값)',
      table: {
        type: { summary: `string` }
      }
    },
    value: {
      description: '다른 options와 구별되는 식별자',
      table: {
        type: { summary: `string | number` }
      }
    }
  },
  decorators: [
    (Story) => (
      <StoryErrorBoundary>
        <Story />
      </StoryErrorBoundary>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof AutocompleteOption>;

export const BasicAutocompleteOption: Story = {};
