import { createContext } from 'react';
import { AvatarGroupProps } from './AvatarGroup';

type AvatarGroupContextProps = {
  size: AvatarGroupProps['size'];
  shape: AvatarGroupProps['shape'];
};

const AvatarGroupContext = createContext<AvatarGroupContextProps | null>(null);

export default AvatarGroupContext;
