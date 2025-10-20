import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import Stack from './Stack';
import { Divider } from '@/components/layout/Divider';

const Item = ({ children }: { children: React.ReactNode }) => (
  <li>{children}</li>
);

describe('<Stack />', () => {
  it('render items', () => {
    render(
      <Stack as="ul">
        <Item>1</Item>
        <Item>2</Item>
        <Item>3</Item>
      </Stack>
    );
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(3);
  });

  it('space between items', () => {
    render(
      <Stack as="ul" spacing={10}>
        <Item>1</Item>
        <Item>2</Item>
        <Item>3</Item>
      </Stack>
    );
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(3);
  });

  it('render items in different directions', () => {
    render(
      <>
        <Stack as="ul" direction="row">
          <Item>1</Item>
          <Item>2</Item>
          <Item>3</Item>
        </Stack>
        <Stack as="ul" direction="row-reverse">
          <Item>1</Item>
          <Item>2</Item>
          <Item>3</Item>
        </Stack>
        <Stack as="ul" direction="column">
          <Item>1</Item>
          <Item>2</Item>
          <Item>3</Item>
        </Stack>
        <Stack as="ul" direction="column-reverse">
          <Item>1</Item>
          <Item>2</Item>
          <Item>3</Item>
        </Stack>
      </>
    );
    const stacks = screen.getAllByRole('list');
    expect(stacks.length).toBe(4);
  });

  it('render divider between items', () => {
    render(
      <Stack as="ul" divider={<Divider role="separator" />}>
        <Item>1</Item>
        <Item>2</Item>
        <Item>3</Item>
      </Stack>
    );
    const dividers = screen.getAllByRole('separator');
    expect(dividers.length).toBe(2);
  });
});
