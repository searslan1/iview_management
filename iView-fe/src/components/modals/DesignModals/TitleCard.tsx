import React from 'react';
import InputField from '../../InputField';
import Dropdown from '../../Dropdown';
import Button from '../../Button';
import { useTitleCardStore } from '../../../store/DesignModals/useTitleCardStore';

interface ComponentProps {
  key: string;
  label: string;
}

interface TitleCardProps {
  componentList: ComponentProps[];
  onComponentSelect: (selectedComponent: string) => void;
}

const TitleCard: React.FC<TitleCardProps> = ({ componentList, onComponentSelect }) => {
  const {
    componentName,
    title,
    setComponentName,
    setTitle,
  } = useTitleCardStore(); // Zustand store for state management

  const handleSave = () => {
    console.log('Form saved:', { componentName, title });
    onComponentSelect(componentName);
  };

  return (
    <div className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center bg-blue-200 py-2 px-4 rounded-full">
        Component Ekle
      </h2>

      <Dropdown
        label="Component Adı"
        options={componentList.map((component) => component.label)}
        selected={componentName}
        onChange={(value) => {
          setComponentName(value);
          onComponentSelect(value);
        }}
        className="mb-4 bg-gray-200 rounded-lg px-4 py-2"
      />

      <InputField
        label="Başlık"
        value={title}
        onChange={setTitle}
        placeholder="Başlık Alanı"
        type="text"
        className="mb-6 bg-white rounded-lg px-4 py-2"
      />

      <Button
        label="Ekle"
        onClick={handleSave}
        className="bg-white text-black shadow border border-gray-600 px-4 py-2"
      />
    </div>
  );
};

export default TitleCard;
