import React from 'react';
import Button from '../Button';
import InputField from '../InputField';
import Dropdown from '../Dropdown';
import DatePicker from '../DatePicker';

const CreateInterviewModal = ({ 
  isOpen, 
  onClose, 
  onAddInterview, 
  title, 
  packageName, 
  expireDate, 
  canSkip, 
  showAtOnce, 
  setTitle, 
  setPackageName, 
  setExpireDate, 
  setCanSkip, 
  setShowAtOnce, 
  packages 
}) => {
  if (!isOpen) return null;

  const packageOptions = packages.map((pkg) => pkg); // Use the packages prop

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      {/* Modal content */}
      <div className="relative bg-white rounded-lg shadow-lg p-6" style={{ width: '600px' }}>
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-bold text-[#47A7A2]">Create Interview</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">X</button>
        </div>
        {/* Body */}
        <div className="mt-4 space-y-4">
          {/* Title Input */}
          <InputField
            label="Title"
            type="text"
            value={title}
            onChange={setTitle}
            placeholder="Input..."
          />
          {/* Package Dropdown */}
          <Dropdown
            label="Package"
            options={packageOptions}
            selected={packageName}
            onChange={setPackageName}
          />
          {/* Expire Date */}
          <DatePicker
            label="Expire Date"
            value={expireDate}
            onChange={setExpireDate}
          />
          {/* Switches */}
          <div className="flex justify-between mt-4">
            <div className="flex items-center">
              <label className="mr-2">Can Skip</label>
              <input
                type="checkbox"
                checked={canSkip}
                onChange={() => setCanSkip(!canSkip)}
              />
            </div>
            <div className="flex items-center">
              <label className="mr-2">Show At Once</label>
              <input
                type="checkbox"
                checked={showAtOnce}
                onChange={() => setShowAtOnce(!showAtOnce)}
              />
            </div>
          </div>
          {/* Add Button */}
          <div className="flex justify-end">
            <Button
              label="Add"
              onClick={onAddInterview}
              className="text-white bg-[#47A7A2] font-semibold hover:bg-white hover:text-[#47A7A2] border p-2 rounded mt-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInterviewModal;
