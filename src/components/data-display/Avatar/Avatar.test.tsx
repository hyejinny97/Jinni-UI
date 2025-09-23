import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@/react-testing-tools';
import Avatar from './Avatar';
import dogImage1 from '@/assets/images/dog-1.jpg';
import { PersonIcon } from '@/components/icons/PersonIcon';

describe('<Avatar />', () => {
  it('renders image avatar', () => {
    render(<Avatar src={dogImage1} alt="강아지 아바타" />);
    const imageAvatar = screen.getByRole('img', { name: '강아지 아바타' });
    expect(imageAvatar).toBeInTheDocument();
  });

  it('renders image avatar with imgProps', () => {
    render(
      <Avatar
        src={dogImage1}
        alt="강아지 아바타"
        imgProps={{ width: 100, height: 100 }}
      />
    );
    const imageAvatar = screen.getByRole('img', { name: '강아지 아바타' });
    expect(imageAvatar).toHaveAttribute('width', '100');
    expect(imageAvatar).toHaveAttribute('height', '100');
  });

  it('renders letter avatar', () => {
    render(<Avatar>JN</Avatar>);
    const letterAvatar = screen.getByText('JN');
    expect(letterAvatar).toBeInTheDocument();
  });

  it('renders icon avatar', () => {
    render(
      <Avatar>
        <PersonIcon color="white" role="img" aria-label="사람 아바타" />
      </Avatar>
    );
    const iconAvatar = screen.getByRole('img', { name: '사람 아바타' });
    expect(iconAvatar).toBeInTheDocument();
  });

  it('renders different sizes', () => {
    render(
      <>
        <Avatar size="xs">N</Avatar>
        <Avatar size="sm">N</Avatar>
        <Avatar size="md">N</Avatar>
        <Avatar size="lg">N</Avatar>
        <Avatar size="xl">N</Avatar>
        <Avatar size={200}>N</Avatar>
      </>
    );
    const avatars = screen.getAllByText('N');
    expect(avatars.length).toBe(6);
  });

  it('renders different shapes', () => {
    render(
      <>
        <Avatar shape="circle">N</Avatar>
        <Avatar shape="square">N</Avatar>
        <Avatar shape="rounded">N</Avatar>
      </>
    );
    const avatars = screen.getAllByText('N');
    expect(avatars.length).toBe(3);
  });

  it('renders children when image loading fails (1st fallback)', () => {
    render(
      <Avatar src="./broken-image.png" alt="broken-image">
        children
      </Avatar>
    );

    const img = screen.getByRole('img', { name: 'broken-image' });
    fireEvent.error(img);

    const fallback = screen.getByText('children');
    expect(fallback).toBeInTheDocument();
  });

  it('renders alt when image loading fails and no children (2nd fallback)', () => {
    render(<Avatar src="./broken-image.png" alt="broken-image" />);

    const img = screen.getByRole('img', { name: 'broken-image' });
    fireEvent.error(img);

    const fallback = screen.getByText('broken-image');
    expect(fallback).toBeInTheDocument();
  });

  it('renders fallback icon when image loading fails and no children and no alt (3rd fallback)', () => {
    render(<Avatar src="./broken-image.png" />);

    const img = screen.getByRole('img');
    fireEvent.error(img);

    const fallbackIcon = screen.getByRole('img', { name: 'fallback icon' });
    expect(fallbackIcon).toBeInTheDocument();
  });
});
