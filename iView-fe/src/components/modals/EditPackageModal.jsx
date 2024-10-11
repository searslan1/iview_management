import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Button from '../Button';
import useQuestionListStore from '../../store/useQuestionListStore'; // Assuming the path is correct

const ITEM_TYPE = 'QUESTION';

const DraggableQuestion = ({ id, index, text, moveQuestion, onDelete }) => {
    const [, ref] = useDrag({
        type: ITEM_TYPE,
        item: { id, index },
    });

    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveQuestion(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    return (
        <div
            ref={(node) => ref(drop(node))}
            className="flex justify-between items-center py-2 px-4 border rounded shadow-sm hover:bg-gray-50 transition"
            style={{ marginBottom: '10px' }}
        >
            <span>{text}</span>
            <Button
                label={<FaTrash />}
                onClick={() => onDelete(id)}
                className="text-[#47A7A2] hover:text-red-700"
            />
        </div>
    );
};

const EditPackageModal = ({ isOpen, onClose, packageName }) => {
    const { getQuestionsByPackage, deleteQuestionFromPackage } = useQuestionListStore();
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        if (isOpen) {
            const questionsForPackage = getQuestionsByPackage(packageName);
            setQuestions(questionsForPackage);
        }
    }, [isOpen, packageName, getQuestionsByPackage]);

    const moveQuestion = (fromIndex, toIndex) => {
        const updatedQuestions = [...questions];
        const [movedQuestion] = updatedQuestions.splice(fromIndex, 1);
        updatedQuestions.splice(toIndex, 0, movedQuestion);
        setQuestions(updatedQuestions);
    };

    const handleDeleteQuestion = (id) => {
        deleteQuestionFromPackage(id); // Ensure this is correctly modifying Zustand state
        setQuestions(prevQuestions => prevQuestions.filter(q => q.id !== id)); // Update local state after deletion
    };

    if (!isOpen) return null; // No modal rendering when not open

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>

            <div className="relative bg-white rounded-lg shadow-lg p-6" style={{ width: '600px', height: '500px' }}>
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-xl font-bold text-[#47A7A2]">Edit {packageName}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">X</button>
                </div>

                <div className="mt-4 space-y-4 overflow-y-auto" style={{ maxHeight: '350px' }}>
                    <DndProvider backend={HTML5Backend}>
                        {questions.map((question, index) => (
                            <DraggableQuestion
                                key={question.id}
                                id={question.id}
                                index={index}
                                text={question.question}
                                moveQuestion={moveQuestion}
                                onDelete={handleDeleteQuestion}
                            />
                        ))}
                    </DndProvider>
                </div>

                <div className="mt-6 flex justify-end">
                    <Button
                        label="Close"
                        onClick={onClose}
                        className="text-white bg-[#47A7A2] font-semibold hover:bg-white hover:text-[#47A7A2] border p-2 rounded text-sm sm:text-base sm:p-3 mt-6"
                    />
                </div>
            </div>
        </div>
    );
};

export default EditPackageModal;
