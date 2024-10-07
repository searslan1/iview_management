import React, { useEffect } from 'react';
import InputField from '../../InputField';
import Dropdown from '../../Dropdown';
import Button from '../../Button';
import { useInfoCardSliderStore } from '../../../store/DesignModals/useInfoCardSliderStore';
import { useGalleryListStore } from '../../../store/useGalleryListStore'; // Import gallery store

interface ComponentProps {
    key: string;
    label: string;
}

interface InfoCardSliderProps {
    componentList: ComponentProps[];
    onComponentSelect: (selectedComponent: string) => void;
}

const InfoCardSlider: React.FC<InfoCardSliderProps> = ({ componentList, onComponentSelect }) => {
    // Zustand store selectors for InfoCardSlider state
    const {
        componentName,
        infoCards,
        setComponentName,
        addInfoCard,
        updateInfoCard,
        saveInfoCardSlider,
    } = useInfoCardSliderStore();

    // Zustand store selectors for gallery list
    const { galleryItems, fetchGalleryItems } = useGalleryListStore();

    // Fetch gallery items when the component mounts
    useEffect(() => {
        fetchGalleryItems(); // Fetch gallery items from store
    }, [fetchGalleryItems]);

    // Extract unique media options from gallery items (e.g., 'Image', 'Video')
    const mediaOptions = galleryItems.map((item) => item.key);

    const handleSave = () => {
        saveInfoCardSlider(); // Calls Zustand's save logic
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
                    setComponentName(value); // Update Zustand state
                    onComponentSelect(value); // Notify parent about the change
                }}
                className="mb-4 bg-gray-200 rounded-lg px-4 py-2"
            />

            {infoCards.map((card, index) => (
                <div key={card.id} className="mb-4 p-4 bg-gray-100 rounded-lg relative">
                    <h3 className="font-bold text-lg mb-4">Info Card {card.id}</h3>

                    <Dropdown
                        label="Icon"
                        options={mediaOptions.length > 0 ? mediaOptions : ['No media available']}
                        selected={card.mediaType}
                        onChange={(value) => updateInfoCard(index, 'mediaType', value)} // Update Zustand state for mediaType
                        className="mb-4 bg-white rounded-lg px-4 py-2"
                    />

                    <InputField
                        label="Başlık"
                        value={card.title}
                        onChange={(value) => updateInfoCard(index, 'title', value)} // Update Zustand state for title
                        placeholder="Başlık Alanı"
                        type="text"
                        className="mb-4 bg-white rounded-lg px-4 py-2"
                    />

                    <InputField
                        label="Alt Başlık"
                        value={card.subtitle}
                        onChange={(value) => updateInfoCard(index, 'subtitle', value)} // Update Zustand state for subtitle
                        placeholder="Alt Başlık Alanı"
                        type="text"
                        className="mb-4 bg-white rounded-lg px-4 py-2"
                    />

                    {index === infoCards.length - 1 && infoCards.length < 4 && (
                        <p className="text-sm text-gray-500"></p>
                    )}

                    <Button
                        label="Info Card Ekle"
                        onClick={addInfoCard} // Add a new InfoCard using Zustand
                        className="bg-white text-black shadow border border-gray-600 px-4 py-2 mb-4"
                    />
                </div>
            ))}

            <Button
                label="Ekle"
                onClick={handleSave}
                className="bg-white text-black shadow border border-gray-600 px-4 py-2"
            />
        </div>
    );
};

export default InfoCardSlider;
