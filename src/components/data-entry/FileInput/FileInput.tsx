import './FileInput.scss';
import React from 'react';
import cn from 'classnames';
import { DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useDragAndDrop } from './FileInput.hooks';

type ValueType<Multiple extends boolean = false> = Multiple extends true
  ? Array<File>
  : null | File;

export type FileInputProps<Multiple extends boolean = false> = Omit<
  DefaultComponentProps<'input'>,
  'value' | 'onChange'
> & {
  children: React.ReactNode;
  multiple?: Multiple;
  value: ValueType<Multiple>;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: ValueType<Multiple>
  ) => void;
  onDrop?: (event: DragEvent) => void;
  onDragOver?: (event: DragEvent) => void;
};

const FileInput = <Multiple extends boolean = false>(
  props: FileInputProps<Multiple>
) => {
  const {
    children,
    multiple,
    value,
    onChange,
    onDrop,
    onDragOver,
    className,
    style,
    ...rest
  } = props;
  const { inputElRef } = useDragAndDrop({ onDrop, onDragOver });
  const newStyle = useStyle(style);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (onChange && files) {
      const newValue = (
        multiple && Array.isArray(value)
          ? [...value, ...files]
          : files[0] || null
      ) as ValueType<Multiple>;
      onChange(event, newValue);
    }
  };

  return (
    <span className={cn('JinniFileInput', className)} style={newStyle}>
      {children}
      <input
        key={String(value)}
        ref={inputElRef}
        type="file"
        className="JinniFileInputRoot"
        multiple={multiple}
        onChange={handleInputChange}
        {...rest}
      />
    </span>
  );
};

export default FileInput;
