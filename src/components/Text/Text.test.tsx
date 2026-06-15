import { describe, expect, it } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import Text from './Text';

describe('<Text />', () => {
  it('render text with different root node', () => {
    render(
      <>
        <Text>default</Text>
        <Text as="h1">h1</Text>
        <Text as="h2">h2</Text>
        <Text as="h3">h3</Text>
      </>
    );

    const defaultElement = screen.getByText('default');
    expect(defaultElement.tagName).toBe('P');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('h1');
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('h2');
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('h3');
  });
});
