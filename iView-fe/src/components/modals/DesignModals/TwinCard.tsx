import React, { useEffect } from 'react';
import Dropdown from '../../Dropdown';
import Button from '../../Button';
import { useTwinCardStore } from '../../../store/DesignModals/useTwinCardStore';
import { useGalleryListStore } from '../../../store/useGalleryListStore'; // Import gallery store

interface ComponentProps {
  key: string;
  label: string;
}

interface TwinCardProps {
  componentList: ComponentProps[];
  onComponentSelect: (selectedComponent: string) => void;
}

const TwinCard: React.FC<TwinCardProps> = ({ componentList, onComponentSelect }) => {
  // Zustand store selectors for TwinCard state
  const {
    componentName,
    rightMediaType,
    leftMediaType,
    setComponentName,
    setRightMediaType,
    setLeftMediaType,
  } = useTwinCardStore();

  // Zustand store selectors for gallery list
  const { galleryItems, fetchGalleryItems } = useGalleryListStore();

  // Fetch gallery items when the component mounts
  useEffect(() => {
    fetchGalleryItems(); // Fetch gallery items from store
  }, [fetchGalleryItems]);

  // Extract unique media options from gallery items (e.g., 'Image', 'Video')
  const mediaOptions = galleryItems.map((item) => item.key);

  const handleSave = () => {
    console.log('Form saved:', { componentName, rightMediaType, leftMediaType });
    onComponentSelect(componentName); // Notify parent about the selected component
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

      <Dropdown
        label="Sağ Medya"
        options={mediaOptions.length > 0 ? mediaOptions : ['No media available']}
        selected={rightMediaType}
        onChange={setRightMediaType}
        className="mb-4 bg-white rounded-lg px-4 py-2"
      />

      <Dropdown
        label="Sol Medya"
        options={mediaOptions.length > 0 ? mediaOptions : ['No media available']}
        selected={leftMediaType}
        onChange={setLeftMediaType}
        className="mb-4 bg-white rounded-lg px-4 py-2"
      />

      <Button
        label="Ekle"
        onClick={handleSave}
        className="bg-white text-black shadow border border-gray-600 px-4 py-2"
      />
    </div>
  );
};

export default TwinCard;
