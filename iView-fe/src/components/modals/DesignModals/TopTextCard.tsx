import React, { useEffect } from 'react';
import TextArea from '../../TextArea';
import Dropdown from '../../Dropdown';
import Button from '../../Button';
import { useTopTextStore } from '../../../store/DesignModals/useTopTextStore';
import { useGalleryListStore } from '../../../store/useGalleryListStore'; 

interface ComponentProps {
    key: string;
    label: string;
}

interface TopTextCardProps {
    componentList: ComponentProps[];
    onComponentSelect: (selectedComponent: string) => void;
}

const TopTextCard: React.FC<TopTextCardProps> = ({ componentList, onComponentSelect }) => {
    // Zustand store selectors for TopTextCard state
    const {
        componentName,
        mediaType,
        description,
        setComponentName,
        setMediaType,
        setDescription,
        saveTopTextCardState,
    } = useTopTextStore();

    // Zustand store selectors for gallery list
    const { galleryItems, fetchGalleryItems } = useGalleryListStore();

    // Fetch gallery items when the component mounts
    useEffect(() => {
        fetchGalleryItems(); // Fetch gallery items from store
    }, [fetchGalleryItems]);

    // Extract unique media types (e.g., 'Image', 'Video') from gallery items
    const mediaOptions = Array.from(new Set(galleryItems.map((item) => item.key)));

    const handleSave = () => {
        saveTopTextCardState(); // Calls Zustand's save logic
        onComponentSelect(componentName); // Pass the selected componentName to the parent
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

            <Dropdown
                label="Medya"
                options={mediaOptions.length > 0 ? mediaOptions : ['No media available']}
                selected={mediaType}
                onChange={setMediaType} // Update Zustand state for mediaType
                className="mb-4 bg-white rounded-lg px-4 py-2"
            />

            <TextArea
                label="Yazı"
                value={description}
                onChange={setDescription} // Update Zustand state for description
                maxLength={500}
                placeholder="Yazı Alanı..."
                style={{ minHeight: '100px' }}
            />

            <Button
                label="Ekle"
                onClick={handleSave}
                className="bg-white text-black shadow border border-gray-600 px-4 py-2"
            />
        </div>
    );
};

export default TopTextCard;
