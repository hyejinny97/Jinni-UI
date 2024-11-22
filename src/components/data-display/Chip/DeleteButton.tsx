import React, { useState } from 'react';

interface DeleteButtonProps {
  deleteIcon?: JSX.Element;
  onDelete: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  colorStyle: {
    opacity: number;
    fill: string;
  };
}

export const DeleteButton = ({
  deleteIcon,
  onDelete,
  colorStyle
}: DeleteButtonProps) => {
  const [hovered, setHovered] = useState(false);
  const { opacity } = colorStyle;

  const handleDelete = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    onDelete(e);
  };

  return (
    <button
      className="JinniChipIcon right delete-button"
      onClick={handleDelete}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      style={{
        ...colorStyle,
        opacity: hovered ? opacity + 0.2 : opacity
      }}
    >
      {deleteIcon}
    </button>
  );
};
