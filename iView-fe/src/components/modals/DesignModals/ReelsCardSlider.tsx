import React, { useEffect } from 'react';
import InputField from '../../InputField';
import Dropdown from '../../Dropdown';
import Button from '../../Button';
import { useReelsCardSliderStore } from '../../../store/DesignModals/useReelsCardSliderStore';
import { useGalleryListStore } from '../../../store/useGalleryListStore'; // Import gallery store

interface ComponentProps {
    key: string;
    label: string;
}

interface ReelsCardSliderProps {
    componentList: ComponentProps[];
    onComponentSelect: (selectedComponent: string) => void;
}

const ReelsCardSlider: React.FC<ReelsCardSliderProps> = ({ componentList, onComponentSelect }) => {
    // Zustand store selectors for ReelsCardSlider state
    const {
        componentName,
        reelsCards,
        setComponentName,
        addReelsCard,
        updateReelsCard,
        saveReelsCardSliderState,
    } = useReelsCardSliderStore();

    // Zustand store selectors for gallery list
    const { galleryItems, fetchGalleryItems } = useGalleryListStore();

    // Fetch gallery items when the component mounts
    useEffect(() => {
        fetchGalleryItems(); // Ensure gallery items are fetched
    }, [fetchGalleryItems]);

    // Extract unique media types (e.g., 'Image', 'Video') from gallery items
    const mediaOptions = Array.from(new Set(galleryItems.map((item) => item.key)));

    const handleSave = () => {
        saveReelsCardSliderState();  // Calls Zustand's save logic
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

            {reelsCards.map((card, index) => (
                <div key={card.id} className="mb-4 p-4 bg-gray-100 rounded-lg relative">
                    <h3 className="font-bold text-lg mb-4">Reels Card {card.id}</h3>

                    <Dropdown
                        label="Medya Alanı"
                        options={mediaOptions.length > 0 ? mediaOptions : ['No media available']}
                        selected={card.mediaType}
                        onChange={(value) => updateReelsCard(index, 'mediaType', value)}
                        className="mb-4 bg-white rounded-lg px-4 py-2"
                    />

                    <InputField
                        label="Başlık"
                        value={card.title}
                        onChange={(value) => updateReelsCard(index, 'title', value)}
                        placeholder="Başlık Alanı"
                        type="text"
                        className="mb-4 bg-white rounded-lg px-4 py-2"
                    />

                    <InputField
                        label="Alt Başlık"
                        value={card.subtitle}
                        onChange={(value) => updateReelsCard(index, 'subtitle', value)}
                        placeholder="Alt Başlık Alanı"
                        type="text"
                        className="mb-4 bg-white rounded-lg px-4 py-2"
                    />

                    {index === reelsCards.length - 1 && reelsCards.length < 4 && (
                        <p className="text-sm text-gray-500">En az dört tane eklemelisiniz!</p>
                    )}

                    {index === reelsCards.length - 1 && (
                        <Button
                            label="Reels Card Ekle"
                            onClick={addReelsCard}
                            className="bg-white text-black shadow border border-gray-600 px-4 py-2 mb-4"
                        />
                    )}
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

export default ReelsCardSlider;
