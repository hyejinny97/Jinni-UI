import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@/tests/react-testing-tools';
import { Tabs, TabList, Tab, TabPanel } from '.';

describe('<Tabs />', () => {
  it('render tabs', () => {
    render(
      <Tabs defaultValue="one">
        <TabList>
          <Tab value="one">ITEM ONE</Tab>
          <Tab value="two">ITEM TWO</Tab>
          <Tab value="three">ITEM THREE</Tab>
        </TabList>
        <TabPanel value="one">ITEM ONE Panel</TabPanel>
        <TabPanel value="two">ITEM TWO Panel</TabPanel>
        <TabPanel value="three">ITEM THREE Panel</TabPanel>
      </Tabs>
    );

    const tabList = screen.getByRole('tablist');
    const tabItems = screen.getAllByRole('tab');
    const tabPanel = screen.getByRole('tabpanel');
    expect(tabList).toBeInTheDocument();
    expect(tabItems.length).toBe(3);
    expect(tabItems[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabPanel).toHaveTextContent('ITEM ONE Panel');

    fireEvent.click(tabItems[1]);
    expect(tabItems[0]).toHaveAttribute('aria-selected', 'false');
    expect(tabItems[1]).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('ITEM TWO Panel');
  });

  it('render tabs with disabled tab', () => {
    render(
      <Tabs defaultValue="one">
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
    );

    const tabList = screen.getByRole('tablist');
    const tabItems = screen.getAllByRole<HTMLButtonElement>('tab');
    expect(tabList).toBeInTheDocument();
    expect(tabItems.length).toBe(3);
    expect(tabItems[1].disabled).toBeTruthy();
  });
});
