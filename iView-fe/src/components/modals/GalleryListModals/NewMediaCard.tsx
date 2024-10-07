import React, { useState } from 'react';
import InputField from '../../InputField';
import Button from '../../Button';
import FileUpload from '../../FileUpload';
import { MdOutlineFileUpload } from "react-icons/md";

interface NewMediaCardProps {
  onSave: (file: File) => void; 
  onClose: () => void;
}

const NewMediaCard: React.FC<NewMediaCardProps> = ({ onSave, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>(''); 
  const [saving, setSaving] = useState(false); 

  // Handle save action
  const handleSave = async () => {
    if (!file || !title) {
      alert('Please provide both title and file');
      return;
    }

    setSaving(true);

    try {  
      onSave(file);
      onClose(); 
    } catch (error) {
      console.error('Error saving file:', error);
      alert('Failed to save file');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center bg-blue-200 py-2 px-4 rounded-full">
        Yeni Medya Ekle
      </h2>

      {/* Input field for Title */}
      <InputField
        label="Medya Adı"
        value={title}
        onChange={setTitle}
        placeholder="lansmanAdi_medyaAdi"
        type="text"
        className="mb-6 bg-white rounded-lg px-4 py-2"
      />

      {/* File upload component */}
      <FileUpload
        label="Medya (Logo / Görsel / Video)"
        file={file}
        onChange={setFile}
        icon={<MdOutlineFileUpload />}
       
      />

      {/* Save Button */}
      <Button
        label={saving ? "Kaydediliyor..." : "Kaydet"}
        onClick={handleSave}
        className={`bg-red-600 text-white shadow px-4 py-2 mt-4 w-full ${saving ? 'cursor-not-allowed' : ''}`}
        disabled={saving} // Disable button while saving
      />
    </div>
  );
};

export default NewMediaCard;
