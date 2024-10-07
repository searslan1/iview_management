import React, { useState, useEffect } from 'react';
import Button from '../../Button';
import { useLaunchListStore } from '../../../store/useLaunchListStore';
import { LaunchData } from '../../../types/LaunchData';
import InputField from '../../InputField';
import DatePicker from '../../DatePicker';
import ToggleSwitch from '../../ToggleSwitch';
import Dropdown from '../../Dropdown';

interface EditLaunchModalProps {
  isOpen: boolean;
  onClose: () => void;
  launchData: LaunchData;
  onSave: (updatedData: Omit<LaunchData, 'id'>) => void;
}

const EditLaunchModal: React.FC<EditLaunchModalProps> = ({ isOpen, onClose, launchData, onSave }) => {
  const { updateLaunch, removeLaunch } = useLaunchListStore();
  const [formData, setFormData] = useState<LaunchData>({ ...launchData });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    setFormData({ ...launchData });
  }, [launchData]);

  const handleSave = async () => {
    if (formData.id) {
      const updatedLaunch: LaunchData = { ...formData }; 
      await updateLaunch(formData.id, updatedLaunch);
      onSave(updatedLaunch); 
      onClose();
    } else {
      console.error('No ID available for update');
    }
  };

  const handleDelete = async () => {
    if (formData.id) {
      await removeLaunch(formData.id);
      onClose();
    } else {
      console.error('No ID available for deletion');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="flex flex-col h-full my-9 bg-white p-10 rounded-lg shadow-lg max-w-3xl w-full overflow-y-scroll">
        <div className="bg-blue-50 p-2 rounded-t-lg flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold mb-1 text-gray-700">Lansmanı Düzenle</h2>
          <button onClick={onClose} className="text-black text-xl">
            &times; {/* Kapatma simgesi */}
          </button>
        </div>
        <div className="p-6">
          <InputField label="Lansman Adı" value={formData.name} onChange={(value) => handleChange('name', value)} />
          <Dropdown label="Dil" options={['Türkçe', 'İngilizce']} selected={formData.language} onChange={(value) => handleChange('language', value)} />
          <InputField label="Firma Adı" value={formData.companyName} onChange={(value) => handleChange('companyName', value)} />
          <DatePicker label="Yayına Başlama Tarihi" value={formData.startDate} onChange={(date) => handleChange('startDate', date)} />
          <DatePicker label="Yayın Bitiş Tarihi" value={formData.endDate} onChange={(date) => handleChange('endDate', date)} />
          <InputField label="Sıra Numarası" value={formData.orderNumber} onChange={(value) => handleChange('orderNumber', value)} />

          <div className="flex justify-between mt-6">
            <ToggleSwitch
              label="Aktif Et"
              checked={formData.isActive}
              showActivateText={false}
              showIcon={false}
              onChange={(checked) => handleChange('isActive', checked)}
            />
            <ToggleSwitch
              label="Anasayfa Yap"
              showActivateText={false}
              showIcon={false}
              checked={formData.showOnHomepage}
              onChange={(checked) => handleChange('showOnHomepage', checked)}
            />
          </div>

          <div className="mt-8 flex justify-between">
            <Button onClick={handleSave} className="h-12 px-10 py-2 bg-[#970928] text-white" label="Kaydet" />
            <Button onClick={handleDelete} className="h-12 px-10 py-2 bg-white border-red-600 text-red-600 ml-4" label="Sil" />
          </div>
        </div>
     
      </div>
    </div>
  );
};

export default EditLaunchModal;
