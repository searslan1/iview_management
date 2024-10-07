import React, { useEffect } from 'react';
import { useLargeTopTitleHeroStore } from '../../../store/DesignModals/useLargeTopTitleHeroStore';
import { useGalleryListStore } from '../../../store/useGalleryListStore'; // Import the gallery store
import InputField from '../../InputField';
import Dropdown from '../../Dropdown';
import Button from '../../Button';

interface ComponentProps {
    key: string;
    label: string;
}

interface LargeTopTitleHeroCardProps {
    componentList: ComponentProps[];
    onComponentSelect: (selectedComponent: string) => void;
}

const LargeTopTitleHeroCard: React.FC<LargeTopTitleHeroCardProps> = ({ componentList, onComponentSelect }) => {
    const {
        componentName,
        mediaType,
        title,
        subtitle,
        buttonLabel,
        buttonUrl,
        setComponentName,
        setMediaType,
        setTitle,
        setSubtitle,
        setButtonLabel,
        setButtonUrl,
    } = useLargeTopTitleHeroStore();

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
        console.log('Form saved:', { componentName, mediaType, title, subtitle, buttonLabel, buttonUrl });
        onComponentSelect(componentName);
    };

    return (
        <div className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
            {/* Title for the form */}
            <h2 className="text-xl font-bold mb-4 text-center bg-blue-200 py-2 px-4 rounded-full">
                Component Ekle
            </h2>

            {/* Dropdown for component name selection */}
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

            {/* Dropdown for media type (dynamic options from gallery) */}
            <Dropdown
                label="Medya"
                options={mediaOptions.length > 0 ? mediaOptions : ['No media available']}
                selected={mediaType}
                onChange={setMediaType}
                className="mb-4 bg-white rounded-lg px-4 py-2"
            />

            {/* Input field for title */}
            <InputField
                label="Başlık"
                value={title}
                onChange={setTitle}
                placeholder="Başlık Alanı"
                type="text"
                className="mb-6 bg-white rounded-lg px-4 py-2"
            />

            {/* Input field for subtitle */}
            <InputField
                label="Alt Başlık"
                value={subtitle}
                onChange={setSubtitle}
                placeholder="Alt Başlık Alanı"
                type="text"
                className="mb-6 bg-white rounded-lg px-4 py-2"
            />

            {/* Input field for button label */}
            <InputField
                label="Buton"
                value={buttonLabel}
                onChange={setButtonLabel}
                placeholder="Buton Adı"
                type="text"
                className="mb-6 bg-white rounded-lg px-4 py-2"
            />

            {/* Input field for button URL */}
            <InputField
                label="Buton URL"
                value={buttonUrl}
                onChange={setButtonUrl}
                placeholder="Buton URL Alanı"
                type="url"
                className="mb-6 bg-white rounded-lg px-4 py-2"
            />

            {/* Save Button */}
            <Button
                label="Ekle"
                onClick={handleSave}
                className="bg-white text-black shadow border border-gray-600 px-4 py-2"
            />
        </div>
    );
};

export default LargeTopTitleHeroCard;
