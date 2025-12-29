import './CustomStepper.scss';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Stepper,
  Step,
  StepDot,
  StepTitle,
  StepDescription,
  StatusType
} from '@/components/navigation/Stepper';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Button } from '@/components/general/Button';
import { CheckIcon } from '@/components/icons/CheckIcon';
import { CartIcon } from '@/components/icons/CartIcon';
import { MailIcon } from '@/components/icons/MailIcon';
import { PersonIcon } from '@/components/icons/PersonIcon';
import { ButtonBase } from '@/components/general/ButtonBase';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Switch } from '@/components/data-entry/Switch';

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
        type: { summary: `React.ReactNode` }
      }
    },
    connectorColor: {
      description: 'completed 상태인 step의 connector 색상',
      table: {
        type: { summary: `ColorType` },
        defaultValue: { summary: `'gray-400'` }
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

type StepType = { title: string; status?: StatusType; description?: string };
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

const SequentialStepperTemplate = () => {
  const STEPS: Array<StepType> = [
    {
      title: 'step 1'
    },
    {
      title: 'step 2',
      description: 'description'
    },
    {
      title: 'step 3',
      description: 'description'
    }
  ];
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
              <StepDot style={{ width: '36px' }}>
                {completed ? <CheckIcon /> : idx + 1}
              </StepDot>
              <StepTitle>{title}</StepTitle>
              <StepDescription>{description}</StepDescription>
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
  const STEPS: Array<StepWithOptionalType> = [
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
        {STEPS.map(({ title, description }, idx) => {
          const skippedStep = idx === OPTIONAL_STEP && skipped;
          const completed = idx < activeStep && !skippedStep;
          const active = idx === activeStep;
          return (
            <Step key={title} status={getStatus({ completed, active })}>
              <StepDot style={{ width: '36px' }}>
                {completed ? <CheckIcon /> : idx + 1}
              </StepDot>
              <StepTitle>{title}</StepTitle>
              <StepDescription>{description}</StepDescription>
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
          {isOptionalStep && (
            <Button variant="text" onClick={handleSkip}>
              Skip
            </Button>
          )}
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
  const STEPS: Array<StepType> = [
    {
      title: 'step 1'
    },
    {
      title: 'step 2',
      description: 'description'
    },
    {
      title: 'step 3',
      description: 'description'
    }
  ];
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
                onClick={() => goStep(idx)}
                style={{ width: '36px' }}
                rippleColor="white"
              >
                {completed ? <CheckIcon /> : idx + 1}
              </StepDot>
              <StepTitle
                onClick={() => goStep(idx)}
                style={{ cursor: 'pointer' }}
              >
                {title}
              </StepTitle>
              <StepDescription>{description}</StepDescription>
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

const AlignmentTemplate = () => {
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
  const ALIGNMENTS = ['right', 'left', 'bottom', 'top'] as const;
  const [align, setAlign] = useState<(typeof ALIGNMENTS)[number]>('right');
  const [vertical, setVertical] = useState<boolean>(false);

  const changeAlign = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlign(e.target.value as (typeof ALIGNMENTS)[number]);
  };
  const changeOrientation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVertical(e.target.checked);
  };

  return (
    <Stack spacing={20}>
      <Stack
        direction="row"
        spacing={20}
        style={{
          justifyContent: 'space-between',
          padding: '16px',
          backgroundColor: 'gray-50',
          borderRadius: '4px'
        }}
      >
        <RadioGroup name="alignment" value={align} onChange={changeAlign}>
          <Stack direction="row" spacing={5}>
            {ALIGNMENTS.map((alignment) => (
              <Label content={alignment}>
                <Radio value={alignment} />
              </Label>
            ))}
          </Stack>
        </RadioGroup>
        <Label content="vertical">
          <Switch value="vertical" onChange={changeOrientation} />
        </Label>
      </Stack>
      <Stepper
        orientation={vertical ? 'vertical' : 'horizontal'}
        alignment={align}
      >
        {STEPS.map(({ title, description, status }, idx) => {
          return (
            <Step key={title} status={status}>
              <StepDot style={{ width: '36px' }}>
                {status === 'completed' ? <CheckIcon /> : idx + 1}
              </StepDot>
              <StepTitle>{title}</StepTitle>
              <StepDescription>{description}</StepDescription>
            </Step>
          );
        })}
      </Stepper>
    </Stack>
  );
};

export const BasicStepper: Story = {
  render: (args) => (
    <Stepper {...args}>
      {STEPS.map(({ title, description, status }) => {
        return (
          <Step key={title} status={status}>
            <StepDot />
            <StepTitle>{title}</StepTitle>
            <StepDescription>{description}</StepDescription>
          </Step>
        );
      })}
    </Stepper>
  )
};

export const SequentialStepper: Story = {
  render: () => <SequentialStepperTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const SequentialStepperTemplate = () => {
  const STEPS: Array<StepType> = [
    {
      title: 'step 1'
    },
    {
      title: 'step 2',
      description: 'description'
    },
    {
      title: 'step 3',
      description: 'description'
    }
  ];
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
              <StepDot style={{ width: '36px' }}>
                {completed ? <CheckIcon /> : idx + 1}
              </StepDot>
              <StepTitle>{title}</StepTitle>
              <StepDescription>{description}</StepDescription>
            </Step>
          );
        })}
      </Stepper>
      <Box style={{ minHeight: '100px' }}>
        {isFinish ? 'finish' : \`Step \${activeStep + 1}\`}
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
};`.trim()
      }
    }
  }
};

export const SequentialStepperWithOptionalStep: Story = {
  render: () => <SequentialStepperWithOptionalTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const SequentialStepperWithOptionalTemplate = () => {
  const STEPS: Array<StepWithOptionalType> = [
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
        {STEPS.map(({ title, description }, idx) => {
          const skippedStep = idx === OPTIONAL_STEP && skipped;
          const completed = idx < activeStep && !skippedStep;
          const active = idx === activeStep;
          return (
            <Step key={title} status={getStatus({ completed, active })}>
              <StepDot style={{ width: '36px' }}>
                {completed ? <CheckIcon /> : idx + 1}
              </StepDot>
              <StepTitle>{title}</StepTitle>
              <StepDescription>{description}</StepDescription>
            </Step>
          );
        })}
      </Stepper>
      <Box style={{ minHeight: '100px' }}>
        {isFinish ? 'finish' : \`Step \${activeStep + 1}\`}
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
          {isOptionalStep && (
            <Button variant="text" onClick={handleSkip}>
              Skip
            </Button>
          )}
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
};`.trim()
      }
    }
  }
};

export const NonSequentialStepper: Story = {
  render: () => <NonSequentialStepperTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const NonSequentialStepperTemplate = () => {
  const STEPS: Array<StepType> = [
    {
      title: 'step 1'
    },
    {
      title: 'step 2',
      description: 'description'
    },
    {
      title: 'step 3',
      description: 'description'
    }
  ];
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
                onClick={() => goStep(idx)}
                style={{ width: '36px' }}
                rippleColor="white"
              >
                {completed ? <CheckIcon /> : idx + 1}
              </StepDot>
              <StepTitle
                onClick={() => goStep(idx)}
                style={{ cursor: 'pointer' }}
              >
                {title}
              </StepTitle>
              <StepDescription>{description}</StepDescription>
            </Step>
          );
        })}
      </Stepper>
      <Box style={{ minHeight: '100px' }}>
        {completeAllSteps ? 'finish' : \`Step \${activeStep + 1}\`}
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
};`.trim()
      }
    }
  }
};

export const Orientation: Story = {
  render: (args) => (
    <Stepper orientation="vertical" {...args}>
      {STEPS.map(({ title, description, status }, idx) => {
        return (
          <Step key={title} status={status}>
            <StepDot style={{ width: '36px' }}>
              {status === 'completed' ? <CheckIcon /> : idx + 1}
            </StepDot>
            <StepTitle>{title}</StepTitle>
            <StepDescription>{description}</StepDescription>
          </Step>
        );
      })}
    </Stepper>
  )
};

export const ContentAlignment: Story = {
  render: () => <AlignmentTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const AlignmentTemplate = () => {
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
  const ALIGNMENTS = ['right', 'left', 'bottom', 'top'] as const;
  const [align, setAlign] = useState<(typeof ALIGNMENTS)[number]>('right');
  const [vertical, setVertical] = useState<boolean>(false);

  const changeAlign = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlign(e.target.value as (typeof ALIGNMENTS)[number]);
  };
  const changeOrientation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVertical(e.target.checked);
  };

  return (
    <Stack spacing={20}>
      <Stack
        direction="row"
        spacing={20}
        style={{
          justifyContent: 'space-between',
          padding: '16px',
          backgroundColor: 'gray-50',
          borderRadius: '4px'
        }}
      >
        <RadioGroup name="alignment" value={align} onChange={changeAlign}>
          <Stack direction="row" spacing={5}>
            {ALIGNMENTS.map((alignment) => (
              <Label content={alignment}>
                <Radio value={alignment} />
              </Label>
            ))}
          </Stack>
        </RadioGroup>
        <Label content="vertical">
          <Switch value="vertical" onChange={changeOrientation} />
        </Label>
      </Stack>
      <Stepper
        orientation={vertical ? 'vertical' : 'horizontal'}
        alignment={align}
      >
        {STEPS.map(({ title, description, status }, idx) => {
          return (
            <Step key={title} status={status}>
              <StepDot style={{ width: '36px' }}>
                {status === 'completed' ? <CheckIcon /> : idx + 1}
              </StepDot>
              <StepTitle>{title}</StepTitle>
              <StepDescription>{description}</StepDescription>
            </Step>
          );
        })}
      </Stepper>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const CustomizeDot: Story = {
  render: (args) => (
    <Stepper {...args}>
      {STEPS.map(({ title, description, status }, idx) => {
        return (
          <Step key={title} status={status}>
            <StepDot
              color="yellow-400"
              variant={{
                completed: 'subtle-filled',
                active: 'filled',
                pending: 'outlined'
              }}
              style={{ width: '36px' }}
            >
              {status === 'completed' ? <CheckIcon /> : idx + 1}
            </StepDot>
            <StepTitle>{title}</StepTitle>
            <StepDescription>{description}</StepDescription>
          </Step>
        );
      })}
    </Stepper>
  )
};

export const CustomizeConnector: Story = {
  render: (args) => (
    <Stepper connectorColor="primary" {...args}>
      {STEPS.map(({ title, description, status }, idx) => {
        return (
          <Step key={title} status={status}>
            <StepDot style={{ width: '36px' }}>
              {status === 'completed' ? <CheckIcon /> : idx + 1}
            </StepDot>
            <StepTitle>{title}</StepTitle>
            <StepDescription>{description}</StepDescription>
          </Step>
        );
      })}
    </Stepper>
  )
};

export const CustomizeStepper: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <Stepper {...args}>
        {STEPS.map(({ title, description, status }) => {
          const isCompleted = status === 'completed';
          return (
            <Step key={title} status={status}>
              <StepDot
                color="purple"
                variant={{
                  completed: 'text',
                  active: 'filled',
                  pending: 'filled'
                }}
                style={{
                  ...(isCompleted
                    ? { width: '36px', margin: '6px' }
                    : { margin: '18px' })
                }}
              >
                {isCompleted && <CheckIcon />}
              </StepDot>
              <StepTitle>{title}</StepTitle>
              <StepDescription>{description}</StepDescription>
            </Step>
          );
        })}
      </Stepper>
      <Stepper className="custom-stepper" {...args}>
        {STEPS_WITH_ICON.map(({ title, description, status, icon }) => {
          const active = status === 'active';
          return (
            <Step key={title} status={status}>
              <StepDot
                style={{
                  width: '40px',
                  elevation: active ? 7 : 0,
                  border: 'none'
                }}
              >
                {icon}
              </StepDot>
              <StepTitle>{title}</StepTitle>
              <StepDescription>{description}</StepDescription>
            </Step>
          );
        })}
      </Stepper>
    </Stack>
  )
};
