import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Stepper,
  Step,
  StepDot,
  StepConnector,
  StepContent,
  StepTitle,
  StepDescription,
  StatusType,
  StepperProps,
  StepDotProps,
  StepConnectorProps
} from '@/components/navigation/Stepper';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Button } from '@/components/general/Button';
import { CheckIcon } from '@/components/icons/CheckIcon';
import { CartIcon } from '@/components/icons/CartIcon';
import { MailIcon } from '@/components/icons/MailIcon';
import { PersonIcon } from '@/components/icons/PersonIcon';
import { ButtonBase } from '@/components/general/ButtonBase';

const meta: Meta<typeof Stepper> = {
  component: Stepper,
  argTypes: {
    alignment: {
      description: 'dot을 기준으로 content 위치',
      table: {
        type: { summary: `'left' | 'right' | 'bottom' | 'top'` },
        defaultValue: { summary: `'right'` }
      }
    },
    children: {
      description: 'Step 컴포넌트들',
      table: {
        type: { summary: `node` }
      }
    },
    orientation: {
      description: 'stepper 방향',
      table: {
        type: { summary: `'horizontal' | 'vertical'` },
        defaultValue: { summary: `'horizontal'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Stepper>;

type StepType = { title: string; status: StatusType; description?: string };
type StepWithOptionalType = { title: string; description?: string };
type StepWithIconType = {
  title: string;
  status: StatusType;
  description?: string;
  icon: React.ReactNode;
};

const STEPS: Array<StepType> = [
  {
    title: 'step 1',
    status: 'completed'
  },
  {
    title: 'step 2',
    description: 'description',
    status: 'active'
  },
  {
    title: 'step 3',
    description: 'description',
    status: 'pending'
  }
];

const STEPS_WITH_OPTIONAL: Array<StepWithOptionalType> = [
  {
    title: 'step 1'
  },
  {
    title: 'step 2',
    description: 'optional'
  },
  {
    title: 'step 3'
  }
];

const STEPS_WITH_ICON: Array<StepWithIconType> = [
  {
    title: 'step 1',
    status: 'completed',
    icon: <CartIcon />
  },
  {
    title: 'step 2',
    description: 'description',
    status: 'active',
    icon: <MailIcon />
  },
  {
    title: 'step 3',
    description: 'description',
    status: 'pending',
    icon: <PersonIcon />
  }
];

const Vertical = ({ children }: { children: React.ReactNode }) => {
  return <Box style={{ height: '400px' }}>{children}</Box>;
};

const StepperTemplate = ({ ...props }) => {
  return (
    <Stepper {...props}>
      {STEPS.map(({ title, description, status }) => {
        return (
          <Step key={title} status={status}>
            <StepDot />
            <StepContent>
              <StepTitle>{title}</StepTitle>
              <StepDescription>{description}</StepDescription>
            </StepContent>
            <StepConnector />
          </Step>
        );
      })}
    </Stepper>
  );
};

const StepperVariantTemplate = ({
  stepperProps,
  dotProps,
  connectorProps
}: {
  stepperProps?: Omit<StepperProps, 'children'>;
  dotProps?: StepDotProps;
  connectorProps?: StepConnectorProps;
}) => {
  return (
    <Stepper {...stepperProps}>
      {STEPS.map(({ title, description, status }, idx) => {
        return (
          <Step key={title} status={status}>
            <StepDot style={{ width: '36px', height: '36px' }} {...dotProps}>
              {status === 'completed' ? <CheckIcon /> : idx + 1}
            </StepDot>
            <StepContent>
              <StepTitle>{title}</StepTitle>
              <StepDescription>{description}</StepDescription>
            </StepContent>
            <StepConnector {...connectorProps} />
          </Step>
        );
      })}
    </Stepper>
  );
};

const SequentialStepperTemplate = () => {
  const [activeStep, setActionStep] = useState<number>(0);
  const isFirstStepActive = activeStep === 0;
  const isFinish = activeStep === STEPS.length;

  const getStatus = ({
    completed,
    active
  }: {
    completed: boolean;
    active: boolean;
  }) => {
    if (completed) return 'completed';
    else if (active) return 'active';
    return 'pending';
  };

  const handleBack = () => {
    setActionStep((prev) => prev - 1);
  };

  const handleNext = () => {
    setActionStep((prev) => prev + 1);
  };

  const handleReset = () => {
    setActionStep(0);
  };

  return (
    <Stack spacing={20}>
      <Stepper>
        {STEPS.map(({ title, description }, idx) => {
          const completed = idx < activeStep;
          const active = idx === activeStep;
          return (
            <Step key={title} status={getStatus({ completed, active })}>
              <StepDot style={{ width: '36px', height: '36px' }}>
                {completed ? <CheckIcon /> : idx + 1}
              </StepDot>
              <StepContent>
                <StepTitle>{title}</StepTitle>
                <StepDescription>{description}</StepDescription>
              </StepContent>
              <StepConnector />
            </Step>
          );
        })}
      </Stepper>
      <Box style={{ minHeight: '100px' }}>
        {isFinish ? 'finish' : `Step ${activeStep + 1}`}
      </Box>
      <Stack direction="row" style={{ justifyContent: 'space-between' }}>
        <Button
          variant="subtle-filled"
          onClick={handleBack}
          disabled={isFirstStepActive}
        >
          Back
        </Button>
        <Stack direction="row" spacing={20}>
          {isFinish && (
            <Button variant="text" onClick={handleReset}>
              Reset
            </Button>
          )}
          <Button
            variant="subtle-filled"
            onClick={handleNext}
            disabled={isFinish}
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

const SequentialStepperWithOptionalTemplate = () => {
  const [activeStep, setActionStep] = useState<number>(0);
  const [skipped, setSkipped] = useState<boolean>(false);
  const OPTIONAL_STEP = 1;
  const isFirstStepActive = activeStep === 0;
  const isFinish = activeStep === STEPS.length;
  const isOptionalStep = activeStep === OPTIONAL_STEP;

  const getStatus = ({
    completed,
    active
  }: {
    completed: boolean;
    active: boolean;
  }) => {
    if (completed) return 'completed';
    else if (active) return 'active';
    return 'pending';
  };

  const handleBack = () => {
    setActionStep((prev) => prev - 1);
  };

  const handleNext = () => {
    if (isOptionalStep) setSkipped(false);
    setActionStep((prev) => prev + 1);
  };

  const handleReset = () => {
    setActionStep(0);
    setSkipped(false);
  };

  const handleSkip = () => {
    handleNext();
    setSkipped(true);
  };

  return (
    <Stack spacing={20}>
      <Stepper>
        {STEPS_WITH_OPTIONAL.map(({ title, description }, idx) => {
          const skippedStep = idx === OPTIONAL_STEP && skipped;
          const completed = idx < activeStep && !skippedStep;
          const active = idx === activeStep;
          return (
            <Step key={title} status={getStatus({ completed, active })}>
              <StepDot style={{ width: '36px', height: '36px' }}>
                {completed ? <CheckIcon /> : idx + 1}
              </StepDot>
              <StepContent>
                <StepTitle>{title}</StepTitle>
                <StepDescription>{description}</StepDescription>
              </StepContent>
              <StepConnector />
            </Step>
          );
        })}
      </Stepper>
      <Box style={{ minHeight: '100px' }}>
        {isFinish ? 'finish' : `Step ${activeStep + 1}`}
      </Box>
      <Stack direction="row" style={{ justifyContent: 'space-between' }}>
        <Button
          variant="subtle-filled"
          onClick={handleBack}
          disabled={isFirstStepActive}
        >
          Back
        </Button>
        <Stack direction="row" spacing={20}>
          {isOptionalStep && <Button onClick={handleSkip}>Skip</Button>}
          {isFinish && (
            <Button variant="text" onClick={handleReset}>
              Reset
            </Button>
          )}
          <Button
            variant="subtle-filled"
            onClick={handleNext}
            disabled={isFinish}
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

const NonSequentialStepperTemplate = () => {
  const [activeStep, setActionStep] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<Array<number>>([]);
  const isFirstStepActive = activeStep === 0;
  const isLastStepActive = activeStep === STEPS.length - 1;
  const completeAllSteps = completedSteps.length === STEPS.length;
  const isCompletedStep = completedSteps.includes(activeStep);

  const getStatus = ({
    completed,
    active
  }: {
    completed: boolean;
    active: boolean;
  }) => {
    if (completed) return 'completed';
    else if (active) return 'active';
    return 'pending';
  };

  const handleBack = () => {
    setActionStep((prev) => prev - 1);
  };

  const handleNext = () => {
    setActionStep((prev) => prev + 1);
  };

  const handleReset = () => {
    setActionStep(0);
    setCompletedSteps([]);
  };

  const handleComplete = () => {
    setCompletedSteps((prev) => [...prev, activeStep]);
  };

  const goStep = (stepToGo: number) => {
    setActionStep(stepToGo);
  };

  return (
    <Stack spacing={20}>
      <Stepper>
        {STEPS.map(({ title, description }, idx) => {
          const completed = completedSteps.includes(idx);
          const active = idx === activeStep;
          return (
            <Step key={title} status={getStatus({ completed, active })}>
              <StepDot
                as={ButtonBase}
                style={{ width: '36px', height: '36px' }}
                onClick={() => goStep(idx)}
                rippleColor="white"
              >
                {completed ? <CheckIcon /> : idx + 1}
              </StepDot>
              <StepContent
                style={{ cursor: 'pointer' }}
                onClick={() => goStep(idx)}
              >
                <StepTitle>{title}</StepTitle>
                <StepDescription>{description}</StepDescription>
              </StepContent>
              <StepConnector />
            </Step>
          );
        })}
      </Stepper>
      <Box style={{ minHeight: '100px' }}>
        {completeAllSteps ? 'finish' : `Step ${activeStep + 1}`}
      </Box>
      <Stack direction="row" style={{ justifyContent: 'space-between' }}>
        <Button
          variant="subtle-filled"
          onClick={handleBack}
          disabled={isFirstStepActive || completeAllSteps}
        >
          Back
        </Button>
        <Stack direction="row" spacing={20}>
          {completeAllSteps ? (
            <Button variant="text" onClick={handleReset}>
              Reset
            </Button>
          ) : (
            <Button
              variant="text"
              onClick={handleComplete}
              disabled={isCompletedStep}
            >
              Complete
            </Button>
          )}
          <Button
            variant="subtle-filled"
            onClick={handleNext}
            disabled={isLastStepActive || completeAllSteps}
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

const CustomizationTemplate = () => {
  const GRADIENT_STYLE =
    'linear-gradient(136deg, rgb(242, 113, 33) 0%, rgb(233, 64, 87) 50%, rgb(138, 35, 135) 100%)';
  return (
    <Stack spacing={20}>
      <Stepper>
        {STEPS.map(({ title, description, status }) => {
          const isCompleted = status === 'completed';
          return (
            <Step key={title} status={status}>
              <StepDot
                style={isCompleted ? { width: '36px', height: '36px' } : {}}
                color="purple"
                variant={{
                  completed: 'text',
                  active: 'filled',
                  pending: 'filled'
                }}
              >
                {isCompleted && <CheckIcon />}
              </StepDot>
              <StepContent>
                <StepTitle>{title}</StepTitle>
                <StepDescription>{description}</StepDescription>
              </StepContent>
              <StepConnector color="purple" />
            </Step>
          );
        })}
      </Stepper>
      <Stepper>
        {STEPS_WITH_ICON.map(({ title, description, status, icon }) => {
          const isActive = status === 'active';
          const isCompleted = status === 'completed';
          return (
            <Step key={title} status={status}>
              <StepDot
                style={{
                  width: '40px',
                  height: '40px',
                  elevation: isActive ? 7 : 0,
                  border: 'none',
                  backgroundImage:
                    isCompleted || isActive ? GRADIENT_STYLE : 'none'
                }}
              >
                {icon}
              </StepDot>
              <StepContent>
                <StepTitle>{title}</StepTitle>
                <StepDescription>{description}</StepDescription>
              </StepContent>
              <StepConnector
                style={{
                  height: '2px',
                  backgroundImage: isCompleted ? GRADIENT_STYLE : 'none'
                }}
              />
            </Step>
          );
        })}
      </Stepper>
    </Stack>
  );
};

export const BasicStepper: Story = {
  render: (args) => <StepperTemplate {...args} />
};

export const SequentialStepper: Story = {
  render: (args) => <SequentialStepperTemplate {...args} />
};

export const SequentialStepperWithOptionalStep: Story = {
  render: (args) => <SequentialStepperWithOptionalTemplate {...args} />
};

export const NonSequentialStepper: Story = {
  render: (args) => <NonSequentialStepperTemplate {...args} />
};

export const Orientation: Story = {
  render: (args) => (
    <StepperVariantTemplate
      stepperProps={{ orientation: 'vertical' }}
      {...args}
    />
  )
};

export const ContentAlignmentHorizontal: Story = {
  render: (args) => (
    <Stack spacing={30}>
      <h4>1) alignment: 'right'</h4>
      <StepperVariantTemplate
        stepperProps={{ orientation: 'horizontal', alignment: 'right' }}
        {...args}
      />
      <h4>2) alignment: 'left'</h4>
      <StepperVariantTemplate
        stepperProps={{ orientation: 'horizontal', alignment: 'left' }}
        {...args}
      />
      <h4>3) alignment: 'bottom'</h4>
      <StepperVariantTemplate
        stepperProps={{ orientation: 'horizontal', alignment: 'bottom' }}
        {...args}
      />
      <h4>4) alignment: 'top'</h4>
      <StepperVariantTemplate
        stepperProps={{ orientation: 'horizontal', alignment: 'top' }}
        {...args}
      />
    </Stack>
  )
};

export const ContentAlignmentVertical: Story = {
  render: (args) => (
    <Stack direction="row" spacing={30}>
      <Vertical>
        <h4>1) alignment: 'right'</h4>
        <StepperVariantTemplate
          stepperProps={{ orientation: 'vertical', alignment: 'right' }}
          {...args}
        />
      </Vertical>
      <Vertical>
        <h4>2) alignment: 'left'</h4>
        <StepperVariantTemplate
          stepperProps={{ orientation: 'vertical', alignment: 'left' }}
          {...args}
        />
      </Vertical>
      <Vertical>
        <h4>3) alignment: 'bottom'</h4>
        <StepperVariantTemplate
          stepperProps={{ orientation: 'vertical', alignment: 'bottom' }}
          {...args}
        />
      </Vertical>
      <Vertical>
        <h4>4) alignment: 'top'</h4>
        <StepperVariantTemplate
          stepperProps={{ orientation: 'vertical', alignment: 'top' }}
          {...args}
        />
      </Vertical>
    </Stack>
  )
};

export const DotCustomization: Story = {
  render: (args) => (
    <StepperVariantTemplate
      dotProps={{
        color: 'yellow-400',
        variant: {
          completed: 'subtle-filled',
          active: 'filled',
          pending: 'outlined'
        }
      }}
      {...args}
    />
  )
};

export const ConnectorCustomization: Story = {
  render: (args) => (
    <StepperVariantTemplate
      connectorProps={{ color: 'primary', style: { height: '2px' } }}
      {...args}
    />
  )
};

export const Customization: Story = {
  render: (args) => <CustomizationTemplate {...args} />
};
