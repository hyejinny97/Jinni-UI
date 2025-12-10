import './TabsCustom.scss';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabList, Tab, TabPrevButton, TabNextButton, TabPanel } from '.';
import { Stack } from '@/components/layout/Stack';
import { Alert } from '@/components/feedback/Alert';
import { Radio } from '@/components/data-entry/Radio';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Label } from '@/components/data-entry/Label';
import { HomeIcon } from '@/components/icons/HomeIcon';
import { PersonIcon } from '@/components/icons/PersonIcon';
import { MailIcon } from '@/components/icons/MailIcon';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  argTypes: {
    children: {
      description: `tab과 관련된 컴포넌트들 (Tabs, Tab, TabPanel, TabsPrevButton, TabsNextButton 등)`,
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    defaultValue: {
      description: '초기 selected tab value',
      table: {
        type: { summary: 'string | number' }
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
    tabListOrientation: {
      description: 'TabList의 정렬 방향',
      table: {
        type: { summary: `'horizontal' | 'vertical'` },
        defaultValue: { summary: `'horizontal'` }
      }
    },
    tabSize: {
      description: 'tab 크기',
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
    }
  }
};

export default meta;
type Story = StoryObj<typeof Tabs>;

type TabItemsType = Array<{
  label: string;
  value: string | number;
}>;

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

const ControlledTabsTemplate = () => {
  const [selectedTabValue, setSelectedTabValue] = useState<string | number>(
    'one'
  );

  const handleChange = (_: React.SyntheticEvent, newValue: string | number) => {
    setSelectedTabValue(newValue);
  };

  return (
    <Stack spacing={20}>
      <Alert>{`Selected tab value: ${selectedTabValue}`}</Alert>
      <Tabs value={selectedTabValue} onChange={handleChange}>
        <TabList>
          <Tab value="one">ITEM ONE</Tab>
          <Tab value="two">ITEM TWO</Tab>
          <Tab value="three">ITEM THREE</Tab>
        </TabList>
        <TabPanel value="one">ITEM ONE Panel</TabPanel>
        <TabPanel value="two">ITEM TWO Panel</TabPanel>
        <TabPanel value="three">ITEM THREE Panel</TabPanel>
      </Tabs>
    </Stack>
  );
};

const TabSizeTemplate = () => {
  const SIZES = ['sm', 'md', 'lg'] as const;
  const [tabSize, setTabSize] = useState<(typeof SIZES)[number]>('md');
  const [selectedTabValue, setSelectedTabValue] = useState<string | number>(
    'one'
  );

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTabSize(event.target.value as (typeof SIZES)[number]);
  };
  const handleTabChange = (
    _: React.SyntheticEvent,
    newValue: string | number
  ) => {
    setSelectedTabValue(newValue);
  };

  return (
    <Stack spacing={10} style={{ width: '500px' }}>
      <RadioGroup name="tabSize" value={tabSize} onChange={handleSizeChange}>
        <Stack direction="row">
          {SIZES.map((size) => (
            <Label key={size} content={size}>
              <Radio value={size} />
            </Label>
          ))}
        </Stack>
      </RadioGroup>
      <Tabs
        value={selectedTabValue}
        onChange={handleTabChange}
        tabSize={tabSize}
      >
        <TabList>
          <Tab value="one">ITEM ONE</Tab>
          <Tab value="two">ITEM TWO</Tab>
          <Tab value="three">ITEM THREE</Tab>
        </TabList>
        <TabPanel value="one">ITEM ONE Panel</TabPanel>
        <TabPanel value="two">ITEM TWO Panel</TabPanel>
        <TabPanel value="three">ITEM THREE Panel</TabPanel>
      </Tabs>
    </Stack>
  );
};

const NavTabsTemplate = () => {
  const query = new URLSearchParams(window.location.search);
  const selectedTabValue = query.get('value') || 'one';

  return (
    <Tabs value={selectedTabValue}>
      <TabList>
        <Tab value="one" href="?value=one">
          ITEM ONE
        </Tab>
        <Tab value="two" href="?value=two">
          ITEM TWO
        </Tab>
        <Tab value="three" href="?value=three">
          ITEM THREE
        </Tab>
      </TabList>
      <TabPanel value="one">ITEM ONE Panel</TabPanel>
      <TabPanel value="two">ITEM TWO Panel</TabPanel>
      <TabPanel value="three">ITEM THREE Panel</TabPanel>
    </Tabs>
  );
};

export const BasicTabs: Story = {
  render: (args) => (
    <Tabs defaultValue="one" {...args}>
      <TabList>
        <Tab value="one">ITEM ONE</Tab>
        <Tab value="two">ITEM TWO</Tab>
        <Tab value="three">ITEM THREE</Tab>
      </TabList>
      <TabPanel value="one">ITEM ONE Panel</TabPanel>
      <TabPanel value="two">ITEM TWO Panel</TabPanel>
      <TabPanel value="three">ITEM THREE Panel</TabPanel>
    </Tabs>
  )
};

export const ControlledTabs: Story = {
  render: () => <ControlledTabsTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledTabsTemplate = () => {
  const [selectedTabValue, setSelectedTabValue] = useState<string | number>(
    'one'
  );

  const handleChange = (_: React.SyntheticEvent, newValue: string | number) => {
    setSelectedTabValue(newValue);
  };

  return (
    <Stack spacing={20}>
      <Alert>{\`Selected tab value: \${selectedTabValue}\`}</Alert>
      <Tabs value={selectedTabValue} onChange={handleChange}>
        <TabList>
          <Tab value="one">ITEM ONE</Tab>
          <Tab value="two">ITEM TWO</Tab>
          <Tab value="three">ITEM THREE</Tab>
        </TabList>
        <TabPanel value="one">ITEM ONE Panel</TabPanel>
        <TabPanel value="two">ITEM TWO Panel</TabPanel>
        <TabPanel value="three">ITEM THREE Panel</TabPanel>
      </Tabs>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const Variant: Story = {
  render: (args) => (
    <Tabs defaultValue="one" {...args}>
      <TabList variant={{ selectedTab: 'subtle-filled', tab: 'text' }}>
        <Tab value="one">ITEM ONE</Tab>
        <Tab value="two">ITEM TWO</Tab>
        <Tab value="three">ITEM THREE</Tab>
      </TabList>
      <TabPanel value="one">ITEM ONE Panel</TabPanel>
      <TabPanel value="two">ITEM TWO Panel</TabPanel>
      <TabPanel value="three">ITEM THREE Panel</TabPanel>
    </Tabs>
  )
};

export const Size: Story = {
  render: () => <TabSizeTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const TabSizeTemplate = () => {
  const SIZES = ['sm', 'md', 'lg'] as const;
  const [tabSize, setTabSize] = useState<(typeof SIZES)[number]>('md');
  const [selectedTabValue, setSelectedTabValue] = useState<string | number>(
    'one'
  );

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTabSize(event.target.value as (typeof SIZES)[number]);
  };
  const handleTabChange = (
    _: React.SyntheticEvent,
    newValue: string | number
  ) => {
    setSelectedTabValue(newValue);
  };

  return (
    <Stack spacing={10} style={{ width: '500px' }}>
      <RadioGroup name="tabSize" value={tabSize} onChange={handleSizeChange}>
        <Stack direction="row">
          {SIZES.map((size) => (
            <Label key={size} content={size}>
              <Radio value={size} />
            </Label>
          ))}
        </Stack>
      </RadioGroup>
      <Tabs
        value={selectedTabValue}
        onChange={handleTabChange}
        tabSize={tabSize}
      >
        <TabList>
          <Tab value="one">ITEM ONE</Tab>
          <Tab value="two">ITEM TWO</Tab>
          <Tab value="three">ITEM THREE</Tab>
        </TabList>
        <TabPanel value="one">ITEM ONE Panel</TabPanel>
        <TabPanel value="two">ITEM TWO Panel</TabPanel>
        <TabPanel value="three">ITEM THREE Panel</TabPanel>
      </Tabs>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const Color: Story = {
  render: (args) => (
    <Tabs defaultValue="one" {...args}>
      <TabList color="yellow-400">
        <Tab value="one">ITEM ONE</Tab>
        <Tab value="two">ITEM TWO</Tab>
        <Tab value="three">ITEM THREE</Tab>
      </TabList>
      <TabPanel value="one">ITEM ONE Panel</TabPanel>
      <TabPanel value="two">ITEM TWO Panel</TabPanel>
      <TabPanel value="three">ITEM THREE Panel</TabPanel>
    </Tabs>
  )
};

export const FullWidth: Story = {
  render: (args) => (
    <Tabs defaultValue="one" style={{ width: '500px' }} {...args}>
      <TabList fullWidth>
        <Tab value="one">ITEM ONE</Tab>
        <Tab value="two">ITEM TWO</Tab>
        <Tab value="three">ITEM THREE</Tab>
      </TabList>
      <TabPanel value="one">ITEM ONE Panel</TabPanel>
      <TabPanel value="two">ITEM TWO Panel</TabPanel>
      <TabPanel value="three">ITEM THREE Panel</TabPanel>
    </Tabs>
  )
};

export const Disabled: Story = {
  render: (args) => (
    <Tabs defaultValue="one" {...args}>
      <TabList>
        <Tab value="one">ITEM ONE</Tab>
        <Tab value="two" disabled>
          ITEM TWO
        </Tab>
        <Tab value="three">ITEM THREE</Tab>
      </TabList>
      <TabPanel value="one">ITEM ONE Panel</TabPanel>
      <TabPanel value="two">ITEM TWO Panel</TabPanel>
      <TabPanel value="three">ITEM THREE Panel</TabPanel>
    </Tabs>
  )
};

export const OverlayEffect: Story = {
  render: (args) => (
    <Tabs defaultValue="one" {...args}>
      <TabList disableOverlay>
        <Tab value="one">ITEM ONE</Tab>
        <Tab value="two">ITEM TWO</Tab>
        <Tab value="three">ITEM THREE</Tab>
      </TabList>
      <TabPanel value="one">ITEM ONE Panel</TabPanel>
      <TabPanel value="two">ITEM TWO Panel</TabPanel>
      <TabPanel value="three">ITEM THREE Panel</TabPanel>
    </Tabs>
  )
};

export const RippleEffect: Story = {
  render: (args) => (
    <Tabs defaultValue="one" {...args}>
      <TabList rippleStartLocation="center">
        <Tab value="one">ITEM ONE</Tab>
        <Tab value="two">ITEM TWO</Tab>
        <Tab value="three">ITEM THREE</Tab>
      </TabList>
      <TabPanel value="one">ITEM ONE Panel</TabPanel>
      <TabPanel value="two">ITEM TWO Panel</TabPanel>
      <TabPanel value="three">ITEM THREE Panel</TabPanel>
    </Tabs>
  )
};

export const IconTabs: Story = {
  render: (args) => (
    <Tabs defaultValue="home" {...args}>
      <TabList>
        <Tab value="home" startAdornment={<HomeIcon color="gray-600" />}>
          HOME
        </Tab>
        <Tab value="profile" startAdornment={<PersonIcon color="gray-600" />}>
          PROFILE
        </Tab>
        <Tab value="mail" startAdornment={<MailIcon color="gray-600" />}>
          MAIL
        </Tab>
      </TabList>
      <TabPanel value="home">HOME Panel</TabPanel>
      <TabPanel value="profile">PROFILE Panel</TabPanel>
      <TabPanel value="mail">MAIL Panel</TabPanel>
    </Tabs>
  )
};

export const NavTabs: Story = {
  render: () => <NavTabsTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const NavTabsTemplate = () => {
  const query = new URLSearchParams(window.location.search);
  const selectedTabValue = query.get('value') || 'one';

  return (
    <Tabs value={selectedTabValue}>
      <TabList>
        <Tab value="one" href="?value=one">
          ITEM ONE
        </Tab>
        <Tab value="two" href="?value=two">
          ITEM TWO
        </Tab>
        <Tab value="three" href="?value=three">
          ITEM THREE
        </Tab>
      </TabList>
      <TabPanel value="one">ITEM ONE Panel</TabPanel>
      <TabPanel value="two">ITEM TWO Panel</TabPanel>
      <TabPanel value="three">ITEM THREE Panel</TabPanel>
    </Tabs>
  );
};`.trim()
      }
    }
  }
};

export const Scrollable: Story = {
  render: (args) => (
    <Tabs defaultValue="eleven" style={{ width: '600px' }} {...args}>
      <TabList scrollable>
        {MANY_TAB_ITEMS.map((item) => (
          <Tab key={item.value} value={item.value}>
            {item.label}
          </Tab>
        ))}
      </TabList>
      {MANY_TAB_ITEMS.map((item) => (
        <TabPanel key={item.value} value={item.value}>
          {`${item.label} Panel`}
        </TabPanel>
      ))}
    </Tabs>
  )
};

export const ScrollButtons: Story = {
  render: (args) => (
    <Tabs defaultValue="eleven" style={{ width: '600px' }} {...args}>
      <Stack direction="row">
        <TabPrevButton />
        <TabList scrollable>
          {MANY_TAB_ITEMS.map((item) => (
            <Tab key={item.value} value={item.value}>
              {item.label}
            </Tab>
          ))}
        </TabList>
        <TabNextButton />
      </Stack>
      {MANY_TAB_ITEMS.map((item) => (
        <TabPanel key={item.value} value={item.value}>
          {`${item.label} Panel`}
        </TabPanel>
      ))}
    </Tabs>
  )
};

export const CustomScrollButtons: Story = {
  render: (args) => (
    <Tabs defaultValue="eleven" style={{ width: '600px' }} {...args}>
      <Stack direction="row" spacing={10}>
        <TabList scrollable>
          {MANY_TAB_ITEMS.map((item) => (
            <Tab key={item.value} value={item.value}>
              {item.label}
            </Tab>
          ))}
        </TabList>
        <Stack direction="row" spacing={5}>
          <TabPrevButton
            variant="filled"
            color="primary"
            style={{
              width: 'max-content',
              padding: '6px 16px',
              borderRadius: '4px'
            }}
          >
            Prev
          </TabPrevButton>
          <TabNextButton
            variant="filled"
            color="primary"
            style={{
              width: 'max-content',
              padding: '6px 16px',
              borderRadius: '4px'
            }}
          >
            Next
          </TabNextButton>
        </Stack>
      </Stack>
      {MANY_TAB_ITEMS.map((item) => (
        <TabPanel key={item.value} value={item.value}>
          {`${item.label} Panel`}
        </TabPanel>
      ))}
    </Tabs>
  )
};

export const TabListOrientation: Story = {
  render: (args) => (
    <Tabs
      defaultValue="eleven"
      tabListOrientation="vertical"
      style={{ display: 'flex', width: '600px' }}
      {...args}
    >
      <Stack>
        <TabPrevButton fullWidth />
        <TabList scrollable style={{ maxHeight: '200px' }}>
          {MANY_TAB_ITEMS.map((item) => (
            <Tab key={item.value} value={item.value}>
              {item.label}
            </Tab>
          ))}
        </TabList>
        <TabNextButton fullWidth />
      </Stack>
      {MANY_TAB_ITEMS.map((item) => (
        <TabPanel key={item.value} value={item.value}>
          {`${item.label} Panel`}
        </TabPanel>
      ))}
    </Tabs>
  )
};

export const CustomizeTabs: Story = {
  render: (args) => (
    <Tabs
      className="tabs-custom"
      defaultValue="one"
      style={{ width: '600px' }}
      {...args}
    >
      <TabList>
        <Tab value="one">ITEM ONE</Tab>
        <Tab value="two">ITEM TWO</Tab>
        <Tab value="three">ITEM THREE</Tab>
      </TabList>
      <TabPanel value="one">ITEM ONE Panel</TabPanel>
      <TabPanel value="two">ITEM TWO Panel</TabPanel>
      <TabPanel value="three">ITEM THREE Panel</TabPanel>
    </Tabs>
  )
};
