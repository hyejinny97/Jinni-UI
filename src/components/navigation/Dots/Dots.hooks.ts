import {
  useState,
  useContext,
  useRef,
  useLayoutEffect,
  useEffect
} from 'react';
import { DotsProps } from './Dots';
import { DotValueType } from './Dot';
import DotsContext from './Dots.contexts';

type UseSelectedValueProps = Required<Pick<DotsProps, 'defaultValue'>> &
  Pick<DotsProps, 'value' | 'onChange'>;

type UseMaxDotsProps = Required<Pick<DotsProps, 'orientation'>> &
  Pick<DotsProps, 'max'> & { selectedValue: DotValueType | null };

export const useSelectedValue = ({
  defaultValue,
  value,
  onChange
}: UseSelectedValueProps) => {
  const isControlled = value !== undefined;
  const [uncontrolledSelectedValue, setUncontrolledSelectedValue] =
    useState(defaultValue);

  const handleChange = (
    event: Event | React.SyntheticEvent,
    newValue: DotValueType
  ) => {
    if (!isControlled) setUncontrolledSelectedValue(newValue);
    if (onChange) onChange(event, newValue);
  };

  return {
    selectedValue: isControlled ? value : uncontrolledSelectedValue,
    handleChange
  };
};

export const useMaxDots = ({
  max,
  orientation,
  selectedValue
}: UseMaxDotsProps) => {
  const dotsContainerElRef = useRef<HTMLDivElement>(null);
  const dotsElRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const dotsContainerEl = dotsContainerElRef.current;
    const dotsEl = dotsElRef.current;
    if (!max || !dotsContainerEl || !dotsEl) return;

    const dotElList = dotsEl.querySelectorAll<HTMLElement>('li.JinniDot');
    switch (orientation) {
      case 'horizontal': {
        const dotElWidth = dotElList[0].offsetWidth;
        dotsContainerEl.style.width = `${dotElWidth * max}px`;
        return;
      }
      case 'vertical': {
        const dotElHeight = dotElList[0].offsetHeight;
        dotsContainerEl.style.height = `${dotElHeight * max}px`;
      }
    }
  }, [max, orientation]);

  useEffect(() => {
    const dotsContainerEl = dotsContainerElRef.current;
    const dotsEl = dotsElRef.current;
    if (!max || !dotsContainerEl || !dotsEl) return;

    const dotElList = Array.from(
      dotsEl.querySelectorAll<HTMLElement>('li.JinniDot')
    );
    const selectedDotEl = dotElList.find(
      (dotEl) => dotEl.dataset.value === String(selectedValue)
    );
    if (!selectedDotEl) return;

    switch (orientation) {
      case 'horizontal': {
        const maxScroll = dotsEl.scrollWidth - dotsContainerEl.clientWidth;
        const nextScrollLeft =
          selectedDotEl.offsetLeft +
          selectedDotEl.offsetWidth / 2 -
          dotsContainerEl.clientWidth / 2;
        dotsContainerEl.scroll({
          left: Math.max(0, Math.min(maxScroll, nextScrollLeft)),
          behavior: 'smooth'
        });
        break;
      }
      case 'vertical': {
        const maxScroll = dotsEl.scrollHeight - dotsContainerEl.clientHeight;
        const nextScrollTop =
          selectedDotEl.offsetTop +
          selectedDotEl.offsetHeight / 2 -
          dotsContainerEl.clientHeight / 2;
        dotsContainerEl.scroll({
          top: Math.max(0, Math.min(maxScroll, nextScrollTop)),
          behavior: 'smooth'
        });
      }
    }
  }, [max, selectedValue, orientation]);

  return { dotsContainerElRef, dotsElRef };
};

export const useDots = () => {
  const value = useContext(DotsContext);
  if (!value) throw new Error('DotsContext value is null');
  return value;
};
