import { DesignSystemType, DeepPartial } from './JinniProvider.types';
import { DEFAULT_DESIGN_SYSTEM } from './JinniProvider.constants';

export const createDesignSystem = (
  props?: DeepPartial<DesignSystemType>
): DesignSystemType => {
  const designSystem: DesignSystemType = DEFAULT_DESIGN_SYSTEM;

  if (props) {
    if (props['theme']) {
      designSystem['theme'] = props['theme'];
    }
  }

  return designSystem;
};
