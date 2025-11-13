// Transition 제거
import * as motionMock from '@/tests/mocks/motion.mock.tsx';

vi.mock('@/components/motion/Motion', () => ({
  __esModule: true,
  Motion: motionMock.Motion
}));

vi.mock('@/components/motion/AnimatePresence', () => ({
  __esModule: true,
  AnimatePresence: motionMock.AnimatePresence
}));

// Accordion 테스트
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/tests/react-testing-tools';
import {
  Accordion,
  AccordionItem,
  AccordionSummary,
  AccordionDetails
} from '.';
import { useState } from 'react';
import { ArrowCircleDownIcon } from '@/components/icons/ArrowCircleDownIcon';

describe('<Accordion />', () => {
  it('toggles the accordion expansion', () => {
    render(
      <Accordion>
        <AccordionItem>
          <AccordionSummary>Accordion Summary</AccordionSummary>
          <AccordionDetails>Accordion Details</AccordionDetails>
        </AccordionItem>
      </Accordion>
    );

    const accordionSummary = screen.getByRole('button', {
      name: 'Accordion Summary'
    });
    const defaultExpandIcon = screen.getByTestId('arrow down icon');
    expect(accordionSummary).toBeInTheDocument();
    expect(defaultExpandIcon).toBeInTheDocument();

    fireEvent.click(accordionSummary);
    expect(screen.getByText('Accordion Details')).toBeInTheDocument();

    fireEvent.click(accordionSummary);
    expect(screen.queryByText('Accordion Details')).not.toBeInTheDocument();
  });

  it('renders as expanded by default', () => {
    render(
      <Accordion>
        <AccordionItem defaultExpanded>
          <AccordionSummary>Accordion Summary</AccordionSummary>
          <AccordionDetails>Accordion Details</AccordionDetails>
        </AccordionItem>
      </Accordion>
    );

    const accordionDetails = screen.getByText('Accordion Details');
    expect(accordionDetails).toBeInTheDocument();
  });

  it('controlled item uses expanded prop and calls onChange', () => {
    const Controlled = () => {
      const [expanded, setExpanded] = useState(false);
      return (
        <Accordion>
          <AccordionItem
            expanded={expanded}
            onChange={(_: React.SyntheticEvent, newExpanded: boolean) =>
              setExpanded(newExpanded)
            }
          >
            <AccordionSummary>Accordion Summary</AccordionSummary>
            <AccordionDetails>Accordion Details</AccordionDetails>
          </AccordionItem>
        </Accordion>
      );
    };
    render(<Controlled />);

    const accordionSummary = screen.getByRole('button', {
      name: 'Accordion Summary'
    });

    fireEvent.click(accordionSummary);
    expect(screen.getByText('Accordion Details')).toBeInTheDocument();

    fireEvent.click(accordionSummary);
    expect(screen.queryByText('Accordion Details')).not.toBeInTheDocument();
  });

  it('does not expand when disabled', () => {
    render(
      <Accordion>
        <AccordionItem disabled>
          <AccordionSummary>Accordion Summary</AccordionSummary>
          <AccordionDetails>Accordion Details</AccordionDetails>
        </AccordionItem>
      </Accordion>
    );

    const accordionSummary = screen.getByRole('button', {
      name: 'Accordion Summary'
    });

    fireEvent.click(accordionSummary);
    expect(screen.queryByText('Accordion Details')).not.toBeInTheDocument();
  });

  it('renders accordion with custom expand icon', () => {
    render(
      <Accordion>
        <AccordionItem>
          <AccordionSummary
            expandIcon={
              <ArrowCircleDownIcon aria-label="arrow-circle-down-icon" />
            }
          >
            Accordion Summary
          </AccordionSummary>
          <AccordionDetails>Accordion Details</AccordionDetails>
        </AccordionItem>
      </Accordion>
    );

    const expandIcon = screen.getByLabelText('arrow-circle-down-icon');
    expect(expandIcon).toBeInTheDocument();
  });

  it('hides expand icon when expandIcon=false', () => {
    render(
      <Accordion>
        <AccordionItem>
          <AccordionSummary expandIcon={false}>
            Accordion Summary
          </AccordionSummary>
          <AccordionDetails>Accordion Details</AccordionDetails>
        </AccordionItem>
      </Accordion>
    );

    expect(screen.queryByTestId('arrow down icon')).not.toBeInTheDocument();
  });
});
