import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FaTrash, FaEdit } from 'react-icons/fa';
import AddQuestionModal from '../components/modals/AddQuestionModal';
import EditQuestionModal from '../components/modals/EditQuestionModal';
import Button from '../components/Button';
import useQuestionListStore from '../store/useQuestionListStore';

// Drag tipi için bir tanım
const ITEM_TYPE = 'QUESTION';

// Sıralanabilir öğe
const DraggableQuestion = ({ id, index, question, time, moveQuestion, onDelete, onEdit }) => {
    const [, ref] = useDrag({
        type: ITEM_TYPE,
        item: { id, index },
    });

    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveQuestion(draggedItem.index, index);
                draggedItem.index = index; // Güncellenmiş index'i ayarla
            }
        },
    });

    return (
        <div
            ref={(node) => ref(drop(node))}
            className="grid grid-cols-1 sm:grid-cols-4 items-center px-4 py-2 border rounded shadow-sm hover:bg-gray-50 transition"
            style={{ marginBottom: '15px' }}
        >
            {/* Sürükleme alanı */}
            <div className="flex items-center space-x-2 cursor-move draggable-area">
                <span>≡</span>
                <span>{question.packageName || `Package ${index + 1}`}</span>
            </div>

            {/* Soru Metni */}
            <div className="truncate overflow-hidden sm:w-auto w-full text-sm">
                {question.question}
            </div>

            {/* Süre */}
            <div className="hidden sm:block text-sm">{time} min</div>

            {/* Düzenleme ve Silme İşlemleri */}
            <div className="flex justify-end space-x-2 non-draggable-area">
                <Button
                    label={<FaEdit />}
                    onClick={() => onEdit(id)}
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

const QuestionList = () => {
    const { questions, addQuestion, editQuestion, deleteQuestion, loadQuestions, reorderQuestions } = useQuestionListStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(null);

    useEffect(() => {
        loadQuestions(); // Initialize the questions with local state
    }, [loadQuestions]);
    
    // arrayMove fonksiyonu, verilen iki index arasındaki elemanı taşımak için
    const arrayMove = (array, fromIndex, toIndex) => {
        const newArray = [...array];
        const [movedItem] = newArray.splice(fromIndex, 1);
        newArray.splice(toIndex, 0, movedItem);
        return newArray;
    };

    const moveQuestion = (fromIndex, toIndex) => {
        const updatedQuestions = arrayMove(questions, fromIndex, toIndex);
        reorderQuestions(questions[fromIndex].id, questions[toIndex].id); // 
    };

    const handleEdit = (id) => {
        const questionToEdit = questions.find((q) => q.id === id);
        setCurrentQuestion(questionToEdit);
        setIsEditModalOpen(true);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="p-4">
                <div className="grid sm:grid-cols-4 mb-3 text-left px-4 py-3 border-b border rounded shadow-sm bg-gray-200 text-sm">
                    <span className="hidden sm:block">#Package Name</span>
                    <span className="col-span-4 break-words sm:col-span-1">Question</span>
                    <span className="hidden sm:block">Time</span>
                    <span className="text-right mr-7">Action</span>
                </div>

                {Array.isArray(questions) && questions.length > 0 ? (
    questions.map((item, index) => (
        <DraggableQuestion
            key={item.id}
            id={item.id}
            index={index}
            question={item}
            time={item.time}
            moveQuestion={moveQuestion}
            onDelete={deleteQuestion}
            onEdit={handleEdit}
        />
    ))
) : (
    <p>No questions available.</p>
)}


                <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
                    <Button
                        label="Add Question"
                        onClick={() => setIsModalOpen(true)}
                        className="text-white bg-[#47A7A2] font-semibold hover:bg-white hover:text-[#47A7A2] border p-2 rounded text-sm sm:text-base sm:p-3 mt-6"
                    />

                    <AddQuestionModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onAddQuestion={addQuestion}
                    />
                </div>

                <EditQuestionModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onEditQuestion={editQuestion}
                    question={currentQuestion}
                />
            </div>
        </DndProvider>
    );
};

export default QuestionList;
