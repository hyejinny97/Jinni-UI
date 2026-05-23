import {
  JinniProvider,
  createDesignSystem
} from '@/components/_share/JinniProvider';

const designSystem = createDesignSystem();

const JinniProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return <JinniProvider designSystem={designSystem}>{children}</JinniProvider>;
};

export default JinniProviderWrapper;
