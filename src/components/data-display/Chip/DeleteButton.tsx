import React, { useState } from 'react';

interface DeleteButtonProps {
  deleteIcon?: JSX.Element;
  onDelete: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  style?: React.CSSProperties;
}

export const DeleteButton = ({
  deleteIcon,
  onDelete,
  style
}: DeleteButtonProps) => {
  const [hovered, setHovered] = useState(false);
  let opacity = style?.opacity;
  if (opacity && typeof opacity === 'number' && hovered) {
    opacity = opacity + 0.2;
  }

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
        ...style,
        opacity
      }}
    >
      {deleteIcon}
    </button>
  );
};
