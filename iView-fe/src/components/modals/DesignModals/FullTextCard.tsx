import React from 'react';
import Dropdown from '../../Dropdown';
import Button from '../../Button';
import TextArea from '../../TextArea';
import { useFullTextStore } from '../../../store/DesignModals/useFullTextStore';
interface FullTextProps {
  componentList: { key: string; label: string }[];
  onComponentSelect: (selectedComponent: string) => void;
}

const FullText: React.FC<FullTextProps> = ({ componentList, onComponentSelect }) => {
  const {
    componentName,
    description,
    setComponentName,
    setDescription,
    saveFullTextState,
  } = useFullTextStore();

  const handleSave = () => {
    saveFullTextState();  // Trigger Zustand's save logic
    onComponentSelect(componentName);
  };

  return (
    <div className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center bg-blue-200 py-2 px-4 rounded-full">
        Component Ekle
      </h2>

      <Dropdown
        label="Component Adı"
        options={componentList.map(component => component.label)}
        selected={componentName}
        onChange={(value) => {
          setComponentName(value);
          onComponentSelect(value);
        }}
        className="mb-4 bg-gray-200 rounded-lg px-4 py-2"
      />

      <TextArea
        label="Yazı"
        value={description}
        onChange={setDescription}
        maxLength={500}
        placeholder="Yazı Alanı..."
        style={{ minHeight: '100px' }}
      />

      <Button
        label="Ekle"
        onClick={handleSave}
        className="bg-white text-black shadow border border-gray-600 px-4 py-2"
      />
    </div>
  );
};

export default FullText;
