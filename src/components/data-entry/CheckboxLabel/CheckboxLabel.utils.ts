import { CheckboxLabelProps } from './CheckboxLabel';

export const insertProps = (
  element: CheckboxLabelProps['children'],
  props: Pick<CheckboxLabelProps, 'required' | 'disabled'>
): CheckboxLabelProps['children'] => {
  return {
    ...element,
    props: {
      ...element.props,
      required: props.required,
      disabled: props.disabled
    }
  };
};
