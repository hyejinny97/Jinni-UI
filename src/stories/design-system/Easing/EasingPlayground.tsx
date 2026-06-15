import './Easing.scss';
import { useState, Fragment, useRef } from 'react';
import Container from '../_share/Container';
import JinniProviderWrapper from '../_share/JinniProviderWrapper';
import Select from '@/components/Select';
import Option, { OptionValueType } from '@/components/Option';
import Grid from '@/components/Grid';
import Stack from '@/components/Stack';
import Box from '@/components/Box';
import Text from '@/components/Text';
import Button from '@/components/Button';
import ToggleButtonGroup from '@/components/ToggleButtonGroup';
import ToggleButton, { ValueType } from '@/components/ToggleButton';
import useJinni from '@/hooks/useJinni';

type AnimationType = 'slide' | 'stretch' | 'scale' | 'fade';
type AnimationProps = {
  isAnimating: boolean;
  revert: boolean;
  timingFunction: string;
  onAnimationEnd: () => void;
};

const getAbbreviation = (easingType: string) => {
  return easingType
    .split('-')
    .map((word) => word[0].toUpperCase())
    .join('.');
};

const kebabToPascal = (str: string) =>
  str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const SlideAnimation = ({
  isAnimating,
  revert,
  timingFunction,
  onAnimationEnd
}: AnimationProps) => {
  return (
    <Box
      round={100}
      style={{
        height: '30px',
        backgroundColor: 'surface-container'
      }}
    >
      <Box
        style={{
          position: 'relative',
          width: '30px',
          aspectRatio: '1/1',
          borderRadius: '50%',
          backgroundColor: 'primary',
          animation: `${revert ? 'slide-to-left' : 'slide-to-right'} 1s ${timingFunction} forwards`,
          animationPlayState: isAnimating ? 'running' : 'paused'
        }}
        onAnimationEnd={onAnimationEnd}
      />
    </Box>
  );
};

const StretchAnimation = ({
  isAnimating,
  revert,
  timingFunction,
  onAnimationEnd
}: AnimationProps) => {
  return (
    <Box
      round="xs"
      style={{
        height: '30px',
        border: '1px solid var(--jinni-color-outline-variant)'
      }}
    >
      <Box
        style={{
          height: '100%',
          borderRadius: 'inherit',
          backgroundColor: 'primary',
          animation: `${revert ? 'shrink' : 'stretch'} 1s ${timingFunction} forwards`,
          animationPlayState: isAnimating ? 'running' : 'paused'
        }}
        onAnimationEnd={onAnimationEnd}
      />
    </Box>
  );
};

const ScaleAnimation = ({
  isAnimating,
  revert,
  timingFunction,
  onAnimationEnd
}: AnimationProps) => {
  return (
    <Box
      style={{
        width: '50px',
        aspectRatio: '1/1',
        borderRadius: '50%',
        backgroundColor: 'primary',
        animation: `${revert ? 'scale-out' : 'scale-in'} 1s ${timingFunction} forwards`,
        animationPlayState: isAnimating ? 'running' : 'paused'
      }}
      onAnimationEnd={onAnimationEnd}
    />
  );
};

const FadeAnimation = ({
  isAnimating,
  revert,
  timingFunction,
  onAnimationEnd
}: AnimationProps) => {
  return (
    <Box
      round="xs"
      style={{
        height: '30px',
        border: '1px solid var(--jinni-color-outline-variant)'
      }}
    >
      <Box
        round="xs"
        style={{
          width: '100%',
          height: '30px',
          backgroundColor: 'primary',
          animation: `${revert ? 'fade-in' : 'fade-out'} 1s ${timingFunction} forwards`,
          animationPlayState: isAnimating ? 'running' : 'paused'
        }}
        onAnimationEnd={onAnimationEnd}
      />
    </Box>
  );
};

const EasingPlaygroundContent = () => {
  const { easing } = useJinni();
  const [animation, setAnimation] = useState<AnimationType>('slide');
  const [easingTypesDisplayed, setEasingTypesDisplayed] = useState<string[]>(
    Object.keys(easing)
  );
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [revert, setRevert] = useState<boolean>(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const changeAnimation = (
    _: Event | React.SyntheticEvent,
    value: OptionValueType
  ) => {
    setAnimation(value as AnimationType);
    setIsAnimating(false);
    setRevert(false);
  };
  const changeEasingTypesDisplayed = (
    _: React.MouseEvent,
    newValue: ValueType | Array<ValueType> | null
  ) => {
    if (Array.isArray(newValue) && newValue.length > 0)
      setEasingTypesDisplayed(newValue as string[]);
  };
  const clickButton = () => {
    setIsAnimating(true);
  };
  const handleAnimationEnd = () => {
    if (timeoutIdRef.current) return;
    timeoutIdRef.current = setTimeout(() => {
      setIsAnimating(false);
      setRevert(!revert);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    }, 500);
  };
  const renderAnimationComponent = (timingFunction: string) => {
    const props: AnimationProps = {
      isAnimating,
      revert,
      timingFunction,
      onAnimationEnd: handleAnimationEnd
    };
    switch (animation) {
      case 'slide':
        return <SlideAnimation {...props} />;
      case 'stretch':
        return <StretchAnimation {...props} />;
      case 'scale':
        return <ScaleAnimation {...props} />;
      case 'fade':
        return <FadeAnimation {...props} />;
    }
  };

  return (
    <Container className="JinniEasingPlayground" style={{ gap: '30px' }}>
      <Stack
        direction="row"
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          minWidth: '550px'
        }}
      >
        <Stack direction="row" spacing={15} style={{ alignItems: 'center' }}>
          <Select
            value={animation}
            onChange={changeAnimation}
            size="sm"
            disabled={isAnimating}
          >
            <Option value="slide">Slide</Option>
            <Option value="stretch">Stretch</Option>
            <Option value="scale">Scale</Option>
            <Option value="fade">Fade</Option>
          </Select>
          <ToggleButtonGroup
            value={easingTypesDisplayed}
            onChange={changeEasingTypesDisplayed}
            aria-label="text alignment"
          >
            {Object.keys(easing).map((easingType) => (
              <ToggleButton
                key={easingType}
                value={easingType}
                aria-label={easingType}
              >
                {getAbbreviation(easingType)}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Stack>
        <Button
          onClick={clickButton}
          disabled={isAnimating}
          color="gray-500"
          style={{
            borderRadius: '10px',
            boxShadow: isAnimating
              ? '0 4px 0 var(--jinni-color-gray-600), 0 3px 5px rgba(0,0,0,0.5)'
              : '0 6px 0 var(--jinni-color-gray-600), 0 6px 10px rgba(0,0,0,0.5)',
            transform: isAnimating ? 'translateY(0)' : 'translateY(-4px)',
            transition: 'box-shadow 0.1s'
          }}
        >
          {revert ? 'Go Back' : 'Go'}
        </Button>
      </Stack>
      <Grid
        columns={3}
        rowSpacing={10}
        columnSpacing={15}
        style={{
          alignItems: 'center',
          minWidth: '550px',
          padding: '16px',
          backgroundColor: 'surface-container-lowest',
          borderRadius: '4px',
          boxSizing: 'border-box'
        }}
      >
        {Object.entries(easing).map(([easingType, easingValue]) => {
          if (!easingTypesDisplayed.includes(easingType)) return;
          return (
            <Fragment key={easingType}>
              <Stack>
                <Text
                  className="typo-body-medium"
                  noMargin
                  style={{ fontWeight: 500 }}
                >
                  {kebabToPascal(easingType)}
                </Text>
                <Text
                  className="typo-label-medium"
                  noMargin
                  style={{ color: 'gray-400' }}
                >
                  {easingValue}
                </Text>
              </Stack>
              <Box
                style={{
                  gridColumn: 'span 2'
                }}
              >
                {renderAnimationComponent(easingValue)}
              </Box>
            </Fragment>
          );
        })}
      </Grid>
    </Container>
  );
};

const EasingPlayground = () => {
  return (
    <JinniProviderWrapper>
      <EasingPlaygroundContent />
    </JinniProviderWrapper>
  );
};

export default EasingPlayground;
