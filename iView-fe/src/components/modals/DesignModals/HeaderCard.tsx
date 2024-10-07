import React, { useEffect } from 'react';
import InputField from '../../InputField';
import Dropdown from '../../Dropdown';
import Button from '../../Button';
import useHeaderCardStore from '../../../store/DesignModals/useHeaderCardStore';
import { useGalleryListStore } from '../../../store/useGalleryListStore'; // Import the gallery list store

interface ComponentProps {
    key: string;
    label: string;
}

interface HeaderCardProps {
    componentList: ComponentProps[];
    onComponentSelect: (selectedComponent: string) => void;
}

const HeaderCard: React.FC<HeaderCardProps> = ({ componentList, onComponentSelect }) => {
    const { componentName, mediaType, title, setComponentName, setMediaType, setTitle, reset } = useHeaderCardStore(state => state);
    
    // Zustand store for gallery items
    const { galleryItems, fetchGalleryItems } = useGalleryListStore();

    // Fetch gallery items when the component mounts
    useEffect(() => {
        fetchGalleryItems();
    }, [fetchGalleryItems]);

    // Extract media options from gallery items
    const mediaOptions = galleryItems.length > 0 
        ? galleryItems.map(item => item.key) 
        : ['No media available'];

    const handleSave = () => {
        // Form data save logic
        console.log('Form saved:', { componentName, mediaType, title });
        onComponentSelect(componentName);
        reset(); // Optionally reset the store after saving
    };

    return (
        <div className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
            {/* Adjusting the heading to match the image */}
            <h2 className="text-xl font-bold mb-4 text-center bg-blue-200 py-2 px-4 rounded-full">
                Component Ekle
            </h2>

            <Dropdown
                label="Component Adı"
                options={componentList.map(component => component.label)}
                selected={componentName}
                onChange={setComponentName}
                className="mb-4 bg-gray-200 rounded-lg px-4 py-2"
            />
            <InputField
                label="Başlık"
                value={title}
                onChange={setTitle}
                placeholder="Başlık Alanı"
                type="text"
                className="mb-6 bg-white rounded-lg px-4 py-2"
            />
            <Dropdown
                label="Medya"
                options={mediaOptions}
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

export default HeaderCard;
