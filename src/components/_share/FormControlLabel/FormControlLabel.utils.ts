import { FormControlLabelProps } from './FormControlLabel';

export const insertProps = <P>(
  element: FormControlLabelProps<P>['children'],
  props: Pick<FormControlLabelProps<P>, 'required' | 'disabled'>
): FormControlLabelProps<P>['children'] => {
  return {
    ...element,
    props: {
      ...element.props,
      required: props.required,
      disabled: props.disabled
    }
  };
};
