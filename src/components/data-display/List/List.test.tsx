import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import { List, ListItem, ListItemButton } from '.';

describe('<List />', () => {
  it('renders list', () => {
    render(
      <List>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
      </List>
    );

    const list = screen.getByRole('list');
    const listItems = screen.getAllByRole('listitem');
    expect(list).toBeInTheDocument();
    expect(listItems.length).toBe(3);
  });

  it('renders clickable list', () => {
    render(
      <List as="nav">
        <ListItemButton>Item 1</ListItemButton>
        <ListItemButton>Item 2</ListItemButton>
        <ListItemButton>Item 3</ListItemButton>
      </List>
    );

    const list = screen.getByRole('navigation');
    const listItems = screen.getAllByRole('button');
    expect(list).toBeInTheDocument();
    expect(listItems.length).toBe(3);
  });
});
