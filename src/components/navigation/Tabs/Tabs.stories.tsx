import './TabsCustom.scss';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Tabs, { TabsProps } from './Tabs';
import Tab from './Tab';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { HomeIcon } from '@/components/icons/HomeIcon';
import { PersonIcon } from '@/components/icons/PersonIcon';
import { MailIcon } from '@/components/icons/MailIcon';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  argTypes: {
    color: {
      description: 'selected tab과 indicator의 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'primary'` }
      }
    },
    fullWidth: {
      description: 'true이면, 허용 가능한 너비에 동일한 비율로 꽉 채워짐',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: `false` }
      }
    },
    onChange: {
      description: 'selected tab value가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary:
            '(event: React.SyntheticEvent, value: string | number) => void'
        }
      }
    },
    orientation: {
      description: 'tabs의 정렬 방향',
      table: {
        type: { summary: `'horizontal' | 'vertical'` },
        defaultValue: { summary: `'horizontal'` }
      }
    },
    scrollable: {
      description: 'true이면, scrolling이 가능함',
      table: {
        type: { summary: `boolean` },
        defaultValue: { summary: `false` }
      }
    },
    scrollButtons: {
      description: 'scroll buttons이 나타나는 방식',
      table: {
        type: { summary: `'auto' | false | true` },
        defaultValue: { summary: `'auto'` }
      }
    },
    size: {
      description: 'tab의 크기',
      table: {
        type: { summary: `'sm' | 'md' | 'lg'` },
        defaultValue: { summary: `'md'` }
      }
    },
    value: {
      description: 'selected tab value',
      table: {
        type: { summary: `string | number` }
      }
    },
    variant: {
      description: 'tabs의 형태',
      table: {
        type: {
          summary: `{ selectedTab: VariantType, notSelectedTab: VariantType }`
        },
        defaultValue: {
          summary: `{ selectedTab: 'text', notSelectedTab: 'text' }`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Tabs>;

type TabItemsType = Array<{
  label: string;
  value?: string | number;
  disabled?: boolean;
  leftIcon?: React.ReactElement;
}>;

const TAB_ITEMS1: TabItemsType = [
  { label: 'ITEM ONE' },
  { label: 'ITEM TWO' },
  { label: 'ITEM THREE' }
];

const TAB_ITEMS2: TabItemsType = [
  { label: 'ITEM ONE', value: 'one' },
  { label: 'ITEM TWO', value: 'two' },
  { label: 'ITEM THREE', value: 'three' }
];

const TAB_ITEMS3: TabItemsType = [
  { label: 'ITEM ONE', value: 'one' },
  { label: 'ITEM TWO', value: 'two', disabled: true },
  { label: 'ITEM THREE', value: 'three' }
];

const TAB_ITEMS4: TabItemsType = [
  { label: 'HOME', value: 'home', leftIcon: <HomeIcon /> },
  { label: 'PROFILE', value: 'profile', leftIcon: <PersonIcon /> },
  { label: 'MAIL', value: 'mail', leftIcon: <MailIcon /> }
];

const MANY_TAB_ITEMS: TabItemsType = [
  { label: 'ITEM ONE', value: 'one' },
  { label: 'ITEM TWO', value: 'two' },
  { label: 'ITEM THREE', value: 'three' },
  { label: 'ITEM FOUR', value: 'four' },
  { label: 'ITEM FIVE', value: 'five' },
  { label: 'ITEM SIX', value: 'six' },
  { label: 'ITEM SEVEN', value: 'seven' },
  { label: 'ITEM EIGHT', value: 'eight' },
  { label: 'ITEM NINE', value: 'nine' },
  { label: 'ITEM TEN', value: 'ten' },
  { label: 'ITEM ELEVEN', value: 'eleven' },
  { label: 'ITEM TWELVE', value: 'twelve' },
  { label: 'ITEM THIRTEEN', value: 'thirteen' }
];

const Panel = ({ ...props }) => (
  <Box style={{ display: 'inline-block', padding: '20px' }} {...props} />
);

const TabsTemplate = ({
  tabItems,
  divStyle,
  ...rest
}: { tabItems: TabItemsType; divStyle?: React.CSSProperties } & Omit<
  TabsProps,
  'value'
>) => {
  const [selectedTabValue, setSelectedTabValue] = useState<string | number>(
    tabItems[0].value || 0
  );

  const handleChange = (_: React.SyntheticEvent, newValue: string | number) => {
    setSelectedTabValue(newValue);
  };

  return (
    <div style={{ width: '500px', ...divStyle }}>
      <Tabs value={selectedTabValue} onChange={handleChange} {...rest}>
        {tabItems.map((item) => (
          <Tab key={item.label} {...item}>
            {item.label}
          </Tab>
        ))}
      </Tabs>
      {tabItems.map((item, idx) => {
        if (!item.value) {
          return (
            selectedTabValue === idx && (
              <Panel key={item.label}>{item.label} panel</Panel>
            )
          );
        }
        return (
          selectedTabValue === item.value && (
            <Panel key={item.label}>{item.label} panel</Panel>
          )
        );
      })}
    </div>
  );
};

const NavTabsTemplate = () => {
  const query = new URLSearchParams(window.location.search);
  const selectedTabValue = query.get('value') || 'one';

  return (
    <>
      <Tabs value={selectedTabValue}>
        {TAB_ITEMS2.map((item) => (
          <Tab key={item.label} as="a" href={`?value=${item.value}`} {...item}>
            {item.label}
          </Tab>
        ))}
      </Tabs>
      {TAB_ITEMS2.map(
        (item) =>
          selectedTabValue === item.value && (
            <Panel key={item.label}>{item.label} panel</Panel>
          )
      )}
    </>
  );
};

export const BasicTabs: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <TabsTemplate tabItems={TAB_ITEMS1} {...args} />
      <TabsTemplate tabItems={TAB_ITEMS2} {...args} />
    </Stack>
  )
};

export const Variant: Story = {
  render: (args) => (
    <TabsTemplate
      tabItems={TAB_ITEMS2}
      variant={{
        selectedTab: 'subtle-filled',
        notSelectedTab: 'text'
      }}
      {...args}
    />
  )
};

export const Color: Story = {
  render: (args) => (
    <TabsTemplate tabItems={TAB_ITEMS2} color="yellow-500" {...args} />
  )
};

export const Disabled: Story = {
  render: (args) => <TabsTemplate tabItems={TAB_ITEMS3} {...args} />
};

export const Size: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <TabsTemplate tabItems={TAB_ITEMS2} size="sm" {...args} />
      <TabsTemplate tabItems={TAB_ITEMS2} size="md" {...args} />
      <TabsTemplate tabItems={TAB_ITEMS2} size="lg" {...args} />
    </Stack>
  )
};

export const FullWidth: Story = {
  render: (args) => <TabsTemplate tabItems={TAB_ITEMS2} fullWidth {...args} />
};

export const Scrollable: Story = {
  render: (args) => (
    <TabsTemplate tabItems={MANY_TAB_ITEMS} scrollable {...args} />
  )
};

export const ScrollButtons: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <TabsTemplate
        tabItems={MANY_TAB_ITEMS}
        scrollable
        scrollButtons="auto"
        {...args}
      />
      <TabsTemplate
        tabItems={MANY_TAB_ITEMS}
        scrollable
        scrollButtons
        {...args}
      />
      <TabsTemplate
        tabItems={MANY_TAB_ITEMS}
        scrollable
        scrollButtons={false}
        {...args}
      />
    </Stack>
  )
};

export const VerticalTabs: Story = {
  render: (args) => (
    <TabsTemplate
      tabItems={MANY_TAB_ITEMS}
      orientation="vertical"
      scrollable
      scrollButtons
      divStyle={{
        display: 'flex',
        height: '300px'
      }}
      {...args}
    />
  )
};

export const IconTabs: Story = {
  render: (args) => <TabsTemplate tabItems={TAB_ITEMS4} {...args} />
};

export const NavTabs: Story = {
  render: (args) => <NavTabsTemplate {...args} />
};

export const Customization: Story = {
  render: (args) => (
    <TabsTemplate className="tabs-custom" tabItems={TAB_ITEMS2} {...args} />
  )
};
