import React, { useState } from 'react';
import InputField from '../../InputField';
import DatePicker from '../../DatePicker';
import Dropdown from '../../Dropdown';
import Button from '../../Button';
import ToggleSwitch from '../../ToggleSwitch';
import { LaunchData } from '../../../types/LaunchData';

interface NewLaunchProps {
  isActive: boolean;
  onActiveToggle: (active: boolean) => void;
  onSave: (data: Omit<LaunchData, 'id'>) => void;
  onClose: () => void;
  initialData: Omit<LaunchData, 'id'>;
}

const NewLaunchPage: React.FC<NewLaunchProps> = ({ isActive, onSave, onClose, onActiveToggle, initialData }) => {
  const [formData, setFormData] = useState<Omit<LaunchData, 'id'>>(initialData);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        {/* Header with title and close button */}
        <div className="bg-blue-50 p-2 rounded-t-lg flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mb-1 text-gray-700">Yeni Lansman Ekle</h1>
          <button onClick={onClose} className="text-black text-xl">
            &times; 
          </button>
        </div>
 
        {/* Modal content */}
        <div className="p-6">
          <InputField label="Lansman Adı" value={formData.name} onChange={(value) => handleChange('name', value)} />
          <Dropdown label="Dil" options={['Türkçe', 'İngilizce']} selected={formData.language} onChange={(value) => handleChange('language', value)} />
          <InputField label="Firma Adı" value={formData.companyName} onChange={(value) => handleChange('companyName', value)} />
          <DatePicker label="Yayına Başlama Tarihi" value={formData.startDate} onChange={(date) => handleChange('startDate', date)} />
          <DatePicker label="Yayın Bitiş Tarihi" value={formData.endDate} onChange={(date) => handleChange('endDate', date)} />
          <InputField label="Sıra Numarası" value={formData.orderNumber} onChange={(value) => handleChange('orderNumber', value)} />

          <div className="flex justify-between mt-6">
            <ToggleSwitch label="Aktif Et" checked={formData.isActive} showActivateText={false} showIcon={false} onChange={(checked) => handleChange('isActive', checked)} />
            <ToggleSwitch label="Anasayfa Yap" showActivateText={false} showIcon={false} checked={formData.showOnHomepage} onChange={(checked) => handleChange('showOnHomepage', checked)} />
          </div>

          <div className="mt-8 flex justify-between">
            <Button onClick={() => onSave(formData)} className="h-12 px-10 py-2 bg-[#970928] text-white" label="Kaydet" />
            <Button onClick={onClose} className="h-12 px-10 py-2 bg-gray-200" label="İptal" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLaunchPage;
