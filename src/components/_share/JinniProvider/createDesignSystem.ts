import { DesignSystemType, DeepPartial } from './JinniProvider.types';
import { DEFAULT_DESIGN_SYSTEM } from './JinniProvider.constants';
import { isObject } from '@/utils/isObject';
import { THEME_MODE } from '@/constants/theme-mode';
import { CONTRAST } from '@/constants/contrast';

type ObjectType = { [key: string]: unknown };

const overwrite = ({
  base,
  target
}: {
  base: ObjectType;
  target: ObjectType;
}): ObjectType => {
  const result = base;
  const targetKeys = Object.keys(target);
  targetKeys.forEach((targetKey) => {
    if (
      result[targetKey] &&
      isObject(result[targetKey]) &&
      isObject(target[targetKey])
    ) {
      result[targetKey] = overwrite({
        base: result[targetKey],
        target: target[targetKey]
      });
    } else {
      result[targetKey] = target[targetKey];
    }
  });
  return result;
};

const checkColorType = (color: ObjectType) => {
  if (
    !Object.keys(color).every((key) =>
      ['scheme', 'palette'].some((val) => val === key)
    )
  ) {
    throw new Error(`color는 'scheme', 'palette'로만 분류 가능합니다.`);
  }

  const colorScheme = color['scheme'];
  if (colorScheme && isObject(colorScheme)) {
    if (
      !Object.keys(colorScheme).every((key) =>
        THEME_MODE.some((mode) => mode === key)
      )
    ) {
      throw new Error(
        `color scheme의 첫 번째 layer는 theme type 이어야 합니다.\n- theme type: 'light' | 'dark'`
      );
    }
    Object.keys(colorScheme).forEach((theme) => {
      if (
        colorScheme[theme] &&
        !Object.keys(colorScheme[theme]).every((key) =>
          CONTRAST.some((contrast) => contrast === key)
        )
      ) {
        throw new Error(
          `color scheme의 두 번째 layer는 contrast type 이어야 합니다.\n- contrast type: 'standard' | 'medium' | 'high'`
        );
      }
    });
  }
};

export const createDesignSystem = (
  props?: DeepPartial<DesignSystemType>
): DesignSystemType => {
  const designSystem: DesignSystemType = DEFAULT_DESIGN_SYSTEM;

  if (props) {
    if (props['theme']) {
      designSystem['theme'] = props['theme'];
    }
    if (props['contrast']) {
      designSystem['contrast'] = props['contrast'];
    }
    if (props['color']) {
      checkColorType(props['color']);
      designSystem['color'] = overwrite({
        base: designSystem['color'],
        target: props['color']
      }) as DesignSystemType['color'];
    }
  }

  return designSystem;
};
