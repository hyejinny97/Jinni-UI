import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@/tests/react-testing-tools';
import Alert from './Alert';
import { ButtonBase } from '@/components/general/ButtonBase';
import { CheckIcon } from '@/components/icons/CheckIcon';

describe('<Alert />', () => {
  it('renders content', () => {
    render(<Alert>Alert Content</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent('Alert Content');
  });

  it('renders content with title', () => {
    render(<Alert title="Alert Title">Alert Content</Alert>);
    const alert = screen.getByRole('alert');
    const title = screen.getByText('Alert Title');
    expect(alert).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  it('renders content with action', () => {
    render(
      <Alert action={<ButtonBase>Close</ButtonBase>}>Alert Content</Alert>
    );
    const alert = screen.getByRole('alert');
    const action = screen.getByRole('button', { name: 'Close' });
    expect(alert).toBeInTheDocument();
    expect(action).toBeInTheDocument();
  });

  it('renders alert with different status', () => {
    render(
      <>
        <Alert status="success">Alert Content</Alert>
        <Alert status="info">Alert Content</Alert>
        <Alert status="warning">Alert Content</Alert>
        <Alert status="error">Alert Content</Alert>
      </>
    );
    const alerts = screen.getAllByRole('alert');
    expect(alerts.length).toBe(4);
  });

  it('renders alert with different variant', () => {
    render(
      <>
        <Alert variant="subtle-filled">Alert Content</Alert>
        <Alert variant="filled">Alert Content</Alert>
        <Alert variant="outlined">Alert Content</Alert>
      </>
    );
    const alerts = screen.getAllByRole('alert');
    expect(alerts.length).toBe(3);
  });

  it('renders alert with default icon', () => {
    render(
      <>
        <Alert status="success">Alert Content</Alert>
        <Alert status="info">Alert Content</Alert>
        <Alert status="warning">Alert Content</Alert>
        <Alert status="error">Alert Content</Alert>
      </>
    );
    const alerts = screen.getAllByRole('alert');
    alerts.forEach((alert) => {
      expect(alert.querySelector('.JinniAlertIcon')).toBeTruthy();
    });
  });

  it('renders alert with custom icon', () => {
    render(
      <Alert icon={<CheckIcon role="img" aria-label="success icon" />}>
        Alert Content
      </Alert>
    );
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    within(alert).getByRole('img', { name: 'success icon' });
  });

  it('renders alert with no icon', () => {
    render(<Alert icon={false}>Alert Content</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert.querySelector('.JinniAlertIcon')).toBeNull();
  });
});
