import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ToggleSwitch from './ToggleSwitch';

const SortableItem = ({ id, label, checked, onToggleChange }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="bg-gray-100 p-4 mb-2 rounded shadow flex justify-between items-center">
      <span>{label}</span>
      <ToggleSwitch
        label=""
        checked={checked}
        onChange={onToggleChange}
        showIcon={true}
        showActivateText={true}
      />
    </div>
  );
};

export default SortableItem;
