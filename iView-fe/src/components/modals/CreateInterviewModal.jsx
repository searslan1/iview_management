import React from 'react';
import Button from '../Button';
import InputField from '../InputField';
import Dropdown from '../Dropdown';
import DatePicker from '../DatePicker';
import usePackageListStore from '../../store/usePackageListStore'; // Package list store'u içe aktarıyoruz
const CreateInterviewModal = ({
  isOpen,
  onClose,
  onAddInterview,
  title,
  packageName,
  expireDate,
  setTitle,
  setPackageName,
  setExpireDate,
  packages
}) => {
  const { loadQuestionsByPackage } = usePackageListStore(); // loadQuestionsByPackage fonksiyonunu alıyoruz
  if (!isOpen) return null;
  const handleAddInterview = () => {
    onAddInterview(); // Mülakat oluşturma fonksiyonu
    loadQuestionsByPackage(packageName); // Seçilen packageName ile soruları yükleme
  };
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
            onChange={(e) => {
              setPackageName(e); // packageName'i set ediyoruz
              loadQuestionsByPackage(e); // Seçilen packageName'e göre soruları yüklüyoruz
            }}
          />
          {/* Expire Date */}
          <DatePicker
            label="Expire Date"
            value={expireDate}
            onChange={setExpireDate}
          />
          {/* Switches */}

          {/* Add Button */}
          <div className="flex justify-end">
            <Button
              label="Add"
              onClick={handleAddInterview} // handleAddInterview ile onAddInterview ve question yükleme işlemi yapıyoruz
              className="text-white bg-[#47A7A2] font-semibold hover:bg-white hover:text-[#47A7A2] border p-2 rounded mt-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateInterviewModal;