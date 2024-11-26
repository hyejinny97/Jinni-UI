import type { ColorType } from '@/types/color';
import type { VariantType } from './Chip';
import { lighten } from '@/utils/colorLuminance';

export const getColorStyle = ({
  color,
  variant
}: {
  color: ColorType;
  variant: VariantType;
}) => {
  const subtleColor = lighten(color, 0.8);
  const WHITE: ColorType = 'white';
  const BLACK: ColorType = 'black';

  let chipColorStyle, avatarColorStyle, iconColorStyle, deleteButtonColorStyle;
  switch (variant) {
    case 'filled':
      chipColorStyle = {
        backgroundColor: color,
        color: WHITE,
        borderColor: color
      };
      avatarColorStyle = {
        backgroundColor: WHITE,
        color,
        fill: color
      };
      iconColorStyle = {
        fill: WHITE
      };
      deleteButtonColorStyle = {
        opacity: 0.7,
        fill: WHITE
      };
      break;
    case 'outlined':
      chipColorStyle = {
        backgroundColor: WHITE,
        color: color,
        borderColor: color
      };
      avatarColorStyle = {
        backgroundColor: color,
        color: WHITE,
        fill: WHITE
      };
      iconColorStyle = {
        fill: color
      };
      deleteButtonColorStyle = {
        opacity: 0.3,
        fill: BLACK
      };
      break;
    case 'text':
      chipColorStyle = {
        backgroundColor: WHITE,
        color: color,
        borderColor: WHITE
      };
      avatarColorStyle = {
        backgroundColor: color,
        color: WHITE,
        fill: WHITE
      };
      iconColorStyle = {
        fill: color
      };
      deleteButtonColorStyle = {
        opacity: 0.3,
        fill: BLACK
      };
      break;
    case 'subtle-filled':
      chipColorStyle = {
        backgroundColor: subtleColor,
        color: color,
        borderColor: subtleColor
      };
      avatarColorStyle = {
        backgroundColor: color,
        color: subtleColor,
        fill: subtleColor
      };
      iconColorStyle = {
        fill: color
      };
      deleteButtonColorStyle = {
        opacity: 0.3,
        fill: BLACK
      };
      break;
  }

  return {
    chipColorStyle,
    avatarColorStyle,
    iconColorStyle,
    deleteButtonColorStyle
  };
};

export const insertProps = (
  element: JSX.Element,
  props: {
    colorStyle: {
      backgroundColor: ColorType | string;
      color: ColorType | string;
    };
  }
): JSX.Element => ({
  ...element,
  props: {
    ...element.props,
    style: {
      ...props.colorStyle,
      ...element.props.style
    }
  }
});
