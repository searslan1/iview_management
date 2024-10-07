import React, { useEffect } from 'react';
import InputField from '../../InputField';
import Dropdown from '../../Dropdown';
import Button from '../../Button';
import useTwinTopTitleHeroStore from '../../../store/DesignModals/useTwinTopTitleHeroStore';
import { useGalleryListStore } from '../../../store/useGalleryListStore'; // Import the gallery store

interface ComponentProps {
  key: string;
  label: string;
}

interface TwinTopTitleHeroCardProps {
  componentList: ComponentProps[];
  onComponentSelect: (selectedComponent: string) => void;
}

const TwinTopTitleHeroCard: React.FC<TwinTopTitleHeroCardProps> = ({ componentList, onComponentSelect }) => {
  const {
    componentName,
    rightCard,
    leftCard,
    setComponentName,
    updateRightCard,
    updateLeftCard,
  } = useTwinTopTitleHeroStore((state) => state);

  // Zustand store for gallery list
  const { galleryItems, fetchGalleryItems } = useGalleryListStore();

  // Fetch gallery items when the component mounts
  useEffect(() => {
    fetchGalleryItems(); // Fetch gallery items from the gallery store
  }, [fetchGalleryItems]);

  // Extract media options from gallery items
  const mediaOptions = galleryItems.map((item) => item.key);

  // Handle saving the form
  const handleSave = () => {
    console.log('Form saved:', { componentName, rightCard, leftCard });
    onComponentSelect(componentName);
  };

  return (
    <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
      {/* Title for the form */}
      <h2 className="text-xl font-bold mb-4 text-center bg-blue-200 py-2 px-4 rounded-full">
        Component Ekle
      </h2>

      {/* Dropdown for component name selection */}
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

      {/* Right and Left Card Divisions */}
      <div className="grid grid-cols-2 gap-8">
        {/* Right Card Section */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Right Card</h3>

          <Dropdown
            label="Medya Alanı"
            options={mediaOptions.length > 0 ? mediaOptions : ['No media available']}
            selected={rightCard.mediaType}
            onChange={(value) => updateRightCard('mediaType', value)}
            className="mb-4"
          />
          <InputField
            label="Başlık"
            value={rightCard.title}
            onChange={(value) => updateRightCard('title', value)}
            placeholder="Başlık Alanı"
            className="mb-4"
          />
          <InputField
            label="Alt Başlık"
            value={rightCard.subtitle}
            onChange={(value) => updateRightCard('subtitle', value)}
            placeholder="Alt Başlık"
            className="mb-4"
          />
          <InputField
            label="Buton Adı"
            value={rightCard.buttonLabel}
            onChange={(value) => updateRightCard('buttonLabel', value)}
            placeholder="Buton Adı"
            className="mb-4"
          />
          <InputField
            label="Buton URL"
            value={rightCard.buttonUrl}
            onChange={(value) => updateRightCard('buttonUrl', value)}
            placeholder="Buton URL"
            className="mb-4"
          />
        </div>

        {/* Left Card Section */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Left Card</h3>

          <Dropdown
            label="Medya Alanı"
            options={mediaOptions.length > 0 ? mediaOptions : ['No media available']}
            selected={leftCard.mediaType}
            onChange={(value) => updateLeftCard('mediaType', value)}
            className="mb-4"
          />
          <InputField
            label="Başlık"
            value={leftCard.title}
            onChange={(value) => updateLeftCard('title', value)}
            placeholder="Başlık Alanı"
            className="mb-4"
          />
          <InputField
            label="Alt Başlık"
            value={leftCard.subtitle}
            onChange={(value) => updateLeftCard('subtitle', value)}
            placeholder="Alt Başlık"
            className="mb-4"
          />
          <InputField
            label="Buton Adı"
            value={leftCard.buttonLabel}
            onChange={(value) => updateLeftCard('buttonLabel', value)}
            placeholder="Buton Adı"
            className="mb-4"
          />
          <InputField
            label="Buton URL"
            value={leftCard.buttonUrl}
            onChange={(value) => updateLeftCard('buttonUrl', value)}
            placeholder="Buton URL"
            className="mb-4"
          />
        </div>
      </div>

      {/* Save Button */}
      <Button
        label="Ekle"
        onClick={handleSave}
        className="bg-white text-black shadow border border-gray-600 px-4 py-2 mt-6"
      />
    </div>
  );
};

export default TwinTopTitleHeroCard;
