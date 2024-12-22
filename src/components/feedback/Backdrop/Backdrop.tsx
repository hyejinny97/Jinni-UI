import './Backdrop.scss';
import cn from 'classnames';
import { createPortal } from 'react-dom';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { useOverflowHidden } from './Backdrop.hooks';
import { ElevationLevelType } from '@/types/elevation';
import useJinni from '@/hooks/useJinni';
import { getOverlayType } from './Backdrop.utils';

type BackdropProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {
  children?: React.ReactNode;
  open: boolean;
  overlay?: ElevationLevelType;
};

const Backdrop = <T extends AsType = 'div'>(props: BackdropProps<T>) => {
  const {
    children,
    open,
    onClick,
    overlay = 24,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const { themeMode } = useJinni();
  const overlayType = getOverlayType({ themeMode });
  const newStyle = useStyle({ [overlayType]: overlay, ...style });
  useOverflowHidden({ open });

  const handleBackdropClick = (e: React.MouseEvent) => {
    const { target, currentTarget } = e;
    if (target !== currentTarget || !onClick) return;
    onClick(e);
  };

  return (
    <>
      {open &&
        createPortal(
          <Component
            className={cn('JinniBackdrop', className)}
            style={newStyle}
            onClick={handleBackdropClick}
            {...rest}
          >
            {children}
          </Component>,
          document.body
        )}
    </>
  );
};

export default Backdrop;
