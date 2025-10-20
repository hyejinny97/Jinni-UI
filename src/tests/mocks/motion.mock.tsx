import React from 'react';

export const AnimatePresence = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return <>{children}</>;
};

export const Motion = ({
  children,
  as: Component = 'div',
  ...rest
}: {
  children?: React.ReactNode;
  as?: React.ElementType;
}) => {
  return <Component {...rest}>{children}</Component>;
};
