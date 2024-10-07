import React, { useEffect } from 'react';
import { useTwinFlipCardStore } from '../../../store/DesignModals/useTwinFlipCardStore';
import { useGalleryListStore } from '../../../store/useGalleryListStore'; // Import gallery store
import Dropdown from '../../Dropdown';
import Button from '../../Button';

interface ComponentProps {
  key: string;
  label: string;
}

interface TwinFlipCardProps {
  componentList: ComponentProps[];
  onComponentSelect: (selectedComponent: string) => void;
}

const TwinFlipCard: React.FC<TwinFlipCardProps> = ({ componentList, onComponentSelect }) => {
  // Zustand store selectors for TwinFlipCard state
  const {
    componentName,
    rightFrontMediaType,
    rightBackMediaType,
    leftFrontMediaType,
    leftBackMediaType,
    setComponentName,
    setRightFrontMediaType,
    setRightBackMediaType,
    setLeftFrontMediaType,
    setLeftBackMediaType,
  } = useTwinFlipCardStore();

  // Zustand store selectors for gallery list
  const { galleryItems, fetchGalleryItems } = useGalleryListStore();

  // Fetch gallery items when the component mounts
  useEffect(() => {
    fetchGalleryItems(); // Fetch gallery items from the gallery store
  }, [fetchGalleryItems]);

  // Extract unique media options from gallery items (e.g., 'Image', 'Video')
  const mediaOptions = galleryItems.map((item) => item.key);

  const handleSave = () => {
    // Form data save logic
    console.log('Form saved:', {
      componentName,
      rightFrontMediaType,
      rightBackMediaType,
      leftFrontMediaType,
      leftBackMediaType,
    });
    onComponentSelect(componentName);
  };

  return (
    <div className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
      {/* Component Title */}
      <h2 className="text-xl font-bold mb-4 text-center bg-blue-200 py-2 px-4 rounded-full">
        Component Ekle
      </h2>

      {/* Dropdown for selecting component */}
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

      {/* Right Card Section */}
      <div className="mb-4 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Right Card</h3>

        <Dropdown
          label="Ön Medya Alanı"
          options={mediaOptions.length > 0 ? mediaOptions : ['No media available']}
          selected={rightFrontMediaType}
          onChange={setRightFrontMediaType}
          className="mb-4 bg-white rounded-lg px-4 py-2"
        />

        <Dropdown
          label="Arka Medya Alanı"
          options={mediaOptions.length > 0 ? mediaOptions : ['No media available']}
          selected={rightBackMediaType}
          onChange={setRightBackMediaType}
          className="mb-4 bg-white rounded-lg px-4 py-2"
        />
      </div>

      {/* Left Card Section */}
      <div className="mb-4 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Left Card</h3>

        <Dropdown
          label="Ön Medya Alanı"
          options={mediaOptions.length > 0 ? mediaOptions : ['No media available']}
          selected={leftFrontMediaType}
          onChange={setLeftFrontMediaType}
          className="mb-4 bg-white rounded-lg px-4 py-2"
        />

        <Dropdown
          label="Arka Medya Alanı"
          options={mediaOptions.length > 0 ? mediaOptions : ['No media available']}
          selected={leftBackMediaType}
          onChange={setLeftBackMediaType}
          className="mb-4 bg-white rounded-lg px-4 py-2"
        />
      </div>

      <Button
        label="Ekle"
        onClick={handleSave}
        className="bg-white text-black shadow border border-gray-600 px-4 py-2"
      />
    </div>
  );
};

export default TwinFlipCard;
