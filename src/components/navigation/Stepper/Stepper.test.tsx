import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/react-testing-tools';
import { Stepper, Step, StepDot, StepTitle, StepDescription } from '.';

describe('<Stepper />', () => {
  it('render stepper', () => {
    render(
      <Stepper>
        <Step status="completed" data-testid="step-1">
          <StepDot />
          <StepTitle>step 1</StepTitle>
        </Step>
        <Step status="active" data-testid="step-2">
          <StepDot />
          <StepTitle>step 2</StepTitle>
          <StepDescription>description</StepDescription>
        </Step>
        <Step status="pending" data-testid="step-3">
          <StepDot />
          <StepTitle>step 3</StepTitle>
          <StepDescription>description</StepDescription>
        </Step>
      </Stepper>
    );

    const step1 = screen.getByTestId('step-1');
    expect(step1).toHaveTextContent('step 1');

    const step2 = screen.getByTestId('step-2');
    expect(step2).toHaveTextContent('step 2');
    expect(step2).toHaveTextContent('description');

    const step3 = screen.getByTestId('step-3');
    expect(step3).toHaveTextContent('step 3');
    expect(step2).toHaveTextContent('description');
  });
});
