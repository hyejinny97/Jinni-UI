import {
  type PropsWithoutRef,
  type ReactElement,
  type Ref,
  type RefAttributes,
  forwardRef
} from 'react';

export const genericForwardRef = <TRef, TProp = object>(
  render: (props: PropsWithoutRef<TProp>, ref: Ref<TRef>) => ReactElement | null
) => {
  return forwardRef(render) as (
    props: TProp & RefAttributes<TRef>
  ) => ReactElement | null;
};
