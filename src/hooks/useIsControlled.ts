import { useRef } from 'react';

const collapseWhitespace = (text: string) => text.replace(/\s+/g, ' ');

export const useIsControlled = <T>(
  controlledValue: T | undefined
): controlledValue is Exclude<T, undefined> => {
  const prevValueRef = useRef(controlledValue);

  let isControlled: boolean = false;
  if (prevValueRef.current !== undefined && controlledValue !== undefined) {
    isControlled = true;
  } else {
    let errorMessage = '';
    if (prevValueRef.current === undefined && controlledValue !== undefined) {
      errorMessage = `A component is changing an uncontrolled input to be controlled.
      This is likely caused by the value changing from undefined to a defined value, which should not happen.
      Decide between using a controlled or uncontrolled element for the lifetime of the component.`;
    } else if (
      prevValueRef.current !== undefined &&
      controlledValue === undefined
    ) {
      errorMessage = `A component is changing a controlled input to be uncontrolled.
      This is likely caused by the value changing from a defined to undefined, which should not happen.
      Decide between using a controlled or uncontrolled input element for the lifetime of the component.`;
    }
    if (errorMessage) {
      console.error(new Error(collapseWhitespace(errorMessage)));
    }
    isControlled = false;
  }

  prevValueRef.current = controlledValue;
  return isControlled;
};
