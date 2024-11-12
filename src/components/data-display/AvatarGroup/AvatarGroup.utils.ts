import type { AvatarGroupProps } from './AvatarGroup';

export const insertProps = (
  elements: Array<JSX.Element>,
  props: Pick<AvatarGroupProps, 'size' | 'shape' | 'style'>
): Array<JSX.Element> => {
  return elements.map((element) => ({
    ...element,
    props: {
      ...element.props,
      size: props.size,
      shape: props.shape,
      style: { ...element.props.style, ...props.style }
    }
  }));
};
