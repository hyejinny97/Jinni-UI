import './Avatar.scss';
import cn from 'classnames';
import { useState } from 'react';
import { PersonIcon } from '@/components/icons/PersonIcon';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';

export type AvatarProps<T extends AsType = 'span'> =
  DefaultComponentProps<T> & {
    src?: string;
    alt?: string;
    imgProps?: Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
    shape?: 'circle' | 'square' | 'rounded';
    children?: React.ReactNode;
  };

const DefaultAvatarIcon = () => <PersonIcon color="white" />;

const Avatar = <T extends AsType = 'span'>(props: AvatarProps<T>) => {
  const {
    src,
    alt,
    imgProps,
    size = 'md',
    shape = 'circle',
    children,
    className,
    style,
    as: Component = 'span',
    ...rest
  } = props;
  let newStyle = useStyle(style);
  const [isImageAvatar, setIsImageAvatar] = useState(!!src);
  const hasNumberTypeSize = typeof size === 'number';

  const handleImageLoadError = () => {
    setIsImageAvatar(false);
  };

  if (hasNumberTypeSize) newStyle = { ...newStyle, width: size, height: size };

  let content = children || alt || <DefaultAvatarIcon />;
  if (isImageAvatar)
    content = (
      <img src={src} alt={alt} {...imgProps} onError={handleImageLoadError} />
    );

  return (
    <Component
      className={cn(
        'JinniAvatar',
        { 'image-avatar': isImageAvatar },
        { [size]: !hasNumberTypeSize },
        shape,
        className
      )}
      style={newStyle}
      {...rest}
    >
      {content}
    </Component>
  );
};

export default Avatar;
