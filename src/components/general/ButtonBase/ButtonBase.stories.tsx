import './ButtonBaseCustom.scss';
import cn from 'classnames';
import type { Meta, StoryObj } from '@storybook/react';
import ButtonBase from './ButtonBase';
import { Stack } from '@/components/layout/Stack';

const meta: Meta<typeof ButtonBase> = {
  component: ButtonBase,
  argTypes: {
    children: {
      description: '버튼 내부 내용(label)'
    },
    disabled: {
      description: 'true이면, 비활성화됨',
      defaultValue: { summary: 'false' }
    },
    disableOverlay: {
      description: 'true이면, overlay가 나타나지 않음',
      defaultValue: { summary: 'false' }
    },
    disableRipple: {
      description: 'true이면, ripple effect가 비활성화됨',
      type: 'boolean',
      defaultValue: { summary: 'false' }
    },
    elevation: {
      description: 'elevation(box-shadow) 정도'
    },
    href: {
      description: '링크 url (a 태그로 반환해줌)'
    },
    overlayColor: {
      description: 'overlay 색상',
      table: {
        type: { summary: `'black' | 'white'` },
        defaultValue: { summary: `'black'` }
      }
    },
    rippleColor: {
      description: 'ripple 색상',
      table: {
        type: { summary: `'black' | 'white'` },
        defaultValue: { summary: `'black'` }
      }
    },
    rippleStartLocation: {
      description: 'ripple 시작점',
      table: {
        type: { summary: `'center' | 'clicked'` },
        defaultValue: { summary: `'clicked'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof ButtonBase>;

const BUTTON_STYLE = { padding: '8px 16px' };

const ComplexButtonTemplate = () => {
  const FOODS = [
    {
      type: 'Korean Food',
      imageSrc:
        'https://cdn.foodnews.co.kr/news/photo/201406/51074_8016_4424.jpg'
    },
    {
      type: 'Chinese food',
      imageSrc:
        'https://img.etoday.co.kr/pto_db/2024/10/20241014163438_2088728_600_394.jpg'
    },
    {
      type: 'Japanese food',
      imageSrc:
        'https://jstart.co.kr/data/editor/2204/20220411161255_d95e74c5fa579b9bd7b9c94b445cf7fc_5zeb.jpg'
    }
  ];

  return (
    <>
      {FOODS.map(({ type, imageSrc }) => {
        return (
          <ButtonBase key={type} className={cn('complex-button', type)}>
            <span
              className="image"
              style={{ backgroundImage: `url(${imageSrc})` }}
            />
            <span className="title">{type}</span>
          </ButtonBase>
        );
      })}
    </>
  );
};

export const BasicButtonBase: Story = {
  render: (args) => <ButtonBase {...args}>Label</ButtonBase>
};

export const LinkButton: Story = {
  render: (args) => (
    <ButtonBase href="#" style={BUTTON_STYLE} {...args}>
      Label
    </ButtonBase>
  )
};

export const OverlayColor: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <ButtonBase overlayColor="black" style={BUTTON_STYLE} {...args}>
        Button Base
      </ButtonBase>
      <ButtonBase
        overlayColor="white"
        style={{
          ...BUTTON_STYLE,
          backgroundColor: 'primary',
          color: 'white'
        }}
        {...args}
      >
        Button Base
      </ButtonBase>
    </Stack>
  )
};

export const DisableOverlay: Story = {
  render: (args) => (
    <ButtonBase disableOverlay style={BUTTON_STYLE} {...args}>
      Button Base
    </ButtonBase>
  )
};

export const RippleColor: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <ButtonBase rippleColor="black" style={BUTTON_STYLE} {...args}>
        Button Base
      </ButtonBase>
      <ButtonBase
        rippleColor="white"
        style={{
          ...BUTTON_STYLE,
          backgroundColor: 'primary',
          color: 'white'
        }}
        {...args}
      >
        Button Base
      </ButtonBase>
    </Stack>
  )
};

export const DisableRipple: Story = {
  render: (args) => (
    <ButtonBase disableRipple style={BUTTON_STYLE} {...args}>
      Button Base
    </ButtonBase>
  )
};

export const RippleStartLocation: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <ButtonBase rippleStartLocation="clicked" style={BUTTON_STYLE} {...args}>
        Button Base
      </ButtonBase>
      <ButtonBase rippleStartLocation="center" style={BUTTON_STYLE} {...args}>
        Button Base
      </ButtonBase>
    </Stack>
  )
};

export const Elevation: Story = {
  render: (args) => (
    <ButtonBase elevation={3} disableOverlay style={BUTTON_STYLE} {...args}>
      Button Base
    </ButtonBase>
  )
};

export const Disabled: Story = {
  render: (args) => (
    <ButtonBase elevation={3} disabled style={BUTTON_STYLE} {...args}>
      Button Base
    </ButtonBase>
  )
};

export const ComplexButton: Story = {
  render: (args) => <ComplexButtonTemplate {...args} />
};
