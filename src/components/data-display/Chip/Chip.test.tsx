import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import { userEvent } from '@testing-library/user-event';
import Chip from './Chip';
import { Avatar } from '@/components/data-display/Avatar';
import { ButtonBase } from '@/components/general/ButtonBase';
import { CancelIcon } from '@/components/icons/CancelIcon';
import dogImage from '@/assets/images/dog-1.jpg';

describe('<Chip />', () => {
  it('renders chip', () => {
    render(<Chip>chip</Chip>);
    const chip = screen.getByText('chip');
    expect(chip).toBeInTheDocument();
  });

  it('renders chip with startAdornment', () => {
    render(
      <Chip startAdornment={<Avatar src={dogImage} alt="강아지 사진" />}>
        chip
      </Chip>
    );
    const chip = screen.getByText('chip');
    const avatar = screen.getByRole('img');
    expect(chip).toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
  });

  it('renders chip with endAdornment', () => {
    render(
      <Chip endAdornment={<CancelIcon data-testid="cancel icon" />}>chip</Chip>
    );
    const icon = screen.getByTestId('cancel icon');
    expect(icon).toBeInTheDocument();
  });

  it('renders clickable chip', async () => {
    const handleClick = vi.fn();
    render(
      <Chip as={ButtonBase} onClick={handleClick}>
        chip
      </Chip>
    );

    const chip = screen.getByText('chip');
    const button = screen.getByRole('button');
    expect(chip).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    await userEvent.click(chip);
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders deletable chip', async () => {
    const handleDelete = vi.fn();
    render(
      <Chip
        endAdornment={
          <ButtonBase aria-label="delete chip" onClick={handleDelete}>
            <CancelIcon />
          </ButtonBase>
        }
      >
        chip
      </Chip>
    );

    const chip = screen.getByText('chip');
    const deleteButton = screen.getByRole('button', { name: 'delete chip' });
    expect(chip).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    await userEvent.click(deleteButton);
    expect(handleDelete).toHaveBeenCalled();
  });

  it('renders link chip', () => {
    render(
      <Chip as="a" href="#">
        chip
      </Chip>
    );
    const link = screen.getByRole('link', { name: 'chip' });
    expect(link).toBeInTheDocument();
  });

  it('renders different variants', () => {
    render(
      <>
        <Chip variant="filled">chip</Chip>
        <Chip variant="subtle-filled">chip</Chip>
        <Chip variant="outlined">chip</Chip>
        <Chip variant="text">chip</Chip>
      </>
    );
    const chips = screen.getAllByText('chip');
    expect(chips.length).toBe(4);
  });

  it('renders different shapes', () => {
    render(
      <>
        <Chip shape="pill">chip</Chip>
        <Chip shape="rounded">chip</Chip>
      </>
    );
    const chips = screen.getAllByText('chip');
    expect(chips.length).toBe(2);
  });

  it('renders different colors', () => {
    render(
      <>
        <Chip color="primary">chip</Chip>
        <Chip color="yellow-400">chip</Chip>
        <Chip color="green">chip</Chip>
        <Chip color="#159">chip</Chip>
        <Chip color="rgb(100,100,100)">chip</Chip>
      </>
    );
    const chips = screen.getAllByText('chip');
    expect(chips.length).toBe(5);
  });

  it('renders different sizes', () => {
    render(
      <>
        <Chip size="sm">chip</Chip>
        <Chip size="md">chip</Chip>
        <Chip size="lg">chip</Chip>
      </>
    );
    const chips = screen.getAllByText('chip');
    expect(chips.length).toBe(3);
  });
});
