import React, { useEffect } from 'react';
import Dropdown from '../../Dropdown';
import Button from '../../Button';
import useLargePopupCardStore from '../../../store/DesignModals/useLargePopupStore';
import { useGalleryListStore } from '../../../store/useGalleryListStore'; 

interface ComponentProps {
  key: string;
  label: string;
}

interface LargePopupCardProps {
  componentList: ComponentProps[];
  onComponentSelect: (selectedComponent: string) => void;
}

const LargePopupCard: React.FC<LargePopupCardProps> = ({ componentList, onComponentSelect }) => {
  // Zustand store selectors with typed state and actions
  const {
    componentName,
    mediaType,
    setComponentName,
    setMediaType,
    saveComponent,
  } = useLargePopupCardStore();

  // Fetch gallery items from the useGalleryListStore Zustand store
  const { galleryItems, fetchGalleryItems } = useGalleryListStore();

  // Fetch the gallery items when the component loads
  useEffect(() => {
    fetchGalleryItems(); // Ensure the gallery items are fetched
  }, [fetchGalleryItems]);

  // Extract unique media types from gallery items (e.g., Image, Video)
  const mediaOptions = Array.from(new Set(galleryItems.map(item => item.key)));

  const handleSave = () => {
    saveComponent(); // Use Zustand action to save the component
    onComponentSelect(componentName); // Trigger the callback with the selected component name
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
        label="Medya"
        options={mediaOptions.length > 0 ? mediaOptions : ['No media available']}
        selected={mediaType}
        onChange={setMediaType}
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

export default LargePopupCard;
