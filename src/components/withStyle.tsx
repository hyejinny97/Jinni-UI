import { ColorType } from '@/types/color';
import { CSS_COLOR_PROPERTIES } from '@/constants/css-color-properties';

type CSSColorProperties = (typeof CSS_COLOR_PROPERTIES)[number];

type CustomStyleType = Omit<React.CSSProperties, CSSColorProperties> &
  Partial<Record<CSSColorProperties, ColorType>>;

const withStyle = <P extends object>(Component: React.ComponentType<P>) => {
  const ComponentWithStyle = (
    props: Omit<P, 'style'> & {
      style?: CustomStyleType;
    }
  ) => {
    return <Component {...(props as P)} />;
  };

  ComponentWithStyle.displayName = Component.displayName || Component.name;

  return ComponentWithStyle;
};

export default withStyle;
