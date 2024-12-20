import type { MenuListProps } from './MenuList';

export const insertProps = (
  elements: Array<JSX.Element>,
  props: Pick<MenuListProps, 'dense'>
): Array<JSX.Element> => {
  return elements.map((element) => ({
    ...element,
    props: {
      ...element.props,
      dense: props.dense
    }
  }));
};
