import { isValidElement, ReactElement } from 'react';

type ControlInPropType = {
  children: React.ReactNode;
  prevChildrenKeys: React.Key[];
  currentChildrenKeys: React.Key[];
};

export const getChildrenKeys = (children: React.ReactNode): React.Key[] => {
  let validChildren: ReactElement[] = [];
  if (Array.isArray(children)) {
    validChildren = children.filter((child) => isValidElement(child));
  } else if (isValidElement(children)) {
    validChildren = [children];
  }

  return validChildren
    .map((child) => child.key)
    .filter((key) => key !== undefined && key !== null);
};

const setInPropToTrue = (element: ReactElement) => ({
  ...element,
  props: {
    in: true,
    ...element.props
  }
});

const setInPropToFalse = (element: ReactElement) => ({
  ...element,
  props: {
    in: false,
    ...element.props
  }
});

export const controlInProp = ({
  children,
  prevChildrenKeys,
  currentChildrenKeys
}: ControlInPropType) => {
  const addedChildren = currentChildrenKeys.filter(
    (key) => !prevChildrenKeys.includes(key)
  );
  const removedChildren = prevChildrenKeys.filter(
    (key) => !currentChildrenKeys.includes(key)
  );

  const setInProp = (element: ReactElement) => {
    const key = element.key;
    if (key && addedChildren.includes(key)) return setInPropToTrue(element);
    if (key && removedChildren.includes(key)) return setInPropToFalse(element);
  };

  if (isValidElement(children)) return setInProp(children);
  if (Array.isArray(children))
    return children.map((child) =>
      isValidElement(child) ? setInProp(child) : child
    );
  return children;
};
