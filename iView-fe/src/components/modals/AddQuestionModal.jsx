import React, { useState } from 'react';
import Button from '../Button';
import TextArea from '../TextArea';
import InputField from '../InputField';

const Modal = ({ isOpen, onClose, onAddQuestion }) => {
  const [packageName, setPackageName] = useState('');
  const [question, setQuestion] = useState('');
  const [time, setTime] = useState(2);

  if (!isOpen) return null;

  const handleAdd = () => {
    onAddQuestion({ packageName, question, time });


    setPackageName('');
    setQuestion('');
    setTime(2);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div
        className="relative bg-white rounded-lg shadow-lg p-6"
        style={{ width: '500px', height: '450px' }}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-bold text-[#47A7A2]">Add Question</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            X
          </button>
        </div>

        {/* Body */}
        <div className="mt-4 space-y-4">
          {/* Package Name Input */}

          <div>
            <InputField
              label="Package Name"
              type="text"
              value={packageName}
              onChange={setPackageName}  // Eğer sadece value'yu parametre olarak alıyorsa
              placeholder="Enter package name"
            />

          </div>

          {/* Question Text Area */}
          <TextArea
            label="Question"
            value={question}
            onChange={setQuestion}
            placeholder="Input your question..."
            maxLength={500}
          />

          {/* Time Input and Add Button */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center border px-3 py-2 rounded-md">
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-12 text-center"
                min={1}
              />
              <span className="ml-2">min</span>
            </div>

            {/* Add button */}
            <Button
              label="Add"
              onClick={handleAdd}
              className="text-white bg-[#47A7A2] font-semibold hover:bg-white hover:text-[#47A7A2] border p-2 rounded mt-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
