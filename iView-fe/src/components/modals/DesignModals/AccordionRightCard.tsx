import React, { useEffect } from 'react';
import { useAccordionCardStore } from '../../../store/DesignModals/useAccordionCardStore';
import { useGalleryListStore } from '../../../store/useGalleryListStore'; // Import the gallery store
import InputField from '../../InputField';
import Button from '../../Button';
import Dropdown from '../../Dropdown';

interface ComponentProps {
  key: string;
  label: string;
}

interface AccordionCardProps {
  componentList: ComponentProps[];
  onComponentSelect: (selectedComponent: string) => void;
}

const AccordionCard: React.FC<AccordionCardProps> = ({ componentList, onComponentSelect }) => {
  const {
    componentName,
    mediaType,
    accordionCards,
    setComponentName,
    setMediaType,
    addAccordionCard,
    updateAccordionCard,
  } = useAccordionCardStore();

  // Zustand store for gallery list
  const { galleryItems, fetchGalleryItems } = useGalleryListStore();

  // Fetch gallery items when the component mounts
  useEffect(() => {
    fetchGalleryItems(); // Fetch gallery items from the gallery store
  }, [fetchGalleryItems]);

  // Extract media options from gallery items
  const mediaOptions = galleryItems.map((item) => item.key);

  const handleSave = () => {
    console.log('Form saved:', { componentName, accordionCards });
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

      {/* Media Type Dropdown */}
      <Dropdown
        label="Medya"
        options={mediaOptions.length > 0 ? mediaOptions : ['No media available']}
        selected={mediaType}
        onChange={setMediaType}
        className="mb-4 bg-white rounded-lg px-4 py-2"
      />

      {/* Accordion cards */}
      {accordionCards.map((card, index) => (
        <div key={card.id} className="mb-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-bold text-lg mb-4">Accordion Bölüm {card.id}</h3>

          {/* Title input */}
          <InputField
            label="Başlık"
            value={card.title}
            onChange={(value) => updateAccordionCard(index, 'title', value)}
            placeholder="Başlık Alanı"
            type="text"
            className="mb-4 bg-white rounded-lg px-4 py-2"
          />

          {/* Subtitle input */}
          <InputField
            label="Alt Başlık"
            value={card.subtitle}
            onChange={(value) => updateAccordionCard(index, 'subtitle', value)}
            placeholder="Alt Başlık Alanı"
            type="text"
            className="mb-4 bg-white rounded-lg px-4 py-2"
          />

          {/* Add New Accordion Button */}
          {index === accordionCards.length - 1 && accordionCards.length < 4 && (
            <Button
              label="Accordion Bölüm Ekle"
              onClick={addAccordionCard}
              className="bg-white text-black shadow border border-gray-600 px-4 py-2 mb-4"
            />
          )}
        </div>
      ))}

      {/* Save Button */}
      <Button
        label="Ekle"
        onClick={handleSave}
        className="bg-white text-black shadow border border-gray-600 px-4 py-2"
      />
    </div>
  );
};

export default AccordionCard;
