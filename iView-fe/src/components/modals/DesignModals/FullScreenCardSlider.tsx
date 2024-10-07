import React, { useEffect } from 'react';
import InputField from '../../InputField';
import Dropdown from '../../Dropdown';
import Button from '../../Button';
import useFullScreenCardSliderStore from '../../../store/DesignModals/useFullScreenCardSliderStore';
import { useGalleryListStore } from '../../../store/useGalleryListStore'; // Import the gallery list store

interface ComponentProps {
  key: string;
  label: string;
}

interface FullScreenCardSliderProps {
  componentList: ComponentProps[];
  onComponentSelect: (selectedComponent: string) => void;
}

const FullScreenCardSlider: React.FC<FullScreenCardSliderProps> = ({ componentList, onComponentSelect }) => {
  const {
    componentName,
    fullScreenCards,
    setComponentName,
    updateCard,
    addCard,
  } = useFullScreenCardSliderStore((state) => state);

  // Zustand store for gallery items
  const { galleryItems, fetchGalleryItems } = useGalleryListStore();

  // Fetch gallery items when the component mounts
  useEffect(() => {
    fetchGalleryItems();
  }, [fetchGalleryItems]);

  // Extract media options from gallery items
  const mediaOptions = galleryItems.map((item) => item.key);

  // Handle saving the form
  const handleSave = () => {
    console.log('Form saved:', { componentName, fullScreenCards });
    onComponentSelect(componentName);
  };

  return (
    <div className="max-w-4xl p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center bg-blue-200 py-2 px-4 rounded-full">
        Component Ekle
      </h2>

      {/* Component name dropdown */}
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

      {/* Full screen card sections */}
      {fullScreenCards.map((card, index) => (
        <div key={card.id} className="mb-4 p-4 bg-gray-100 rounded-lg relative">
          <h3 className="font-bold text-lg mb-4">Full Screen Card {card.id}</h3>

          {/* Media type dropdown */}
          <Dropdown
            label="Medya"
            options={mediaOptions.length > 0 ? mediaOptions : ['No media available']}
            selected={card.mediaType}
            onChange={(value) => updateCard(index, 'mediaType', value)}
            className="mb-4 bg-white rounded-lg px-4 py-2"
          />

          {/* Title input field */}
          <InputField
            label="Yazı Alanı"
            value={card.title}
            onChange={(value) => updateCard(index, 'title', value)}
            placeholder="Yazı Alanı"
            type="text"
            className="mb-4 bg-white rounded-lg px-4 py-2"
          />

          {/* Button label input field */}
          <InputField
            label="Buton Adı"
            value={card.buttonLabel}
            onChange={(value) => updateCard(index, 'buttonLabel', value)}
            placeholder="Buton Adı Alanı"
            type="text"
            className="mb-4 bg-white rounded-lg px-4 py-2"
          />

          {/* Button URL input field */}
          <InputField
            label="Buton URL"
            value={card.buttonUrl}
            onChange={(value) => updateCard(index, 'buttonUrl', value)}
            placeholder="Buton URL Alanı"
            type="url"
            className="mb-4 bg-white rounded-lg px-4 py-2"
          />

          {/* Logo media type dropdown */}
          <Dropdown
            label="Logo Medya Alanı"
            options={mediaOptions.length > 0 ? mediaOptions : ['No media available']}
            selected={card.logoMediaType}
            onChange={(value) => updateCard(index, 'logoMediaType', value)}
            className="mb-4 bg-white rounded-lg px-4 py-2"
          />

          {index === fullScreenCards.length - 1 && fullScreenCards.length < 4 && (
            <Button
              label="Full Screen Card Ekle"
              onClick={addCard}
              className="bg-white text-black shadow border border-gray-600 px-4 py-2 mb-4"
            />
          )}
        </div>
      ))}

      {/* Save button */}
      <Button
        label="Ekle"
        onClick={handleSave}
        className="bg-white text-black shadow border border-gray-600 px-4 py-2"
      />
    </div>
  );
};

export default FullScreenCardSlider;
