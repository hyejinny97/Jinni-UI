export const insertDivider = (
  children: React.ReactNode,
  divider: React.ReactNode
): React.ReactNode => {
  if (!children || !Array.isArray(children) || !divider) return children;

  const isLastChild = (idx: number) => idx === children.length - 1;
  return children
    .flatMap((child, idx) => (isLastChild(idx) ? [child] : [child, divider]))
    .map((child, idx) => ({ ...child, key: child.key || idx }));
};
