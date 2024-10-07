import React from 'react';
import InputField from '../../InputField';
import Dropdown from '../../Dropdown';
import Button from '../../Button';
import { useCTACardStore } from '../../../store/DesignModals/useCTACardStore';

interface ComponentProps {
    key: string;
    label: string;
}

interface CTACardProps {
    componentList: ComponentProps[];
    onComponentSelect: (selectedComponent: string) => void;
}

const CTACard: React.FC<CTACardProps> = ({ componentList, onComponentSelect }) => {
    const {
        componentName,
        title,
        buttonLabel,
        buttonUrl,
        setComponentName,
        setTitle,
        setButtonLabel,
        setButtonUrl,
        saveCTACard,
    } = useCTACardStore();

    const handleSave = () => {
        saveCTACard(); // Calls Zustand's save logic
        onComponentSelect(componentName); // Notify parent about the selected component
    };

    return (
        <div className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
            {/* Adjusting the heading to match the image */}
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

            <InputField
                label="Başlık"
                value={title}
                onChange={setTitle} // Update Zustand state for title
                placeholder="Başlık Alanı"
                type="text"
                className="mb-6 bg-white rounded-lg px-4 py-2"
            />

            <InputField
                label="Buton"
                value={buttonLabel}
                onChange={setButtonLabel} // Update Zustand state for button label
                placeholder="Buton Adı"
                type="text"
                className="mb-6 bg-white rounded-lg px-4 py-2"
            />

            <InputField
                label="Buton URL"
                value={buttonUrl}
                onChange={setButtonUrl} // Update Zustand state for button URL
                placeholder="Buton URL Alanı"
                type="url"
                className="mb-6 bg-white rounded-lg px-4 py-2"
            />

            <Button
                label="Ekle"
                onClick={handleSave}
                className="bg-white text-black shadow border border-gray-600 px-4 py-2"
            />
        </div>
    );
};

export default CTACard;
