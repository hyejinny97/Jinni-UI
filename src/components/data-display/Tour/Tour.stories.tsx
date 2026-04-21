import { useState, useRef, forwardRef, createContext, useContext } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AsType } from '@/types/default-component-props';
import { Tour, TourStep, TourProps } from '.';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Button } from '@/components/general/Button';
import { ButtonBase } from '@/components/general/ButtonBase';
import { Box, BoxProps } from '@/components/layout/Box';
import { Text, TextProps } from '@/components/general/Text';
import { Dots, Dot } from '@/components/navigation/Dots';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import { StyleType } from '@/types/style';
import { PlacementType } from '@/types/popper';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Chip } from '@/components/data-display/Chip';

const meta: Meta<typeof Tour> = {
  component: Tour,
  argTypes: {
    children: {
      description: 'TourItem 컴포넌트들',
      table: {
        type: {
          summary: `React.ReactNode`
        }
      }
    },
    onClose: {
      description: `'escapeKeydown', 'backdropClick' 이벤트 발생 시 호출되는 함수`,
      table: {
        type: {
          summary: `(event: Event | React.SyntheticEvent, reason: 'escapeKeydown' | 'backdropClick') => void;`
        }
      }
    },
    open: {
      description: `true이면, tour가 나타남`,
      table: {
        type: {
          summary: `boolean`
        }
      }
    },
    value: {
      description: '현재 display 되는 TourStep의 value',
      table: {
        type: {
          summary: `string | number`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Tour>;

const COMMON_BUTTON_BASE_STYLE = {
  display: 'inline-flex',
  padding: '3px',
  borderRadius: '50%'
};

const GrayLineBox = forwardRef(
  (
    {
      children,
      circular,
      style
    }: { children: React.ReactNode; circular?: boolean; style?: StyleType },
    ref: React.Ref<HTMLElement>
  ) => {
    return (
      <Box
        ref={ref}
        style={{
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '16px',
          width: '200px',
          height: '200px',
          border: '1px solid lightgrey',
          borderRadius: circular ? '100%' : '4px',
          boxSizing: 'border-box',
          ...style
        }}
      >
        {children}
      </Box>
    );
  }
);

const BasicTourTemplate = () => {
  type TourItemType = {
    value: string;
    title: string;
    description: string;
  };
  const TOUR_LIST: TourItemType[] = [
    {
      value: 'community',
      title: 'Community Title',
      description: 'Community Description'
    },
    {
      value: 'commerce',
      title: 'Commerce Title',
      description: 'Commerce Description'
    },
    {
      value: 'festival',
      title: 'Festival Title',
      description: 'Festival Description'
    }
  ];
  const INIT_VALUE = TOUR_LIST[0].value;
  const anchorElListRef = useRef<
    Record<TourProps['value'], React.RefObject<HTMLElement>>
  >(
    Object.fromEntries(TOUR_LIST.map(({ value }) => [value, { current: null }]))
  );
  const [open, setOpen] = useState<boolean>(false);
  const [tourValue, setTourValue] = useState<TourProps['value']>(INIT_VALUE);

  const openTour = () => {
    setTourValue(INIT_VALUE);
    setOpen(true);
  };
  const closeTour = () => {
    setOpen(false);
  };
  const goPrevTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx - 1].value);
  };
  const goNextTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx + 1].value);
  };
  const handleDotChange = (
    _: Event | React.SyntheticEvent,
    activeDotIdx: string | number
  ) => {
    setTourValue(TOUR_LIST[activeDotIdx as number].value);
  };

  return (
    <>
      <Stack spacing={20} style={{ alignItems: 'center' }}>
        <Button onClick={openTour}>Start Tour</Button>
        <Stack direction="row" spacing={20}>
          <GrayLineBox ref={anchorElListRef.current['community']}>
            Community
          </GrayLineBox>
          <GrayLineBox ref={anchorElListRef.current['commerce']}>
            Commerce
          </GrayLineBox>
          <GrayLineBox ref={anchorElListRef.current['festival']}>
            Festival
          </GrayLineBox>
        </Stack>
      </Stack>
      <Tour open={open} onClose={closeTour} value={tourValue}>
        {TOUR_LIST.map(({ value, title, description }, stepIdx) => {
          return (
            <TourStep
              key={value}
              anchorElRef={anchorElListRef.current[value]}
              value={value}
              style={{ minWidth: '300px' }}
              BoxProps={{ style: { position: 'relative' } }}
            >
              <ButtonBase
                onClick={closeTour}
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  ...COMMON_BUTTON_BASE_STYLE
                }}
                aria-label="close tour"
              >
                <CloseIcon />
              </ButtonBase>
              <Text
                className="typo-title-large"
                noMargin
                style={{ padding: '8px 0px' }}
              >
                {title}
              </Text>
              <Text
                className="typo-body-medium"
                noMargin
                style={{ padding: '8px 0px' }}
              >
                {description}
              </Text>
              <Stack
                direction="row"
                spacing={10}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: '8px'
                }}
              >
                <ButtonBase
                  onClick={() => goPrevTourStep(stepIdx)}
                  disabled={stepIdx === 0}
                  style={COMMON_BUTTON_BASE_STYLE}
                  aria-label="go prev tour step"
                >
                  <ArrowLeftIcon />
                </ButtonBase>
                <Dots value={stepIdx} onChange={handleDotChange}>
                  {Array(TOUR_LIST.length)
                    .fill(0)
                    .map((_, dotIdx) => (
                      <Dot
                        key={dotIdx}
                        value={dotIdx}
                        aria-label={`go tour step ${dotIdx + 1}`}
                      />
                    ))}
                </Dots>
                <ButtonBase
                  onClick={() => goNextTourStep(stepIdx)}
                  disabled={stepIdx === TOUR_LIST.length - 1}
                  style={COMMON_BUTTON_BASE_STYLE}
                  aria-label="go next tour step"
                >
                  <ArrowRightIcon />
                </ButtonBase>
              </Stack>
            </TourStep>
          );
        })}
      </Tour>
    </>
  );
};

const MaskColorTemplate = () => {
  type TourItemType = {
    value: string;
    title: string;
    description: string;
  };
  const TOUR_LIST: TourItemType[] = [
    {
      value: 'community',
      title: 'Community Title',
      description: 'Community Description'
    },
    {
      value: 'commerce',
      title: 'Commerce Title',
      description: 'Commerce Description'
    },
    {
      value: 'festival',
      title: 'Festival Title',
      description: 'Festival Description'
    }
  ];
  const INIT_VALUE = TOUR_LIST[0].value;
  const anchorElListRef = useRef<
    Record<TourProps['value'], React.RefObject<HTMLElement>>
  >(
    Object.fromEntries(TOUR_LIST.map(({ value }) => [value, { current: null }]))
  );
  const [open, setOpen] = useState<boolean>(false);
  const [tourValue, setTourValue] = useState<TourProps['value']>(INIT_VALUE);

  const openTour = () => {
    setTourValue(INIT_VALUE);
    setOpen(true);
  };
  const closeTour = () => {
    setOpen(false);
  };
  const goPrevTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx - 1].value);
  };
  const goNextTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx + 1].value);
  };

  return (
    <>
      <Stack spacing={20} style={{ alignItems: 'center' }}>
        <Button onClick={openTour}>Start Tour</Button>
        <Stack direction="row" spacing={20}>
          <GrayLineBox ref={anchorElListRef.current['community']}>
            Community
          </GrayLineBox>
          <GrayLineBox ref={anchorElListRef.current['commerce']}>
            Commerce
          </GrayLineBox>
          <GrayLineBox ref={anchorElListRef.current['festival']}>
            Festival
          </GrayLineBox>
        </Stack>
      </Stack>
      <Tour open={open} onClose={closeTour} value={tourValue} maskColor="#2225">
        {TOUR_LIST.map(({ value, title, description }, stepIdx) => {
          return (
            <TourStep
              key={value}
              anchorElRef={anchorElListRef.current[value]}
              value={value}
              style={{ minWidth: '300px' }}
            >
              <Text
                className="typo-title-large"
                noMargin
                style={{ padding: '8px 0px' }}
              >
                {title}
              </Text>
              <Text
                className="typo-body-medium"
                noMargin
                style={{ padding: '8px 0px' }}
              >
                {description}
              </Text>
              <Stack
                direction="row"
                spacing={10}
                style={{
                  alignItems: 'center',
                  justifyContent: 'end',
                  paddingTop: '8px'
                }}
              >
                <Button
                  onClick={() => goPrevTourStep(stepIdx)}
                  disabled={stepIdx === 0}
                  variant="outlined"
                >
                  Prev
                </Button>
                <Button
                  onClick={() => goNextTourStep(stepIdx)}
                  disabled={stepIdx === TOUR_LIST.length - 1}
                >
                  Next
                </Button>
              </Stack>
            </TourStep>
          );
        })}
      </Tour>
    </>
  );
};

const SpotlightShapeTemplate = () => {
  type TourItemType = {
    value: string;
    title: string;
    description: string;
  };
  const TOUR_LIST: TourItemType[] = [
    {
      value: 'community',
      title: 'Community Title',
      description: 'Community Description'
    },
    {
      value: 'commerce',
      title: 'Commerce Title',
      description: 'Commerce Description'
    },
    {
      value: 'festival',
      title: 'Festival Title',
      description: 'Festival Description'
    }
  ];
  const INIT_VALUE = TOUR_LIST[0].value;
  const SHAPES = ['rectangular', 'rounded', 'circular'] as const;
  const anchorElListRef = useRef<
    Record<TourProps['value'], React.RefObject<HTMLElement>>
  >(
    Object.fromEntries(TOUR_LIST.map(({ value }) => [value, { current: null }]))
  );
  const [open, setOpen] = useState<boolean>(false);
  const [tourValue, setTourValue] = useState<TourProps['value']>(INIT_VALUE);
  const [shape, setShape] = useState<(typeof SHAPES)[number]>(SHAPES[0]);

  const openTour = () => {
    setTourValue(INIT_VALUE);
    setOpen(true);
  };
  const closeTour = () => {
    setOpen(false);
  };
  const goPrevTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx - 1].value);
  };
  const goNextTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx + 1].value);
  };
  const handleShapeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setShape(value as (typeof SHAPES)[number]);
  };

  return (
    <>
      <Stack spacing={20} style={{ alignItems: 'center' }}>
        <Box
          as="fieldset"
          round="md"
          style={{ backgroundColor: 'gray-100', border: 'none' }}
        >
          <Chip as="legend" variant="subtle-filled" color="gray-600">
            Shape
          </Chip>
          <RadioGroup name="shape" value={shape} onChange={handleShapeChange}>
            <Grid rows={1} columns={3} spacing={5}>
              {SHAPES.map((shape) => (
                <Label content={shape}>
                  <Radio value={shape} />
                </Label>
              ))}
            </Grid>
          </RadioGroup>
        </Box>
        <Button onClick={openTour}>Start Tour</Button>
        <Stack direction="row" spacing={20}>
          <GrayLineBox
            ref={anchorElListRef.current['community']}
            circular={shape === 'circular'}
          >
            Community
          </GrayLineBox>
          <GrayLineBox
            ref={anchorElListRef.current['commerce']}
            circular={shape === 'circular'}
          >
            Commerce
          </GrayLineBox>
          <GrayLineBox
            ref={anchorElListRef.current['festival']}
            circular={shape === 'circular'}
          >
            Festival
          </GrayLineBox>
        </Stack>
      </Stack>
      <Tour
        open={open}
        onClose={closeTour}
        value={tourValue}
        spotlightShape={shape}
      >
        {TOUR_LIST.map(({ value, title, description }, stepIdx) => {
          return (
            <TourStep
              key={value}
              anchorElRef={anchorElListRef.current[value]}
              value={value}
              style={{ minWidth: '300px' }}
            >
              <Text
                className="typo-title-large"
                noMargin
                style={{ padding: '8px 0px' }}
              >
                {title}
              </Text>
              <Text
                className="typo-body-medium"
                noMargin
                style={{ padding: '8px 0px' }}
              >
                {description}
              </Text>
              <Stack
                direction="row"
                spacing={10}
                style={{
                  alignItems: 'center',
                  justifyContent: 'end',
                  paddingTop: '8px'
                }}
              >
                <Button
                  onClick={() => goPrevTourStep(stepIdx)}
                  disabled={stepIdx === 0}
                  variant="outlined"
                >
                  Prev
                </Button>
                <Button
                  onClick={() => goNextTourStep(stepIdx)}
                  disabled={stepIdx === TOUR_LIST.length - 1}
                >
                  Next
                </Button>
              </Stack>
            </TourStep>
          );
        })}
      </Tour>
    </>
  );
};

const SpotlightPaddingTemplate = () => {
  type TourItemType = {
    value: string;
    title: string;
    description: string;
  };
  const TOUR_LIST: TourItemType[] = [
    {
      value: 'community',
      title: 'Community Title',
      description: 'Community Description'
    },
    {
      value: 'commerce',
      title: 'Commerce Title',
      description: 'Commerce Description'
    },
    {
      value: 'festival',
      title: 'Festival Title',
      description: 'Festival Description'
    }
  ];
  const INIT_VALUE = TOUR_LIST[0].value;
  const anchorElListRef = useRef<
    Record<TourProps['value'], React.RefObject<HTMLElement>>
  >(
    Object.fromEntries(TOUR_LIST.map(({ value }) => [value, { current: null }]))
  );
  const [open, setOpen] = useState<boolean>(false);
  const [tourValue, setTourValue] = useState<TourProps['value']>(INIT_VALUE);

  const openTour = () => {
    setTourValue(INIT_VALUE);
    setOpen(true);
  };
  const closeTour = () => {
    setOpen(false);
  };
  const goPrevTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx - 1].value);
  };
  const goNextTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx + 1].value);
  };

  return (
    <>
      <Stack spacing={20} style={{ alignItems: 'center' }}>
        <Button onClick={openTour}>Start Tour</Button>
        <Stack direction="row" spacing={20}>
          <GrayLineBox ref={anchorElListRef.current['community']}>
            Community
          </GrayLineBox>
          <GrayLineBox ref={anchorElListRef.current['commerce']}>
            Commerce
          </GrayLineBox>
          <GrayLineBox ref={anchorElListRef.current['festival']}>
            Festival
          </GrayLineBox>
        </Stack>
      </Stack>
      <Tour
        open={open}
        onClose={closeTour}
        value={tourValue}
        spotlightPadding={20}
      >
        {TOUR_LIST.map(({ value, title, description }, stepIdx) => {
          return (
            <TourStep
              key={value}
              anchorElRef={anchorElListRef.current[value]}
              value={value}
              style={{ minWidth: '300px' }}
            >
              <Text
                className="typo-title-large"
                noMargin
                style={{ padding: '8px 0px' }}
              >
                {title}
              </Text>
              <Text
                className="typo-body-medium"
                noMargin
                style={{ padding: '8px 0px' }}
              >
                {description}
              </Text>
              <Stack
                direction="row"
                spacing={10}
                style={{
                  alignItems: 'center',
                  justifyContent: 'end',
                  paddingTop: '8px'
                }}
              >
                <Button
                  onClick={() => goPrevTourStep(stepIdx)}
                  disabled={stepIdx === 0}
                  variant="outlined"
                >
                  Prev
                </Button>
                <Button
                  onClick={() => goNextTourStep(stepIdx)}
                  disabled={stepIdx === TOUR_LIST.length - 1}
                >
                  Next
                </Button>
              </Stack>
            </TourStep>
          );
        })}
      </Tour>
    </>
  );
};

const PlacementTemplate = () => {
  type TourItemType = {
    value: PlacementType;
    title: string;
    description: string;
  };
  const PLACEMENTS: Array<PlacementType> = [
    'top-start',
    'top',
    'top-end',
    'left-start',
    'left',
    'left-end',
    'right-start',
    'right',
    'right-end',
    'bottom-start',
    'bottom',
    'bottom-end'
  ];
  const TOUR_LIST: TourItemType[] = PLACEMENTS.map((placement) => ({
    value: placement,
    title: 'Title',
    description: 'Description'
  }));
  const INIT_VALUE = TOUR_LIST[0].value;
  const anchorElListRef = useRef<
    Record<TourProps['value'], React.RefObject<HTMLElement>>
  >(
    Object.fromEntries(TOUR_LIST.map(({ value }) => [value, { current: null }]))
  );
  const [open, setOpen] = useState<boolean>(false);
  const [tourValue, setTourValue] = useState<TourProps['value']>(INIT_VALUE);

  const openTour = () => {
    setTourValue(INIT_VALUE);
    setOpen(true);
  };
  const closeTour = () => {
    setOpen(false);
  };
  const goPrevTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx - 1].value);
  };
  const goNextTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx + 1].value);
  };

  return (
    <>
      <Stack spacing={20} style={{ alignItems: 'center' }}>
        <Button onClick={openTour}>Start Tour</Button>
        <Grid
          spacing={10}
          style={{
            maxWidth: '600px',
            justifyItems: 'center',
            gridTemplateAreas: `'. top-start top top-end .' 'left-start . . . right-start' 'left . . . right' 'left-end . . . right-end' '. bottom-start bottom bottom-end .'`,
            margin: '0 auto'
          }}
        >
          {PLACEMENTS.map((placement) => (
            <GrayLineBox
              key={placement}
              ref={anchorElListRef.current[placement]}
              style={{ gridArea: placement, width: '100px', height: '100px' }}
            >
              {placement}
            </GrayLineBox>
          ))}
        </Grid>
      </Stack>
      <Tour open={open} onClose={closeTour} value={tourValue}>
        {TOUR_LIST.map(({ value, title, description }, stepIdx) => {
          return (
            <TourStep
              key={value}
              anchorElRef={anchorElListRef.current[value]}
              value={value}
              placement={value}
              style={{ minWidth: '200px' }}
            >
              <Text className="typo-title-large" noMargin>
                {title}
              </Text>
              <Text className="typo-body-medium">{description}</Text>
              <Stack
                direction="row"
                spacing={10}
                style={{
                  alignItems: 'center',
                  justifyContent: 'end',
                  paddingTop: '8px'
                }}
              >
                <Button
                  onClick={() => goPrevTourStep(stepIdx)}
                  disabled={stepIdx === 0}
                  variant="outlined"
                >
                  Prev
                </Button>
                <Button
                  onClick={() => goNextTourStep(stepIdx)}
                  disabled={stepIdx === TOUR_LIST.length - 1}
                >
                  Next
                </Button>
              </Stack>
            </TourStep>
          );
        })}
      </Tour>
    </>
  );
};

const OffsetTemplate = () => {
  type TourItemType = {
    value: string;
    title: string;
    description: string;
  };
  const TOUR_LIST: TourItemType[] = [
    {
      value: 'community',
      title: 'Community Title',
      description: 'Community Description'
    },
    {
      value: 'commerce',
      title: 'Commerce Title',
      description: 'Commerce Description'
    },
    {
      value: 'festival',
      title: 'Festival Title',
      description: 'Festival Description'
    }
  ];
  const INIT_VALUE = TOUR_LIST[0].value;
  const anchorElListRef = useRef<
    Record<TourProps['value'], React.RefObject<HTMLElement>>
  >(
    Object.fromEntries(TOUR_LIST.map(({ value }) => [value, { current: null }]))
  );
  const [open, setOpen] = useState<boolean>(false);
  const [tourValue, setTourValue] = useState<TourProps['value']>(INIT_VALUE);

  const openTour = () => {
    setTourValue(INIT_VALUE);
    setOpen(true);
  };
  const closeTour = () => {
    setOpen(false);
  };
  const goPrevTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx - 1].value);
  };
  const goNextTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx + 1].value);
  };

  return (
    <>
      <Stack spacing={20} style={{ alignItems: 'center' }}>
        <Button onClick={openTour}>Start Tour</Button>
        <Stack direction="row" spacing={20}>
          <GrayLineBox ref={anchorElListRef.current['community']}>
            Community
          </GrayLineBox>
          <GrayLineBox ref={anchorElListRef.current['commerce']}>
            Commerce
          </GrayLineBox>
          <GrayLineBox ref={anchorElListRef.current['festival']}>
            Festival
          </GrayLineBox>
        </Stack>
      </Stack>
      <Tour open={open} onClose={closeTour} value={tourValue} offset={20}>
        {TOUR_LIST.map(({ value, title, description }, stepIdx) => {
          return (
            <TourStep
              key={value}
              anchorElRef={anchorElListRef.current[value]}
              value={value}
              style={{ minWidth: '300px' }}
            >
              <Text
                className="typo-title-large"
                noMargin
                style={{ padding: '8px 0px' }}
              >
                {title}
              </Text>
              <Text
                className="typo-body-medium"
                noMargin
                style={{ padding: '8px 0px' }}
              >
                {description}
              </Text>
              <Stack
                direction="row"
                spacing={10}
                style={{
                  alignItems: 'center',
                  justifyContent: 'end',
                  paddingTop: '8px'
                }}
              >
                <Button
                  onClick={() => goPrevTourStep(stepIdx)}
                  disabled={stepIdx === 0}
                  variant="outlined"
                >
                  Prev
                </Button>
                <Button
                  onClick={() => goNextTourStep(stepIdx)}
                  disabled={stepIdx === TOUR_LIST.length - 1}
                >
                  Next
                </Button>
              </Stack>
            </TourStep>
          );
        })}
      </Tour>
    </>
  );
};

const CustomBoxTemplate = () => {
  type TourItemType = {
    value: string;
    title: string;
    description: string;
    placement?: PlacementType;
    offset?: number;
  };
  const TOUR_LIST: TourItemType[] = [
    {
      value: 'community',
      title: 'Community Title',
      description: 'Community Description'
    },
    {
      value: 'commerce',
      title: 'Commerce Title',
      description: 'Commerce Description',
      placement: 'bottom',
      offset: 20
    },
    {
      value: 'festival',
      title: 'Festival Title',
      description: 'Festival Description'
    }
  ];
  const INIT_VALUE = TOUR_LIST[0].value;
  const anchorElListRef = useRef<
    Record<TourProps['value'], React.RefObject<HTMLElement>>
  >(
    Object.fromEntries(TOUR_LIST.map(({ value }) => [value, { current: null }]))
  );
  const [open, setOpen] = useState<boolean>(false);
  const [tourValue, setTourValue] = useState<TourProps['value']>(INIT_VALUE);

  const openTour = () => {
    setTourValue(INIT_VALUE);
    setOpen(true);
  };
  const closeTour = () => {
    setOpen(false);
  };
  const goPrevTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx - 1].value);
  };
  const goNextTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx + 1].value);
  };

  return (
    <>
      <Stack spacing={20} style={{ alignItems: 'center' }}>
        <Button onClick={openTour}>Start Tour</Button>
        <Stack direction="row" spacing={20}>
          <GrayLineBox ref={anchorElListRef.current['community']}>
            Community
          </GrayLineBox>
          <GrayLineBox ref={anchorElListRef.current['commerce']}>
            Commerce
          </GrayLineBox>
          <GrayLineBox ref={anchorElListRef.current['festival']}>
            Festival
          </GrayLineBox>
        </Stack>
      </Stack>
      <Tour
        open={open}
        onClose={closeTour}
        value={tourValue}
        placement="top"
        BoxProps={{
          elevation: 20,
          round: 0,
          style: { backgroundColor: 'gray-200' }
        }}
      >
        {TOUR_LIST.map(
          ({ value, title, description, placement, offset }, stepIdx) => {
            return (
              <TourStep
                key={value}
                anchorElRef={anchorElListRef.current[value]}
                value={value}
                placement={placement}
                offset={offset}
                style={{ minWidth: '300px' }}
              >
                <Text
                  className="typo-title-large"
                  noMargin
                  style={{ padding: '8px 0px' }}
                >
                  {title}
                </Text>
                <Text
                  className="typo-body-medium"
                  noMargin
                  style={{ padding: '8px 0px' }}
                >
                  {description}
                </Text>
                <Stack
                  direction="row"
                  spacing={10}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'end',
                    paddingTop: '8px'
                  }}
                >
                  <Button
                    onClick={() => goPrevTourStep(stepIdx)}
                    disabled={stepIdx === 0}
                    variant="outlined"
                  >
                    Prev
                  </Button>
                  <Button
                    onClick={() => goNextTourStep(stepIdx)}
                    disabled={stepIdx === TOUR_LIST.length - 1}
                  >
                    Next
                  </Button>
                </Stack>
              </TourStep>
            );
          }
        )}
      </Tour>
    </>
  );
};

const GrayBox = forwardRef(
  <T extends AsType = 'div'>(
    props: BoxProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const { style, ...rest } = { ...props };
    return (
      <Box
        ref={ref}
        style={{
          backgroundColor: 'gray-200',
          minHeight: '100px',
          borderRadius: '4px',
          ...style
        }}
        {...rest}
      />
    );
  }
);

const YellowBox = forwardRef(
  <T extends AsType = 'div'>(
    props: BoxProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const { style, ...rest } = { ...props };
    return (
      <Box
        ref={ref}
        style={{
          backgroundColor: 'yellow-200',
          minHeight: '100px',
          borderRadius: '4px',
          ...style
        }}
        {...rest}
      />
    );
  }
);

const BoxName = (props: TextProps) => {
  const { style, ...rest } = props;
  return (
    <Text
      className="typo-headline-medium"
      style={{ textAlign: 'center', ...style }}
      {...rest}
    />
  );
};

type TourItemType = {
  value: string;
  title: string;
  description: string;
  placement?: TourProps['placement'];
  spotlightShape?: TourProps['spotlightShape'];
};

const TOUR_LIST: TourItemType[] = [
  {
    value: 'Header',
    title: 'This is Header title',
    description: 'This is Header Description',
    placement: 'bottom'
  },
  {
    value: 'Main',
    title: 'This is Main title',
    description: 'This is Main Description',
    placement: 'right'
  },
  {
    value: 'Section 1',
    title: 'This is Section 1 title',
    description: 'This is Section 1 Description',
    placement: 'right'
  },
  {
    value: 'Section 2',
    title: 'This is Section 2 title',
    description: 'This is Section 2 Description',
    placement: 'right'
  },
  {
    value: 'Aside',
    title: 'This is Aside title',
    description: 'This is Aside Description',
    placement: 'left'
  },
  {
    value: 'Footer',
    title: 'This is Footer title',
    description: 'This is Footer Description',
    placement: 'top'
  },
  {
    value: 'FAB',
    title: 'This is FAB title',
    description: 'This is FAB Description',
    placement: 'top-end',
    spotlightShape: 'circular'
  }
] as const;

type TourStepValueListType = (typeof TOUR_LIST)[number]['value'];

type TourContextType = {
  openTour: () => void;
  registerAnchor: (
    stepValue: TourStepValueListType
  ) => (element: HTMLElement) => void;
};

const TourContext = createContext<TourContextType | null>(null);

const useTour = () => {
  const value = useContext(TourContext);
  if (!value) throw new Error('TourContext value is null');
  return value;
};

const TourProvider = ({ children }: { children: React.ReactNode }) => {
  const anchorElListRef = useRef<
    Record<TourStepValueListType, React.MutableRefObject<HTMLElement | null>>
  >(
    Object.fromEntries(TOUR_LIST.map(({ value }) => [value, { current: null }]))
  );
  const [open, setOpen] = useState<boolean>(false);
  const [tourValue, setTourValue] = useState<TourStepValueListType>(
    TOUR_LIST[0].value
  );

  const openTour = () => {
    setTourValue(TOUR_LIST[0].value);
    setOpen(true);
  };
  const closeTour = () => {
    setOpen(false);
  };
  const handleTourClose: TourProps['onClose'] = (_, reason) => {
    if (reason !== 'backdropClick') {
      closeTour();
    }
  };
  const goPrevTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx - 1].value);
  };
  const goNextTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx + 1].value);
  };
  const handleDotChange = (
    _: Event | React.SyntheticEvent,
    activeDotIdx: string | number
  ) => {
    setTourValue(TOUR_LIST[activeDotIdx as number].value);
  };
  const registerAnchor =
    (stepValue: TourStepValueListType) => (element: HTMLElement) => {
      anchorElListRef.current[stepValue].current = element;
    };

  return (
    <TourContext.Provider value={{ openTour, registerAnchor }}>
      {children}
      <Tour
        open={open}
        onClose={handleTourClose}
        value={tourValue}
        spotlightShape="rounded"
      >
        {TOUR_LIST.map(
          (
            { value, title, description, placement, spotlightShape },
            stepIdx
          ) => {
            return (
              <TourStep
                key={value}
                anchorElRef={anchorElListRef.current[value]}
                value={value}
                placement={placement}
                {...(spotlightShape && { spotlightShape })}
                style={{ minWidth: '300px' }}
                BoxProps={{ style: { position: 'relative' } }}
              >
                <ButtonBase
                  onClick={closeTour}
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    ...COMMON_BUTTON_BASE_STYLE
                  }}
                  aria-label="close tour"
                >
                  <CloseIcon />
                </ButtonBase>
                <Text
                  className="typo-title-large"
                  noMargin
                  style={{ padding: '8px 0px' }}
                >
                  {title}
                </Text>
                <Text
                  className="typo-body-medium"
                  noMargin
                  style={{ padding: '8px 0px' }}
                >
                  {description}
                </Text>
                <Stack
                  direction="row"
                  spacing={10}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '8px'
                  }}
                >
                  <ButtonBase
                    onClick={() => goPrevTourStep(stepIdx)}
                    disabled={stepIdx === 0}
                    style={COMMON_BUTTON_BASE_STYLE}
                    aria-label="go prev tour step"
                  >
                    <ArrowLeftIcon />
                  </ButtonBase>
                  <Dots value={stepIdx} onChange={handleDotChange}>
                    {Array(TOUR_LIST.length)
                      .fill(0)
                      .map((_, dotIdx) => (
                        <Dot
                          key={dotIdx}
                          value={dotIdx}
                          aria-label={`go tour step ${dotIdx + 1}`}
                        />
                      ))}
                  </Dots>
                  <ButtonBase
                    onClick={() => goNextTourStep(stepIdx)}
                    disabled={stepIdx === TOUR_LIST.length - 1}
                    style={COMMON_BUTTON_BASE_STYLE}
                    aria-label="go next tour step"
                  >
                    <ArrowRightIcon />
                  </ButtonBase>
                </Stack>
              </TourStep>
            );
          }
        )}
      </Tour>
    </TourContext.Provider>
  );
};

const App = () => {
  return (
    <TourProvider>
      <HomePage />
    </TourProvider>
  );
};

const HomePage = () => {
  const { openTour, registerAnchor } = useTour();

  return (
    <Stack spacing={50} style={{ position: 'relative', minWidth: '600px' }}>
      <Button onClick={openTour}>Start Tour</Button>
      <Grid
        rows={5}
        columns={3}
        spacing={20}
        style={{
          border: '1px solid lightgray',
          borderRadius: '4px',
          padding: '10px'
        }}
      >
        <GrayBox
          as="header"
          ref={registerAnchor('Header')}
          style={{ gridColumn: 'span 3' }}
        >
          <BoxName>Header</BoxName>
        </GrayBox>
        <GrayBox
          as="main"
          ref={registerAnchor('Main')}
          style={{
            gridColumn: 'span 2',
            gridRow: 'span 3',
            padding: '0 16px 32px'
          }}
        >
          <BoxName>Main</BoxName>
          <Stack spacing={20}>
            <YellowBox as="section" ref={registerAnchor('Section 1')}>
              <BoxName>Section 1</BoxName>
            </YellowBox>
            <YellowBox as="section" ref={registerAnchor('Section 2')}>
              <BoxName>Section 2</BoxName>
            </YellowBox>
          </Stack>
        </GrayBox>
        <GrayBox
          as="aside"
          ref={registerAnchor('Aside')}
          style={{ gridColumn: 'span 1', gridRow: 'span 3' }}
        >
          <BoxName>Aside</BoxName>
        </GrayBox>
        <GrayBox
          as="footer"
          ref={registerAnchor('Footer')}
          style={{ gridColumn: 'span 3' }}
        >
          <BoxName>Footer</BoxName>
        </GrayBox>
      </Grid>
      <ButtonBase
        ref={registerAnchor('FAB')}
        overlayColor="white"
        rippleColor="white"
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          width: '50px',
          height: '50px',
          fontWeight: '700',
          borderRadius: '50%',
          backgroundColor: 'tertiary',
          color: 'white',
          elevation: 10
        }}
      >
        FAB
      </ButtonBase>
    </Stack>
  );
};

export const BasicTour: Story = {
  render: () => <BasicTourTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const BasicTourTemplate = () => {
  type TourItemType = {
    value: string;
    title: string;
    description: string;
  };
  const TOUR_LIST: TourItemType[] = [
    {
      value: 'community',
      title: 'Community Title',
      description: 'Community Description'
    },
    {
      value: 'commerce',
      title: 'Commerce Title',
      description: 'Commerce Description'
    },
    {
      value: 'festival',
      title: 'Festival Title',
      description: 'Festival Description'
    }
  ];
  const INIT_VALUE = TOUR_LIST[0].value;
  const anchorElListRef = useRef<
    Record<TourProps['value'], React.RefObject<HTMLElement>>
  >(
    Object.fromEntries(TOUR_LIST.map(({ value }) => [value, { current: null }]))
  );
  const [open, setOpen] = useState<boolean>(false);
  const [tourValue, setTourValue] = useState<TourProps['value']>(INIT_VALUE);

  const openTour = () => {
    setTourValue(INIT_VALUE);
    setOpen(true);
  };
  const closeTour = () => {
    setOpen(false);
  };
  const goPrevTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx - 1].value);
  };
  const goNextTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx + 1].value);
  };
  const handleDotChange = (
    _: Event | React.SyntheticEvent,
    activeDotIdx: string | number
  ) => {
    setTourValue(TOUR_LIST[activeDotIdx as number].value);
  };

  return (
    <>
      <Stack spacing={20} style={{ alignItems: 'center' }}>
        <Button onClick={openTour}>Start Tour</Button>
        <Stack direction="row" spacing={20}>
          <GrayBox ref={anchorElListRef.current['community']}>
            Community
          </GrayBox>
          <GrayBox ref={anchorElListRef.current['commerce']}>Commerce</GrayBox>
          <GrayBox ref={anchorElListRef.current['festival']}>Festival</GrayBox>
        </Stack>
      </Stack>
      <Tour open={open} onClose={closeTour} value={tourValue}>
        {TOUR_LIST.map(({ value, title, description }, stepIdx) => {
          return (
            <TourStep
              key={value}
              anchorElRef={anchorElListRef.current[value]}
              value={value}
              style={{ minWidth: '300px' }}
              BoxProps={{ style: { position: 'relative' } }}
            >
              <ButtonBase
                onClick={closeTour}
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  ...COMMON_BUTTON_BASE_STYLE
                }}
                aria-label="close tour"
              >
                <CloseIcon />
              </ButtonBase>
              <Text
                className="typo-title-large"
                noMargin
                style={{ padding: '8px 0px' }}
              >
                {title}
              </Text>
              <Text
                className="typo-body-medium"
                noMargin
                style={{ padding: '8px 0px' }}
              >
                {description}
              </Text>
              <Stack
                direction="row"
                spacing={10}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: '8px'
                }}
              >
                <ButtonBase
                  onClick={() => goPrevTourStep(stepIdx)}
                  disabled={stepIdx === 0}
                  style={COMMON_BUTTON_BASE_STYLE}
                  aria-label="go prev tour step"
                >
                  <ArrowLeftIcon />
                </ButtonBase>
                <Dots value={stepIdx} onChange={handleDotChange}>
                  {Array(TOUR_LIST.length)
                    .fill(0)
                    .map((_, dotIdx) => (
                      <Dot
                        key={dotIdx}
                        value={dotIdx}
                        aria-label={\`go tour step \${dotIdx + 1}\`}
                      />
                    ))}
                </Dots>
                <ButtonBase
                  onClick={() => goNextTourStep(stepIdx)}
                  disabled={stepIdx === TOUR_LIST.length - 1}
                  style={COMMON_BUTTON_BASE_STYLE}
                  aria-label="go next tour step"
                >
                  <ArrowRightIcon />
                </ButtonBase>
              </Stack>
            </TourStep>
          );
        })}
      </Tour>
    </>
  );
};`.trim()
      }
    }
  }
};

export const MaskColor: Story = {
  render: () => <MaskColorTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const MaskColorTemplate = () => {
  type TourItemType = {
    value: string;
    title: string;
    description: string;
  };
  const TOUR_LIST: TourItemType[] = [
    {
      value: 'community',
      title: 'Community Title',
      description: 'Community Description'
    },
    {
      value: 'commerce',
      title: 'Commerce Title',
      description: 'Commerce Description'
    },
    {
      value: 'festival',
      title: 'Festival Title',
      description: 'Festival Description'
    }
  ];
  const INIT_VALUE = TOUR_LIST[0].value;
  const anchorElListRef = useRef<
    Record<TourProps['value'], React.RefObject<HTMLElement>>
  >(
    Object.fromEntries(TOUR_LIST.map(({ value }) => [value, { current: null }]))
  );
  const [open, setOpen] = useState<boolean>(false);
  const [tourValue, setTourValue] = useState<TourProps['value']>(INIT_VALUE);

  const openTour = () => {
    setTourValue(INIT_VALUE);
    setOpen(true);
  };
  const closeTour = () => {
    setOpen(false);
  };
  const goPrevTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx - 1].value);
  };
  const goNextTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx + 1].value);
  };

  return (
    <>
      <Stack spacing={20} style={{ alignItems: 'center' }}>
        <Button onClick={openTour}>Start Tour</Button>
        <Stack direction="row" spacing={20}>
          <GrayBox ref={anchorElListRef.current['community']}>
            Community
          </GrayBox>
          <GrayBox ref={anchorElListRef.current['commerce']}>Commerce</GrayBox>
          <GrayBox ref={anchorElListRef.current['festival']}>Festival</GrayBox>
        </Stack>
      </Stack>
      <Tour open={open} onClose={closeTour} value={tourValue} maskColor="#2225">
        {TOUR_LIST.map(({ value, title, description }, stepIdx) => {
          return (
            <TourStep
              key={value}
              anchorElRef={anchorElListRef.current[value]}
              value={value}
              style={{ minWidth: '300px' }}
            >
              <Text
                className="typo-title-large"
                noMargin
                style={{ padding: '8px 0px' }}
              >
                {title}
              </Text>
              <Text
                className="typo-body-medium"
                noMargin
                style={{ padding: '8px 0px' }}
              >
                {description}
              </Text>
              <Stack
                direction="row"
                spacing={10}
                style={{
                  alignItems: 'center',
                  justifyContent: 'end',
                  paddingTop: '8px'
                }}
              >
                <Button
                  onClick={() => goPrevTourStep(stepIdx)}
                  disabled={stepIdx === 0}
                  variant="outlined"
                >
                  Prev
                </Button>
                <Button
                  onClick={() => goNextTourStep(stepIdx)}
                  disabled={stepIdx === TOUR_LIST.length - 1}
                >
                  Next
                </Button>
              </Stack>
            </TourStep>
          );
        })}
      </Tour>
    </>
  );
};
`.trim()
      }
    }
  }
};

export const SpotlightShape: Story = {
  render: () => <SpotlightShapeTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const SpotlightShapeTemplate = () => {
  type TourItemType = {
    value: string;
    title: string;
    description: string;
  };
  const TOUR_LIST: TourItemType[] = [
    {
      value: 'community',
      title: 'Community Title',
      description: 'Community Description'
    },
    {
      value: 'commerce',
      title: 'Commerce Title',
      description: 'Commerce Description'
    },
    {
      value: 'festival',
      title: 'Festival Title',
      description: 'Festival Description'
    }
  ];
  const INIT_VALUE = TOUR_LIST[0].value;
  const SHAPES = ['rectangular', 'rounded', 'circular'] as const;
  const anchorElListRef = useRef<
    Record<TourProps['value'], React.RefObject<HTMLElement>>
  >(
    Object.fromEntries(TOUR_LIST.map(({ value }) => [value, { current: null }]))
  );
  const [open, setOpen] = useState<boolean>(false);
  const [tourValue, setTourValue] = useState<TourProps['value']>(INIT_VALUE);
  const [shape, setShape] = useState<(typeof SHAPES)[number]>(SHAPES[0]);

  const openTour = () => {
    setTourValue(INIT_VALUE);
    setOpen(true);
  };
  const closeTour = () => {
    setOpen(false);
  };
  const goPrevTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx - 1].value);
  };
  const goNextTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx + 1].value);
  };
  const handleShapeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setShape(value as (typeof SHAPES)[number]);
  };

  return (
    <>
      <Stack spacing={20} style={{ alignItems: 'center' }}>
        <Box
          as="fieldset"
          round="md"
          style={{ backgroundColor: 'gray-100', border: 'none' }}
        >
          <Chip as="legend" variant="subtle-filled" color="gray-600">
            Shape
          </Chip>
          <RadioGroup name="shape" value={shape} onChange={handleShapeChange}>
            <Grid rows={1} columns={3} spacing={5}>
              {SHAPES.map((shape) => (
                <Label content={shape}>
                  <Radio value={shape} />
                </Label>
              ))}
            </Grid>
          </RadioGroup>
        </Box>
        <Button onClick={openTour}>Start Tour</Button>
        <Stack direction="row" spacing={20}>
          <GrayBox
            ref={anchorElListRef.current['community']}
            circular={shape === 'circular'}
          >
            Community
          </GrayBox>
          <GrayBox
            ref={anchorElListRef.current['commerce']}
            circular={shape === 'circular'}
          >
            Commerce
          </GrayBox>
          <GrayBox
            ref={anchorElListRef.current['festival']}
            circular={shape === 'circular'}
          >
            Festival
          </GrayBox>
        </Stack>
      </Stack>
      <Tour
        open={open}
        onClose={closeTour}
        value={tourValue}
        spotlightShape={shape}
      >
        {TOUR_LIST.map(({ value, title, description }, stepIdx) => {
          return (
            <TourStep
              key={value}
              anchorElRef={anchorElListRef.current[value]}
              value={value}
              style={{ minWidth: '300px' }}
            >
              <Text
                className="typo-title-large"
                noMargin
                style={{ padding: '8px 0px' }}
              >
                {title}
              </Text>
              <Text
                className="typo-body-medium"
                noMargin
                style={{ padding: '8px 0px' }}
              >
                {description}
              </Text>
              <Stack
                direction="row"
                spacing={10}
                style={{
                  alignItems: 'center',
                  justifyContent: 'end',
                  paddingTop: '8px'
                }}
              >
                <Button
                  onClick={() => goPrevTourStep(stepIdx)}
                  disabled={stepIdx === 0}
                  variant="outlined"
                >
                  Prev
                </Button>
                <Button
                  onClick={() => goNextTourStep(stepIdx)}
                  disabled={stepIdx === TOUR_LIST.length - 1}
                >
                  Next
                </Button>
              </Stack>
            </TourStep>
          );
        })}
      </Tour>
    </>
  );
};`.trim()
      }
    }
  }
};

export const SpotlightPadding: Story = {
  render: () => <SpotlightPaddingTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const SpotlightPaddingTemplate = () => {
  type TourItemType = {
    value: string;
    title: string;
    description: string;
  };
  const TOUR_LIST: TourItemType[] = [
    {
      value: 'community',
      title: 'Community Title',
      description: 'Community Description'
    },
    {
      value: 'commerce',
      title: 'Commerce Title',
      description: 'Commerce Description'
    },
    {
      value: 'festival',
      title: 'Festival Title',
      description: 'Festival Description'
    }
  ];
  const INIT_VALUE = TOUR_LIST[0].value;
  const anchorElListRef = useRef<
    Record<TourProps['value'], React.RefObject<HTMLElement>>
  >(
    Object.fromEntries(TOUR_LIST.map(({ value }) => [value, { current: null }]))
  );
  const [open, setOpen] = useState<boolean>(false);
  const [tourValue, setTourValue] = useState<TourProps['value']>(INIT_VALUE);

  const openTour = () => {
    setTourValue(INIT_VALUE);
    setOpen(true);
  };
  const closeTour = () => {
    setOpen(false);
  };
  const goPrevTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx - 1].value);
  };
  const goNextTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx + 1].value);
  };

  return (
    <>
      <Stack spacing={20} style={{ alignItems: 'center' }}>
        <Button onClick={openTour}>Start Tour</Button>
        <Stack direction="row" spacing={20}>
          <GrayBox ref={anchorElListRef.current['community']}>
            Community
          </GrayBox>
          <GrayBox ref={anchorElListRef.current['commerce']}>Commerce</GrayBox>
          <GrayBox ref={anchorElListRef.current['festival']}>Festival</GrayBox>
        </Stack>
      </Stack>
      <Tour
        open={open}
        onClose={closeTour}
        value={tourValue}
        spotlightPadding={20}
      >
        {TOUR_LIST.map(({ value, title, description }, stepIdx) => {
          return (
            <TourStep
              key={value}
              anchorElRef={anchorElListRef.current[value]}
              value={value}
              style={{ minWidth: '300px' }}
            >
              <Text
                className="typo-title-large"
                noMargin
                style={{ padding: '8px 0px' }}
              >
                {title}
              </Text>
              <Text
                className="typo-body-medium"
                noMargin
                style={{ padding: '8px 0px' }}
              >
                {description}
              </Text>
              <Stack
                direction="row"
                spacing={10}
                style={{
                  alignItems: 'center',
                  justifyContent: 'end',
                  paddingTop: '8px'
                }}
              >
                <Button
                  onClick={() => goPrevTourStep(stepIdx)}
                  disabled={stepIdx === 0}
                  variant="outlined"
                >
                  Prev
                </Button>
                <Button
                  onClick={() => goNextTourStep(stepIdx)}
                  disabled={stepIdx === TOUR_LIST.length - 1}
                >
                  Next
                </Button>
              </Stack>
            </TourStep>
          );
        })}
      </Tour>
    </>
  );
};`.trim()
      }
    }
  }
};

export const Placement: Story = {
  render: () => <PlacementTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const PlacementTemplate = () => {
  type TourItemType = {
    value: PlacementType;
    title: string;
    description: string;
  };
  const PLACEMENTS: Array<PlacementType> = [
    'top-start',
    'top',
    'top-end',
    'left-start',
    'left',
    'left-end',
    'right-start',
    'right',
    'right-end',
    'bottom-start',
    'bottom',
    'bottom-end'
  ];
  const TOUR_LIST: TourItemType[] = PLACEMENTS.map((placement) => ({
    value: placement,
    title: 'Title',
    description: 'Description'
  }));
  const INIT_VALUE = TOUR_LIST[0].value;
  const anchorElListRef = useRef<
    Record<TourProps['value'], React.RefObject<HTMLElement>>
  >(
    Object.fromEntries(TOUR_LIST.map(({ value }) => [value, { current: null }]))
  );
  const [open, setOpen] = useState<boolean>(false);
  const [tourValue, setTourValue] = useState<TourProps['value']>(INIT_VALUE);

  const openTour = () => {
    setTourValue(INIT_VALUE);
    setOpen(true);
  };
  const closeTour = () => {
    setOpen(false);
  };
  const goPrevTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx - 1].value);
  };
  const goNextTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx + 1].value);
  };

  return (
    <>
      <Stack spacing={20} style={{ alignItems: 'center' }}>
        <Button onClick={openTour}>Start Tour</Button>
        <Grid
          spacing={10}
          style={{
            maxWidth: '600px',
            justifyItems: 'center',
            gridTemplateAreas: \`'. top-start top top-end .' 'left-start . . . right-start' 'left . . . right' 'left-end . . . right-end' '. bottom-start bottom bottom-end .'\`,
            margin: '0 auto'
          }}
        >
          {PLACEMENTS.map((placement) => (
            <GrayBox
              key={placement}
              ref={anchorElListRef.current[placement]}
              style={{ gridArea: placement, width: '100px', height: '100px' }}
            >
              {placement}
            </GrayBox>
          ))}
        </Grid>
      </Stack>
      <Tour open={open} onClose={closeTour} value={tourValue}>
        {TOUR_LIST.map(({ value, title, description }, stepIdx) => {
          return (
            <TourStep
              key={value}
              anchorElRef={anchorElListRef.current[value]}
              value={value}
              placement={value}
              style={{ minWidth: '200px' }}
            >
              <Text className="typo-title-large" noMargin>
                {title}
              </Text>
              <Text className="typo-body-medium">{description}</Text>
              <Stack
                direction="row"
                spacing={10}
                style={{
                  alignItems: 'center',
                  justifyContent: 'end',
                  paddingTop: '8px'
                }}
              >
                <Button
                  onClick={() => goPrevTourStep(stepIdx)}
                  disabled={stepIdx === 0}
                  variant="outlined"
                >
                  Prev
                </Button>
                <Button
                  onClick={() => goNextTourStep(stepIdx)}
                  disabled={stepIdx === TOUR_LIST.length - 1}
                >
                  Next
                </Button>
              </Stack>
            </TourStep>
          );
        })}
      </Tour>
    </>
  );
};`.trim()
      }
    }
  }
};

export const Offset: Story = {
  render: () => <OffsetTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const OffsetTemplate = () => {
  type TourItemType = {
    value: string;
    title: string;
    description: string;
  };
  const TOUR_LIST: TourItemType[] = [
    {
      value: 'community',
      title: 'Community Title',
      description: 'Community Description'
    },
    {
      value: 'commerce',
      title: 'Commerce Title',
      description: 'Commerce Description'
    },
    {
      value: 'festival',
      title: 'Festival Title',
      description: 'Festival Description'
    }
  ];
  const INIT_VALUE = TOUR_LIST[0].value;
  const anchorElListRef = useRef<
    Record<TourProps['value'], React.RefObject<HTMLElement>>
  >(
    Object.fromEntries(TOUR_LIST.map(({ value }) => [value, { current: null }]))
  );
  const [open, setOpen] = useState<boolean>(false);
  const [tourValue, setTourValue] = useState<TourProps['value']>(INIT_VALUE);

  const openTour = () => {
    setTourValue(INIT_VALUE);
    setOpen(true);
  };
  const closeTour = () => {
    setOpen(false);
  };
  const goPrevTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx - 1].value);
  };
  const goNextTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx + 1].value);
  };

  return (
    <>
      <Stack spacing={20} style={{ alignItems: 'center' }}>
        <Button onClick={openTour}>Start Tour</Button>
        <Stack direction="row" spacing={20}>
          <GrayBox ref={anchorElListRef.current['community']}>
            Community
          </GrayBox>
          <GrayBox ref={anchorElListRef.current['commerce']}>Commerce</GrayBox>
          <GrayBox ref={anchorElListRef.current['festival']}>Festival</GrayBox>
        </Stack>
      </Stack>
      <Tour open={open} onClose={closeTour} value={tourValue} offset={20}>
        {TOUR_LIST.map(({ value, title, description }, stepIdx) => {
          return (
            <TourStep
              key={value}
              anchorElRef={anchorElListRef.current[value]}
              value={value}
              style={{ minWidth: '300px' }}
            >
              <Text
                className="typo-title-large"
                noMargin
                style={{ padding: '8px 0px' }}
              >
                {title}
              </Text>
              <Text
                className="typo-body-medium"
                noMargin
                style={{ padding: '8px 0px' }}
              >
                {description}
              </Text>
              <Stack
                direction="row"
                spacing={10}
                style={{
                  alignItems: 'center',
                  justifyContent: 'end',
                  paddingTop: '8px'
                }}
              >
                <Button
                  onClick={() => goPrevTourStep(stepIdx)}
                  disabled={stepIdx === 0}
                  variant="outlined"
                >
                  Prev
                </Button>
                <Button
                  onClick={() => goNextTourStep(stepIdx)}
                  disabled={stepIdx === TOUR_LIST.length - 1}
                >
                  Next
                </Button>
              </Stack>
            </TourStep>
          );
        })}
      </Tour>
    </>
  );
};`.trim()
      }
    }
  }
};

export const CustomBox: Story = {
  render: () => <CustomBoxTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const CustomBoxTemplate = () => {
  type TourItemType = {
    value: string;
    title: string;
    description: string;
    placement?: PlacementType;
    offset?: number;
  };
  const TOUR_LIST: TourItemType[] = [
    {
      value: 'community',
      title: 'Community Title',
      description: 'Community Description'
    },
    {
      value: 'commerce',
      title: 'Commerce Title',
      description: 'Commerce Description',
      placement: 'bottom',
      offset: 20
    },
    {
      value: 'festival',
      title: 'Festival Title',
      description: 'Festival Description'
    }
  ];
  const INIT_VALUE = TOUR_LIST[0].value;
  const anchorElListRef = useRef<
    Record<TourProps['value'], React.RefObject<HTMLElement>>
  >(
    Object.fromEntries(TOUR_LIST.map(({ value }) => [value, { current: null }]))
  );
  const [open, setOpen] = useState<boolean>(false);
  const [tourValue, setTourValue] = useState<TourProps['value']>(INIT_VALUE);

  const openTour = () => {
    setTourValue(INIT_VALUE);
    setOpen(true);
  };
  const closeTour = () => {
    setOpen(false);
  };
  const goPrevTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx - 1].value);
  };
  const goNextTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx + 1].value);
  };

  return (
    <>
      <Stack spacing={20} style={{ alignItems: 'center' }}>
        <Button onClick={openTour}>Start Tour</Button>
        <Stack direction="row" spacing={20}>
          <GrayBox ref={anchorElListRef.current['community']}>
            Community
          </GrayBox>
          <GrayBox ref={anchorElListRef.current['commerce']}>Commerce</GrayBox>
          <GrayBox ref={anchorElListRef.current['festival']}>Festival</GrayBox>
        </Stack>
      </Stack>
      <Tour
        open={open}
        onClose={closeTour}
        value={tourValue}
        placement="top"
        BoxProps={{
          elevation: 20,
          round: 0,
          style: { backgroundColor: 'gray-200' }
        }}
      >
        {TOUR_LIST.map(
          ({ value, title, description, placement, offset }, stepIdx) => {
            return (
              <TourStep
                key={value}
                anchorElRef={anchorElListRef.current[value]}
                value={value}
                placement={placement}
                offset={offset}
                style={{ minWidth: '300px' }}
              >
                <Text
                  className="typo-title-large"
                  noMargin
                  style={{ padding: '8px 0px' }}
                >
                  {title}
                </Text>
                <Text
                  className="typo-body-medium"
                  noMargin
                  style={{ padding: '8px 0px' }}
                >
                  {description}
                </Text>
                <Stack
                  direction="row"
                  spacing={10}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'end',
                    paddingTop: '8px'
                  }}
                >
                  <Button
                    onClick={() => goPrevTourStep(stepIdx)}
                    disabled={stepIdx === 0}
                    variant="outlined"
                  >
                    Prev
                  </Button>
                  <Button
                    onClick={() => goNextTourStep(stepIdx)}
                    disabled={stepIdx === TOUR_LIST.length - 1}
                  >
                    Next
                  </Button>
                </Stack>
              </TourStep>
            );
          }
        )}
      </Tour>
    </>
  );
};`.trim()
      }
    }
  }
};

export const ApplyTourToEntirePage: Story = {
  render: () => <App />,
  parameters: {
    docs: {
      source: {
        code: `type TourItemType = {
  value: string;
  title: string;
  description: string;
  placement?: TourProps['placement'];
  spotlightShape?: TourProps['spotlightShape'];
};

const TOUR_LIST: TourItemType[] = [
  {
    value: 'Header',
    title: 'This is Header title',
    description: 'This is Header Description',
    placement: 'bottom'
  },
  {
    value: 'Main',
    title: 'This is Main title',
    description: 'This is Main Description',
    placement: 'right'
  },
  {
    value: 'Section 1',
    title: 'This is Section 1 title',
    description: 'This is Section 1 Description',
    placement: 'right'
  },
  {
    value: 'Section 2',
    title: 'This is Section 2 title',
    description: 'This is Section 2 Description',
    placement: 'right'
  },
  {
    value: 'Aside',
    title: 'This is Aside title',
    description: 'This is Aside Description',
    placement: 'left'
  },
  {
    value: 'Footer',
    title: 'This is Footer title',
    description: 'This is Footer Description',
    placement: 'top'
  },
  {
    value: 'FAB',
    title: 'This is FAB title',
    description: 'This is FAB Description',
    placement: 'top-end',
    spotlightShape: 'circular'
  }
] as const;

const COMMON_BUTTON_BASE_STYLE = {
  display: 'inline-flex',
  padding: '3px',
  borderRadius: '50%'
};

type TourStepValueListType = (typeof TOUR_LIST)[number]['value'];

type TourContextType = {
  openTour: () => void;
  registerAnchor: (
    stepValue: TourStepValueListType
  ) => (element: HTMLElement) => void;
};

const TourContext = createContext<TourContextType | null>(null);

const useTour = () => {
  const value = useContext(TourContext);
  if (!value) throw new Error('TourContext value is null');
  return value;
};

const TourProvider = ({ children }: { children: React.ReactNode }) => {
  const anchorElListRef = useRef<
    Record<TourStepValueListType, React.RefObject<HTMLElement>>
  >(
    Object.fromEntries(TOUR_LIST.map(({ value }) => [value, { current: null }]))
  );
  const [open, setOpen] = useState<boolean>(false);
  const [tourValue, setTourValue] = useState<TourStepValueListType>(
    TOUR_LIST[0].value
  );

  const openTour = () => {
    setTourValue(TOUR_LIST[0].value);
    setOpen(true);
  };
  const closeTour = () => {
    setOpen(false);
  };
  const handleTourClose: TourProps['onClose'] = (event, reason) => {
    if (reason !== 'backdropClick') {
      closeTour();
    }
  };
  const goPrevTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx - 1].value);
  };
  const goNextTourStep = (stepIdx: number) => {
    setTourValue(TOUR_LIST[stepIdx + 1].value);
  };
  const handleDotChange = (
    _: Event | React.SyntheticEvent,
    activeDotIdx: string | number
  ) => {
    setTourValue(TOUR_LIST[activeDotIdx as number].value);
  };
  const registerAnchor =
    (stepValue: TourStepValueListType) => (element: HTMLElement) => {
      anchorElListRef.current[stepValue].current = element;
    };

  return (
    <TourContext.Provider value={{ openTour, registerAnchor }}>
      {children}
      <Tour
        open={open}
        onClose={handleTourClose}
        value={tourValue}
        spotlightShape="rounded"
      >
        {TOUR_LIST.map(
          (
            { value, title, description, placement, spotlightShape },
            stepIdx
          ) => {
            return (
              <TourStep
                key={value}
                anchorElRef={anchorElListRef.current[value]}
                value={value}
                placement={placement}
                {...(spotlightShape && { spotlightShape })}
                style={{ minWidth: '300px' }}
                BoxProps={{ style: { position: 'relative' } }}
              >
                <ButtonBase
                  onClick={closeTour}
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    ...COMMON_BUTTON_BASE_STYLE
                  }}
                  aria-label="close tour"
                >
                  <CloseIcon />
                </ButtonBase>
                <Text
                  className="typo-title-large"
                  noMargin
                  style={{ padding: '8px 0px' }}
                >
                  {title}
                </Text>
                <Text
                  className="typo-body-medium"
                  noMargin
                  style={{ padding: '8px 0px' }}
                >
                  {description}
                </Text>
                <Stack
                  direction="row"
                  spacing={10}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '8px'
                  }}
                >
                  <ButtonBase
                    onClick={() => goPrevTourStep(stepIdx)}
                    disabled={stepIdx === 0}
                    style={COMMON_BUTTON_BASE_STYLE}
                    aria-label="go prev tour step"
                  >
                    <ArrowLeftIcon />
                  </ButtonBase>
                  <Dots value={stepIdx} onChange={handleDotChange}>
                    {Array(TOUR_LIST.length)
                      .fill(0)
                      .map((_, dotIdx) => (
                        <Dot
                          key={dotIdx}
                          value={dotIdx}
                          aria-label={\`go tour step \${dotIdx + 1}\`}
                        />
                      ))}
                  </Dots>
                  <ButtonBase
                    onClick={() => goNextTourStep(stepIdx)}
                    disabled={stepIdx === TOUR_LIST.length - 1}
                    style={COMMON_BUTTON_BASE_STYLE}
                    aria-label="go next tour step"
                  >
                    <ArrowRightIcon />
                  </ButtonBase>
                </Stack>
              </TourStep>
            );
          }
        )}
      </Tour>
    </TourContext.Provider>
  );
};

const GrayBox = forwardRef((props: BoxProps, ref: React.Ref<HTMLElement>) => {
  const { style, ...rest } = { ...props };
  return (
    <Box
      ref={ref}
      style={{
        backgroundColor: 'gray-200',
        minHeight: '100px',
        borderRadius: '4px',
        ...style
      }}
      {...rest}
    />
  );
});

const YellowBox = forwardRef((props: BoxProps, ref: React.Ref<HTMLElement>) => {
  const { style, ...rest } = { ...props };
  return (
    <Box
      ref={ref}
      style={{
        backgroundColor: 'yellow-200',
        minHeight: '100px',
        borderRadius: '4px',
        ...style
      }}
      {...rest}
    />
  );
});

const BoxName = (props: TextProps) => {
  const { style, ...rest } = props;
  return (
    <Text
      className="typo-headline-medium"
      style={{ textAlign: 'center', ...style }}
      {...rest}
    />
  );
};

const HomePage = () => {
  const { openTour, registerAnchor } = useTour();

  return (
    <Stack spacing={50} style={{ position: 'relative' }}>
      <Button onClick={openTour}>Start Tour</Button>
      <Grid
        rows={5}
        columns={3}
        spacing={20}
        style={{
          border: '1px solid lightgray',
          borderRadius: '4px',
          padding: '10px'
        }}
      >
        <GrayBox
          as="header"
          ref={registerAnchor('Header')}
          style={{ gridColumn: 'span 3' }}
        >
          <BoxName>Header</BoxName>
        </GrayBox>
        <GrayBox
          as="main"
          ref={registerAnchor('Main')}
          style={{
            gridColumn: 'span 2',
            gridRow: 'span 3',
            padding: '0 16px 32px'
          }}
        >
          <BoxName>Main</BoxName>
          <Stack spacing={20}>
            <YellowBox as="section" ref={registerAnchor('Section 1')}>
              <BoxName>Section 1</BoxName>
            </YellowBox>
            <YellowBox as="section" ref={registerAnchor('Section 2')}>
              <BoxName>Section 2</BoxName>
            </YellowBox>
          </Stack>
        </GrayBox>
        <GrayBox
          as="aside"
          ref={registerAnchor('Aside')}
          style={{ gridColumn: 'span 1', gridRow: 'span 3' }}
        >
          <BoxName>Aside</BoxName>
        </GrayBox>
        <GrayBox
          as="footer"
          ref={registerAnchor('Footer')}
          style={{ gridColumn: 'span 3' }}
        >
          <BoxName>Footer</BoxName>
        </GrayBox>
      </Grid>
      <ButtonBase
        ref={registerAnchor('FAB')}
        overlayColor="white"
        rippleColor="white"
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          width: '50px',
          height: '50px',
          fontWeight: '700',
          borderRadius: '50%',
          backgroundColor: 'tertiary',
          color: 'white',
          elevation: 10
        }}
      >
        FAB
      </ButtonBase>
    </Stack>
  );
};

const App = () => {
  return (
    <TourProvider>
      <HomePage />
    </TourProvider>
  );
};
`.trim()
      }
    }
  }
};
