import React, { useEffect } from 'react';
import InputField from '../../InputField';
import Dropdown from '../../Dropdown';
import Button from '../../Button';
import useMiniCardSliderStore from '../../../store/DesignModals/useMiniCardSliderStore';
import { useGalleryListStore } from '../../../store/useGalleryListStore'; // Import the gallery list store

interface ComponentProps {
  key: string;
  label: string;
}

interface MiniCardSliderProps {
  componentList: ComponentProps[];
  onComponentSelect: (selectedComponent: string) => void;
}

const MiniCardSlider: React.FC<MiniCardSliderProps> = ({ componentList, onComponentSelect }) => {
  const {
    componentName,
    miniCards,
    setComponentName,
    updateCard,
    addCard,
  } = useMiniCardSliderStore((state) => state);

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
    console.log('Form saved:', { componentName, miniCards });
    onComponentSelect(componentName);
  };

  return (
    <div className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center bg-blue-200 py-2 px-4 rounded-full">
        Mini Card Slider
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

      {/* Mini card sections */}
      {miniCards.map((card, index) => (
        <div key={card.id} className="mb-4 p-4 bg-gray-100 rounded-lg relative">
          <h3 className="font-bold text-lg mb-4">Mini Card {card.id}</h3>

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

          {/* Background media type dropdown */}
          <Dropdown
            label="Arka Plan Medya"
            options={mediaOptions.length > 0 ? mediaOptions : ['No media available']}
            selected={card.mediaType}
            onChange={(value) => updateCard(index, 'mediaType', value)}
            className="mb-4 bg-white rounded-lg px-4 py-2"
          />

          {/* Text field for card title */}
          <InputField
            label="Yazı Alanı"
            value={card.title}
            onChange={(value) => updateCard(index, 'title', value)}
            placeholder="Yazı Alanı"
            type="text"
            className="mb-4 bg-white rounded-lg px-4 py-2"
          />

          {/* Logo media type dropdown */}
          <Dropdown
            label="Logo Alanı"
            options={mediaOptions.length > 0 ? mediaOptions : ['No media available']}
            selected={card.logoMediaType}
            onChange={(value) => updateCard(index, 'logoMediaType', value)}
            className="mb-4 bg-white rounded-lg px-4 py-2"
          />

          {/* Add new mini card button, only shows if less than 4 cards */}
          {index === miniCards.length - 1 && miniCards.length < 4 && (
            <Button
              label="Mini Card Ekle"
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

export default MiniCardSlider;
