import { useRef, useEffect } from 'react';
import { FileInputProps } from './FileInput';

type UseDragAndDropType = Pick<FileInputProps, 'onDrop' | 'onDragOver'>;

export const useDragAndDrop = ({ onDrop, onDragOver }: UseDragAndDropType) => {
  const inputElRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const inputEl = inputElRef.current;
    if (!inputEl) return;

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      onDragOver?.(e);
    };
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      onDrop?.(e);
      if (!e.dataTransfer) return;

      const { files } = e.dataTransfer;
      if (files.length === 0) return;

      const dataTransfer = new DataTransfer();
      Array.from(files).forEach((file) => dataTransfer.items.add(file));
      inputEl.files = dataTransfer.files;
      const changeEvent = new Event('change', { bubbles: true });
      inputEl.dispatchEvent(changeEvent);
    };

    inputEl.addEventListener('dragover', handleDragOver);
    inputEl.addEventListener('drop', handleDrop);

    return () => {
      inputEl.removeEventListener('dragover', handleDragOver);
      inputEl.removeEventListener('drop', handleDrop);
    };
  }, [onDrop, onDragOver]);

  return { inputElRef };
};
