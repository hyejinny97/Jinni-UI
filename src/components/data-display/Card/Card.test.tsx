import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import { Card, CardHeader, CardBody, CardFooter } from '.';

describe('<Card />', () => {
  it('renders card', () => {
    render(
      <Card data-testid="card">
        <CardHeader>Card Header</CardHeader>
        <CardBody>Card Body</CardBody>
        <CardFooter>Card Footer</CardFooter>
      </Card>
    );

    const card = screen.getByTestId('card');
    const cardHeader = screen.getByText('Card Header');
    const cardBody = screen.getByText('Card Body');
    const cardFooter = screen.getByText('Card Footer');
    expect(card).toBeInTheDocument();
    expect(cardHeader).toBeInTheDocument();
    expect(cardBody).toBeInTheDocument();
    expect(cardFooter).toBeInTheDocument();
  });
});
