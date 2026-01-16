import { useState, useRef, forwardRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tour, TourStep } from '.';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Text } from '@/components/general/Text';
import { Button } from '@/components/general/Button';
import { ButtonBase } from '@/components/general/ButtonBase';
import { Box } from '@/components/layout/Box';
import { Dots, Dot } from '@/components/navigation/Dots';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import { StyleType } from '@/types/style';
import { PlacementType } from '@/types/popper';

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

type AnchorListType = { [value: number | string]: HTMLElement };
type TourListType = {
  value: string;
  title: string;
  description: string;
  placement?: PlacementType;
}[];

const TOUR_LIST: TourListType = [
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
const PLACEMENT: Array<PlacementType> = [
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
const PLACEMENT_TOUR_LIST: TourListType = PLACEMENT.map((position) => ({
  value: position,
  placement: position,
  title: 'Title',
  description: 'Description'
}));
const COMMON_BUTTON_BASE_STYLE = {
  display: 'inline-flex',
  padding: '3px',
  borderRadius: '50%'
};

const CustomBox = forwardRef(
  (
    { children, style }: { children: React.ReactNode; style?: StyleType },
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
          borderRadius: '4px',
          boxSizing: 'border-box',
          ...style
        }}
      >
        {children}
      </Box>
    );
  }
);

const TourTemplate = ({ ...props }) => {
  const INIT_VALUE = TOUR_LIST[0].value;
  const anchorsElRef = useRef<AnchorListType>({});
  const [open, setOpen] = useState<boolean>(false);
  const [tourValue, setTourValue] = useState<string | number>(INIT_VALUE);

  const registerAnchor =
    (value: string | number) => (element: HTMLElement | null) => {
      if (element) {
        anchorsElRef.current = { ...anchorsElRef.current, [value]: element };
      }
    };
  const handleOpen = () => {
    setTourValue(INIT_VALUE);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDotChange = (
    _: Event | React.SyntheticEvent,
    activeDotIdx: string | number
  ) => {
    setTourValue(TOUR_LIST[activeDotIdx as number].value);
  };

  return (
    <>
      <Button onClick={handleOpen}>Start Tour</Button>
      <Stack direction="row" spacing={20} style={{ marginTop: '16px' }}>
        <CustomBox ref={registerAnchor('community')}>Community</CustomBox>
        <CustomBox ref={registerAnchor('commerce')}>Commerce</CustomBox>
        <CustomBox ref={registerAnchor('festival')}>Festival</CustomBox>
      </Stack>
      <Tour open={open} onClose={handleClose} value={tourValue}>
        {TOUR_LIST.map(({ value, title, description }, idx) => {
          return (
            <TourStep
              key={value}
              anchorEl={anchorsElRef.current[value]}
              value={value}
              style={{ minWidth: '300px' }}
              {...props}
            >
              <ButtonBase
                onClick={handleClose}
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  ...COMMON_BUTTON_BASE_STYLE
                }}
              >
                <CloseIcon />
              </ButtonBase>
              <Text
                className="typo-title-large"
                style={{ margin: 0, padding: '8px 0px' }}
              >
                {title}
              </Text>
              <Text
                className="typo-body-medium"
                style={{ margin: 0, padding: '8px 0px' }}
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
                  onClick={() => setTourValue(TOUR_LIST[idx - 1].value)}
                  disabled={idx === 0}
                  style={COMMON_BUTTON_BASE_STYLE}
                >
                  <ArrowLeftIcon />
                </ButtonBase>
                <Dots value={idx} onChange={handleDotChange}>
                  {Array(TOUR_LIST.length)
                    .fill(0)
                    .map((_, idx) => (
                      <Dot key={idx} value={idx} />
                    ))}
                </Dots>
                <ButtonBase
                  onClick={() => setTourValue(TOUR_LIST[idx + 1].value)}
                  disabled={idx === TOUR_LIST.length - 1}
                  style={COMMON_BUTTON_BASE_STYLE}
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

const PlacementTemplate = () => {
  const INIT_VALUE = PLACEMENT_TOUR_LIST[0].value;
  const anchorsElRef = useRef<AnchorListType>({});
  const [open, setOpen] = useState<boolean>(false);
  const [tourValue, setTourValue] = useState<string | number>(INIT_VALUE);

  const registerAnchor =
    (value: string | number) => (element: HTMLElement | null) => {
      if (element) {
        anchorsElRef.current = { ...anchorsElRef.current, [value]: element };
      }
    };
  const handleOpen = () => {
    setTourValue(INIT_VALUE);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDotChange = (
    _: Event | React.SyntheticEvent,
    activeDotIdx: string | number
  ) => {
    setTourValue(PLACEMENT_TOUR_LIST[activeDotIdx as number].value);
  };

  return (
    <>
      <Button onClick={handleOpen}>Start Tour</Button>
      <Grid
        spacing={10}
        style={{
          maxWidth: '600px',
          justifyItems: 'center',
          gridTemplateAreas: `'. top-start top top-end .' 'left-start . . . right-start' 'left . . . right' 'left-end . . . right-end' '. bottom-start bottom bottom-end .'`,
          margin: '0 auto'
        }}
      >
        {PLACEMENT.map((position) => (
          <CustomBox
            key={position}
            ref={registerAnchor(position)}
            style={{ gridArea: position, width: '130px', height: '130px' }}
          >
            {position}
          </CustomBox>
        ))}
      </Grid>
      <Tour open={open} onClose={handleClose} value={tourValue}>
        {PLACEMENT_TOUR_LIST.map(
          ({ value, title, description, placement }, idx) => {
            return (
              <TourStep
                key={value}
                anchorEl={anchorsElRef.current[value]}
                value={value}
                placement={placement}
                style={{ minWidth: '300px' }}
              >
                <ButtonBase
                  onClick={handleClose}
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    ...COMMON_BUTTON_BASE_STYLE
                  }}
                >
                  <CloseIcon />
                </ButtonBase>
                <Text
                  className="typo-title-large"
                  style={{ margin: 0, padding: '8px 0px' }}
                >
                  {title}
                </Text>
                <Text
                  className="typo-body-medium"
                  style={{ margin: 0, padding: '8px 0px' }}
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
                    onClick={() =>
                      setTourValue(PLACEMENT_TOUR_LIST[idx - 1].value)
                    }
                    disabled={idx === 0}
                    style={COMMON_BUTTON_BASE_STYLE}
                  >
                    <ArrowLeftIcon />
                  </ButtonBase>
                  <Dots value={idx} onChange={handleDotChange}>
                    {Array(PLACEMENT_TOUR_LIST.length)
                      .fill(0)
                      .map((_, idx) => (
                        <Dot key={idx} value={idx} />
                      ))}
                  </Dots>
                  <ButtonBase
                    onClick={() =>
                      setTourValue(PLACEMENT_TOUR_LIST[idx + 1].value)
                    }
                    disabled={idx === PLACEMENT_TOUR_LIST.length - 1}
                    style={COMMON_BUTTON_BASE_STYLE}
                  >
                    <ArrowRightIcon />
                  </ButtonBase>
                </Stack>
              </TourStep>
            );
          }
        )}
      </Tour>
    </>
  );
};

export const BasicTour: Story = {
  render: () => <TourTemplate />
};

export const PaddingOfMaskHole: Story = {
  render: () => <TourTemplate maskHolePadding={20} />
};

export const Offset: Story = {
  render: () => <TourTemplate offset={30} />
};

export const Placement: Story = {
  render: () => <PlacementTemplate />
};

export const Customization: Story = {
  render: () => (
    <TourTemplate
      TourStepContentProps={{
        elevation: 20,
        round: 0,
        style: { backgroundColor: 'gray-200' }
      }}
    />
  )
};
