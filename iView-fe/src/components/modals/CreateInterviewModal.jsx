import React, { useEffect } from 'react';
import Button from '../Button';
import InputField from '../InputField';
import Dropdown from '../Dropdown';
import DatePicker from '../DatePicker';
import useCreateInterviewStore from '../../store/useCreateInterviewStore';

const CreateInterviewModal = ({
  isOpen,
  onClose,
  onAddInterview,
  packages
}) => {
  const {
    title,
    packageName,
    expireDate,
    setTitle,
    setPackageName,
    setExpireDate,
    saveInterview,
    setStatus
  } = useCreateInterviewStore();

  useEffect(() => {
    const interval = setInterval(() => {
      if (expireDate && new Date(expireDate) < new Date()) {
        setStatus('Not Live');
      }
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [expireDate, setStatus]);

  if (!isOpen) return null;
  const packageOptions = packages.map((pkg) => pkg);
  const handleAddInterview = async () => {
    const result = await saveInterview(onAddInterview);
    if (result) {
      onClose();
    }
  };

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
            minDate={new Date().toISOString().split("T")[0]} // Geçmiş tarihler engelleniyor
          />
       
          {/* Add Button */}
          <div className="flex justify-end">
            <Button
              label="Add"
              onClick={handleAddInterview}
              className="text-white bg-[#47A7A2] font-semibold hover:bg-white hover:text-[#47A7A2] border p-2 rounded mt-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateInterviewModal;