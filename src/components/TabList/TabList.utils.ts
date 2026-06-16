export const scrollIntoViewWithin = ({
  container,
  target
}: {
  container: HTMLElement;
  target: HTMLElement;
}) => {
  const containerRect = container.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  if (targetRect.left < containerRect.left) {
    container.scrollLeft -= containerRect.left - targetRect.left;
  }
  if (targetRect.right > containerRect.right) {
    container.scrollLeft += targetRect.right - containerRect.right;
  }
  if (targetRect.top < containerRect.top) {
    container.scrollTop -= containerRect.top - targetRect.top;
  }
  if (targetRect.bottom > containerRect.bottom) {
    container.scrollTop += targetRect.bottom - containerRect.bottom;
  }
};
