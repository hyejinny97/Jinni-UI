import { StyleType } from '@/types/style';
import { isResponsive } from '@/utils/isResponsive';
import useBreakpoint from '@/hooks/useBreakpoint';

type EditedStyleType = React.CSSProperties & {
  [key: string]: React.CSSProperties[keyof React.CSSProperties];
};

const useStyle = (style: StyleType): EditedStyleType => {
  const breakpoint = useBreakpoint();
  const editedStyle: EditedStyleType = {};

  Object.entries(style).forEach(([key, value]) => {
    if (isResponsive(value)) {
      return (editedStyle[key] = value[breakpoint]);
    }
    return (editedStyle[key] = value);
  });

  return editedStyle;
};

export default useStyle;
