import { SomeButtonProps } from './ButtonGroup';

export const insertProps = (
  elements: Array<JSX.Element>,
  props: SomeButtonProps
): Array<JSX.Element> => {
  return elements.map((element) => {
    if (element.type.displayName !== 'Button') return element;
    return {
      ...element,
      props: {
        ...props,
        ...element.props
      }
    };
  });
};
