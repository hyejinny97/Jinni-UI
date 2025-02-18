import { FormControlLabelProps } from './FormControlLabel';

export const insertProps = (
  element: FormControlLabelProps['children'],
  props: Pick<FormControlLabelProps, 'required' | 'disabled'>
): FormControlLabelProps['children'] => {
  return {
    ...element,
    props: {
      ...element.props,
      required: props.required,
      disabled: props.disabled
    }
  };
};
