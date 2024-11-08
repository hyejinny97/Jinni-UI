import './Avatar.scss';
import cn from 'classnames';
import { useState } from 'react';
import useCssStyle from '@/hooks/useCssStyle';
import PersonIcon from '@/components/icons/PersonIcon';

interface AvatarProps extends React.HtmlHTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  imgProps?: Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  shape?: 'circle' | 'square' | 'rounded';
  children?: React.ReactNode;
  className?: string;
}

const DefaultAvatarIcon = () => <PersonIcon />;

const Avatar = (props: AvatarProps) => {
  const {
    src,
    alt,
    imgProps,
    size = 'md',
    shape = 'circle',
    children,
    className,
    style = {}
  } = props;
  let newStyle = useCssStyle(style);
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
    <span
      className={cn(
        'JinniAvatar',
        { 'image-avatar': isImageAvatar },
        { [size]: !hasNumberTypeSize },
        shape,
        className
      )}
      style={newStyle}
    >
      {content}
    </span>
  );
};

export default Avatar;
