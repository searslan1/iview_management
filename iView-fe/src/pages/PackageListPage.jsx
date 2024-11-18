import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Button from "../components/Button";
import usePackageStore from "../store/usePackageListStore";
import PackageQuestionSelector from "../components/PackageQuestionSelector"; 


const PackageListPage = () => {
  const {
    questions,
    loadQuestionsByPackage, 
    deleteTagFromQuestion, 
    reorderQuestions, 
  } = usePackageStore();



  const [selectedTag, setSelectedTag] = useState(""); 
  
  const handlePackageSelect = (packageName) => {
    setSelectedTag(packageName);
    loadQuestionsByPackage(packageName); 
  };

  const handleDeleteTag = async (questionId) => {
    await deleteTagFromQuestion(questionId, selectedTag); 
    await loadQuestionsByPackage(selectedTag); 
  };
 
  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.index !== destination.index) {
      await reorderQuestions(source.index, destination.index); 
      await loadQuestionsByPackage(selectedTag); 
    }
  };
  return (
    <div className="p-4">
      {/* Tag (Package) Seçimi */}
      <PackageQuestionSelector onPackageSelect={handlePackageSelect} />
      {/* Seçilen tag'e ait soruların listelenmesi */}
      {selectedTag && questions.length > 0 && (
        <>
          <div className="grid grid-cols-12 gap-4 mb-3 px-4 py-3 border-b border rounded shadow-sm bg-gray-200 text-sm">
            <span className="col-span-6 sm:col-span-8">Soru</span>
            <span className="col-span-3 sm:col-span-2">Süre</span>
            <span className="col-span-3 sm:col-span-2 text-right">Action</span>
          </div>
          {/* DragDropContext ile sarmalayarak drag işlemini başlatıyoruz */}
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="droppable-questions">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="question-list"
                >
                  {questions.map((question, index) => (
                    <Draggable
                      key={question._id}
                      draggableId={question._id.toString()} // Benzersiz draggableId
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="grid grid-cols-12 gap-4 items-center px-4 py-2 border rounded shadow-sm hover:bg-gray-50 transition"
                          style={{ marginBottom: "15px" }}
                        >
                          <span className="col-span-6 sm:col-span-8">
                            {question.questionText}
                          </span>
                          <span className="col-span-3 sm:col-span-2">
                            {question.duration} min
                          </span>
                          <div className="col-span-3 sm:col-span-2 flex justify-end space-x-2">
                            {/* Sorudan tag'i silme butonu */}
                            <Button
                              label={<FaTrash />}
                              onClick={() => handleDeleteTag(question._id)}
                              className="text-[#47A7A2] hover:text-red-700 text-m"
                            />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </>
      )}
    </div>
  );
};
export default PackageListPage;