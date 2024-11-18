// NoteEditor.js
import React from 'react';
import TextArea from './TextArea';

const NoteEditor = ({ note, onNoteChange }) => {
  return (
    <div className="mt-4">
      <TextArea
        label="Note"
        value={note}
        onChange={onNoteChange}
        placeholder="Add notes about the candidate..."
        maxLength={500}
      />
    </div>
  );
};

export default NoteEditor;
