import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Button from '../components/Button';
import EditPackageModal from '../components/modals/EditPackageModal'; 
import usePackageStore from '../store/usePackageListStore'; 
import useQuestionListStore from '../store/useQuestionListStore'; 

const ITEM_TYPE = 'PACKAGE';

const DraggablePackage = ({ id, index, packageName, questionCount, movePackage, onDelete, onEdit }) => {
    const [, ref] = useDrag({
        type: ITEM_TYPE,
        item: { id, index },
    });

    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                movePackage(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    return (
        <div
            ref={(node) => ref(drop(node))}
            className="grid grid-cols-1 sm:grid-cols-4 items-center px-4 py-2 border rounded shadow-sm hover:bg-gray-50 transition"
            style={{ marginBottom: '15px' }}
        >
            <div className="flex items-center space-x-2 cursor-move draggable-area">
                <span>≡</span>
                <span>{packageName || `Package ${index + 1}`}</span>
            </div>

            <div className="truncate overflow-hidden sm:w-auto w-full text-sm">
                {questionCount} 
            </div>

            <div className="flex justify-end space-x-2 non-draggable-area">
                <Button
                    label={<FaEdit />}
                    onClick={() => onEdit(packageName)}
                    className="text-[#47A7A2] hover:text-red-700 text-l"
                />
                <Button
                    label={<FaTrash />}
                    onClick={() => onDelete(id)}
                    className="text-[#47A7A2] hover:text-red-700 text-m"
                />
            </div>
        </div>
    );
};

const PackageList = () => {
    const { packages, loadPackages, deletePackage, reorderPackages } = usePackageStore();
    const { getQuestionsByPackage } = useQuestionListStore(); // Soru bilgilerini çekmek için
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentPackageName, setCurrentPackageName] = useState(null);

    useEffect(() => {
        loadPackages(); // Paketleri yükleme
    }, [loadPackages]);

    const movePackage = (fromIndex, toIndex) => {
        reorderPackages(fromIndex, toIndex);
    };

    const handleEdit = (packageName) => {
        setCurrentPackageName(packageName);
        setIsEditModalOpen(true);
    };

    const getPackageQuestionCount = (packageName) => {
        const questions = getQuestionsByPackage(packageName);
        return questions.length;
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="p-4">
                <div className="grid sm:grid-cols-4 mb-3 text-left px-4 py-3 border-b border rounded shadow-sm bg-gray-200 text-sm">
                    <span className="w-[40%] hidden sm:block">#Package Name</span>
                    <span className="w-[30%] break-words sm:col-span-1">Total Questions</span>
                    <span className="w-[30%] text-right mr-7">Action</span>
                </div>

                {Array.isArray(packages) && packages.length > 0 ? (
                    packages.map((pkg, index) => (
                        <DraggablePackage
                            key={pkg.id}
                            id={pkg.id}
                            index={index}
                            packageName={pkg.name}
                            questionCount={getPackageQuestionCount(pkg.name)}
                            movePackage={movePackage}
                            onDelete={deletePackage}
                            onEdit={handleEdit}
                        />
                    ))
                ) : (
                    <p>No packages available.</p>
                )}

                <EditPackageModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    packageName={currentPackageName}
                />
            </div>
        </DndProvider>
    );
};

export default PackageList;
