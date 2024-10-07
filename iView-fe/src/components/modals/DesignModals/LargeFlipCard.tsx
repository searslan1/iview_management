import React, { useEffect } from 'react';
import Dropdown from '../../Dropdown';
import Button from '../../Button';
import { useLargeFlipCardStore } from '../../../store/DesignModals/useLargeFlipStore';
import { useGalleryListStore } from '../../../store/useGalleryListStore'; // Import gallery store

interface LargeFlipCardProps {
  componentList: { key: string; label: string }[];
  onComponentSelect: (selectedComponent: string) => void;
}

const LargeFlipCard: React.FC<LargeFlipCardProps> = ({ componentList, onComponentSelect }) => {
  // Zustand store selectors for flip card state
  const {
    componentName,
    frontMediaType,
    backMediaType,
    setComponentName,
    setFrontMediaType,
    setBackMediaType,
    saveFlipCardState,
  } = useLargeFlipCardStore();

  // Zustand store selectors for gallery list
  const { galleryItems, fetchGalleryItems } = useGalleryListStore();

  // Fetch the gallery items when the component mounts
  useEffect(() => {
    fetchGalleryItems(); // Ensure gallery items are fetched
  }, [fetchGalleryItems]);

  // Extract unique media types (e.g., 'Image', 'Video') from gallery items
  const mediaOptions = Array.from(new Set(galleryItems.map((item) => item.key)));

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
        label="Ön Medya Alanı"
        options={mediaOptions.length > 0 ? mediaOptions : ['No media available']}
        selected={frontMediaType}
        onChange={setFrontMediaType}
        className="mb-4 bg-white rounded-lg px-4 py-2"
      />

      <Dropdown
        label="Arka Medya Alanı"
        options={mediaOptions.length > 0 ? mediaOptions : ['No media available']}
        selected={backMediaType}
        onChange={setBackMediaType}
        className="mb-4 bg-white rounded-lg px-4 py-2"
      />

      <Button
        label="Ekle"
        onClick={saveFlipCardState}
        className="bg-white text-black shadow border border-gray-600 px-4 py-2"
      />
    </div>
  );
};

export default LargeFlipCard;
