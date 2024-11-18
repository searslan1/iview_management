import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import AddQuestionModal from "../components/modals/AddQuestionModal";
import EditQuestionModal from "../components/modals/EditQuestionModal";
import Button from "../components/Button";
import useQuestionListStore from "../store/useQuestionListStore";

const QuestionListPage = () => {
  const {
    questions,
    addQuestion,
    editQuestion,
    deleteQuestion,
    loadQuestions,
    reloadFlag, 
  } = useQuestionListStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  useEffect(() => {
    loadQuestions(); 
  }, [loadQuestions]);
  useEffect(() => {
    console.log("Güncellenmiş sorular render ediliyor:", questions);
  }, [questions]);
  useEffect(() => {
    loadQuestions(); 
  }, [reloadFlag, loadQuestions]);
  
  const handleEdit = (id) => {
    const questionToEdit = questions.find((q) => q._id === id); 
    setCurrentQuestion(questionToEdit); 
    setIsEditModalOpen(true); 
  };
  const handleDelete = async (id) => {
   
    await deleteQuestion(id);
    
    await loadQuestions();
  };
  return (
    <div className="p-4">
      <div className="grid sm:grid-cols-4 mb-3 text-left px-4 py-3 border-b border rounded shadow-sm bg-gray-200 text-sm">
        <span className="hidden sm:block">#Package Name</span>
        <span className="col-span-4 break-words sm:col-span-1">Question</span>
        <span className="hidden sm:block">Time</span>
        <span className="text-right mr-7">Action</span>
      </div>
      {Array.isArray(questions) && questions.length > 0 ? (
        questions.map((item, index) => (
          <div
            key={item._id || index}
            className="grid grid-cols-1 sm:grid-cols-4 items-center px-4 py-2 border rounded shadow-sm hover:bg-gray-50 transition"
            style={{ marginBottom: "15px" }}
          >
            <div className="flex items-center space-x-2">
              <span>{item.tags.join(", ") || `Package ${index + 1}`}</span>
            </div>
            <div className="truncate overflow-hidden sm:w-auto w-full text-sm">
              {item.questionText}
            </div>
            <div className="hidden sm:block text-sm">{item.duration} min</div>
            <div className="flex justify-end space-x-2">
              <Button
                label={<FaEdit />}
                onClick={() => handleEdit(item._id)}
                className="text-[#47A7A2] hover:text-red-700 text-l"
              />
              <Button
                label={<FaTrash />}
                onClick={() => handleDelete(item._id)}
                className="text-[#47A7A2] hover:text-red-700 text-m"
              />
            </div>
          </div>
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
  );
};
export default QuestionListPage;