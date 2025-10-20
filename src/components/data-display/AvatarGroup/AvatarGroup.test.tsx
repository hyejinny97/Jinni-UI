import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import AvatarGroup from './AvatarGroup';
import { Avatar } from '@/components/data-display/Avatar';

describe('<AvatarGroup />', () => {
  it('render avatars', () => {
    render(
      <AvatarGroup>
        <Avatar>A</Avatar>
        <Avatar>B</Avatar>
        <Avatar>C</Avatar>
      </AvatarGroup>
    );
    const visibleAvatars = screen.getAllByText(/^[ABC]$/);
    expect(visibleAvatars.length).toBe(3);
  });

  it('renders only max avatars and surplus avatar', () => {
    render(
      <AvatarGroup max={2}>
        <Avatar>A</Avatar>
        <Avatar>B</Avatar>
        <Avatar>C</Avatar>
      </AvatarGroup>
    );
    const visibleAvatars = screen.getAllByText(/^[ABC]$/);
    const surplusAvatar = screen.getByText('+1');
    expect(visibleAvatars.length).toBe(2);
    expect(surplusAvatar).toBeInTheDocument();
  });

  it('renders total avatars and surplus avatar', () => {
    render(
      <AvatarGroup total={5}>
        <Avatar>A</Avatar>
        <Avatar>B</Avatar>
        <Avatar>C</Avatar>
      </AvatarGroup>
    );
    const visibleAvatars = screen.getAllByText(/^[ABC]$/);
    const surplusAvatar = screen.getByText('+2');
    expect(visibleAvatars.length).toBe(3);
    expect(surplusAvatar).toBeInTheDocument();
  });

  it('renders custom surplus avatar', () => {
    const renderSurplusFn = vi.fn();
    renderSurplusFn.mockImplementation((surplus: number) => {
      return <Avatar>{`${surplus} avatar left`}</Avatar>;
    });

    render(
      <AvatarGroup max={2} renderSurplus={renderSurplusFn}>
        <Avatar>A</Avatar>
        <Avatar>B</Avatar>
        <Avatar>C</Avatar>
      </AvatarGroup>
    );
    const visibleAvatars = screen.getAllByText(/^[ABC]$/);
    const surplusAvatar = screen.getByText('1 avatar left');
    expect(visibleAvatars.length).toBe(2);
    expect(surplusAvatar).toBeInTheDocument();
    expect(renderSurplusFn).toHaveBeenCalledTimes(1);
    expect(renderSurplusFn).toHaveBeenCalledWith(1);
  });

  it('renders different spacings', () => {
    render(
      <>
        <AvatarGroup spacing="sm">
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
        <AvatarGroup spacing="md">
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
        <AvatarGroup spacing="lg">
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
      </>
    );
    const avatarGroups = screen.getAllByRole('list');
    expect(avatarGroups.length).toBe(3);
  });

  it('renders different sizes', () => {
    render(
      <>
        <AvatarGroup size="xs">
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
        <AvatarGroup size="sm">
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
        <AvatarGroup size="md">
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
        <AvatarGroup size="lg">
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
        <AvatarGroup size="xl">
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
        <AvatarGroup size={60}>
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
      </>
    );
    const avatarGroups = screen.getAllByRole('list');
    expect(avatarGroups.length).toBe(6);
  });

  it('renders different shapes', () => {
    render(
      <>
        <AvatarGroup shape="circle">
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
        <AvatarGroup shape="square">
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
        <AvatarGroup shape="rounded">
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
      </>
    );
    const avatarGroups = screen.getAllByRole('list');
    expect(avatarGroups.length).toBe(3);
  });
});
