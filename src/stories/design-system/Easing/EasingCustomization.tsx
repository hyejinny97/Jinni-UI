import './Easing.scss';
import { useState } from 'react';
import Container from '../_share/Container';
import JinniProviderWrapper from '../_share/JinniProviderWrapper';
import Select from '@/components/Select';
import Option, { OptionValueType } from '@/components/Option';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Button } from '@/components/general/Button';

type AnimationType = 'overshoot' | 'bounce';
type AnimationProps = {
  isAnimating: boolean;
  timingFunction: string;
  onAnimationEnd: () => void;
};

const OvershootAnimation = ({
  isAnimating,
  timingFunction,
  onAnimationEnd
}: AnimationProps) => {
  return (
    <Box
      round="xs"
      style={{
        padding: '5px',
        width: '80%',
        height: '40px',
        border: '1px solid var(--jinni-color-outline-variant)'
      }}
    >
      <Box
        style={{
          position: 'relative',
          height: '100%',
          aspectRatio: '1/1',
          borderRadius: '50%',
          backgroundColor: 'primary',
          animation: isAnimating
            ? `slide-to-right 1s ${timingFunction} forwards`
            : 'none'
        }}
        onAnimationEnd={onAnimationEnd}
      />
    </Box>
  );
};

const BounceAnimation = ({
  isAnimating,
  timingFunction,
  onAnimationEnd
}: AnimationProps) => {
  return (
    <Box
      round="xs"
      style={{
        padding: '5px',
        width: '40px',
        height: '200px',
        border: '1px solid var(--jinni-color-outline-variant)'
      }}
    >
      <Box
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1/1',
          borderRadius: '50%',
          backgroundColor: 'primary',
          animation: isAnimating
            ? `slide-to-bottom 1s ${timingFunction} forwards`
            : 'none'
        }}
        onAnimationEnd={onAnimationEnd}
      />
    </Box>
  );
};

const EasingCustomizationContent = () => {
  const [animation, setAnimation] = useState<AnimationType>('overshoot');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const changeAnimation = (
    _: Event | React.SyntheticEvent,
    value: OptionValueType
  ) => {
    setAnimation(value as AnimationType);
    setIsAnimating(false);
  };
  const clickButton = () => {
    setIsAnimating(true);
  };
  const handleAnimationEnd = () => {
    const timeoutId = setTimeout(() => {
      setIsAnimating(false);
      clearTimeout(timeoutId);
    }, 500);
  };
  const renderAnimationComponent = () => {
    const props: Omit<AnimationProps, 'timingFunction'> = {
      isAnimating,
      onAnimationEnd: handleAnimationEnd
    };
    switch (animation) {
      case 'overshoot':
        return (
          <OvershootAnimation
            timingFunction="cubic-bezier(0.83, 0, 0.5, 1.73)"
            {...props}
          />
        );
      case 'bounce':
        return (
          <BounceAnimation
            timingFunction={`linear(
  0, 0.004, 0.016, 0.035, 0.063 9.1%, 0.141, 0.25, 0.391, 0.563, 0.765, 1,
  0.891, 0.813 45.5%, 0.785, 0.766, 0.754, 0.75, 0.754, 0.766, 0.785, 0.813 63.6%, 0.891, 1 72.7%,
  0.973, 0.953, 0.941, 0.938, 0.941, 0.953, 0.973, 1,
  0.988, 0.984, 0.988, 1)`}
            {...props}
          />
        );
    }
  };

  return (
    <Container className="JinniEasingCustomization" style={{ gap: '30px' }}>
      <Stack
        direction="row"
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          minWidth: '550px'
        }}
      >
        <Select
          value={animation}
          onChange={changeAnimation}
          size="sm"
          disabled={isAnimating}
        >
          <Option value="overshoot">Overshoot</Option>
          <Option value="bounce">Bounce</Option>
        </Select>
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
          Go
        </Button>
      </Stack>
      <Stack
        style={{
          alignItems: 'center',
          minWidth: '550px',
          padding: '16px',
          backgroundColor: 'surface-container-lowest',
          borderRadius: '4px'
        }}
      >
        {renderAnimationComponent()}
      </Stack>
    </Container>
  );
};

const EasingCustomization = () => {
  return (
    <JinniProviderWrapper>
      <EasingCustomizationContent />
    </JinniProviderWrapper>
  );
};

export default EasingCustomization;
