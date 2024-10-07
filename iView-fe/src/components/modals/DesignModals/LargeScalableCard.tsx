import React, { useEffect } from 'react';
import Dropdown from '../../Dropdown';
import Button from '../../Button';
import { useLargeScalableCardStore } from '../../../store/DesignModals/useLargeScalableStore';
import { useGalleryListStore } from '../../../store/useGalleryListStore'; // Import gallery store

interface LargeScalableCardProps {
  componentList: { key: string; label: string }[];
  onComponentSelect: (selectedComponent: string) => void;
}

const LargeScalableCard: React.FC<LargeScalableCardProps> = ({ componentList, onComponentSelect }) => {
  // Zustand store selectors for scalable card state
  const {
    componentName,
    mediaType,
    setComponentName,
    setMediaType,
    saveCardState,
  } = useLargeScalableCardStore();

  // Zustand store selectors for gallery list
  const { galleryItems, fetchGalleryItems } = useGalleryListStore();

  // Fetch gallery items when the component mounts
  useEffect(() => {
    fetchGalleryItems(); // Ensure gallery items are fetched
  }, [fetchGalleryItems]);

  // Extract unique media types (e.g., 'Image', 'Video') from gallery items
  const mediaOptions = Array.from(new Set(galleryItems.map((item) => item.key)));

  const handleSave = () => {
    saveCardState();  // Calls Zustand's save logic
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

export default LargeScalableCard;
