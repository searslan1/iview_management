import React, { useState, useEffect } from "react";
import Button from "../Button";
import TextArea from "../TextArea";
import InputField from "../InputField";
import { FaTrash } from "react-icons/fa";
import axios from "axios"; 

const API_URL = process.env.VITE_API_URL;

const EditQuestionModal = ({ isOpen, onClose, onEditQuestion, question }) => {
  const [tagsArray, setTagsArray] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [time, setTime] = useState(2);
  const [availableTags, setAvailableTags] = useState([]); 

  useEffect(() => {
    if (question) {
      setTagsArray(question.tags || []);
      setQuestionText(question.questionText);
      setTime(question.duration);
    }
  }, [question]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/questions/tags`); // API_URL kullanımı
        setAvailableTags(response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchTags();
  }, []);

  const handleAddTag = () => {
    if (newTag && !tagsArray.includes(newTag)) {
      setTagsArray([...tagsArray, newTag]);
      setNewTag("");
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTagsArray(tagsArray.filter((tag) => tag !== tagToDelete));
  };

  const handleEdit = () => {
    const updatedQuestion = {
      ...question,
      tags: tagsArray,
      questionText,
      duration: parseInt(time, 10),
    };
    onEditQuestion(updatedQuestion);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div
        className="relative bg-white rounded-lg shadow-lg p-6"
        style={{
          width: "500px",
          height: "600px",
          overflowY: "auto", 
        }}
      >
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-bold text-[#47A7A2]">Edit Question</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            X
          </button>
        </div>
        <div className="mt-4 space-y-4">
          <InputField
            label="Add Tag"
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e)}
            placeholder="Enter new tag"
            list="availableTagsList"
          />
          <datalist id="availableTagsList">
            {availableTags.map((tag, index) => (
              <option key={index} value={tag} />
            ))}
          </datalist>
          <Button
            label="Add Tag"
            onClick={handleAddTag}
            className="text-white bg-[#47A7A2] font-semibold hover:bg-white hover:text-[#47A7A2] border p-2 rounded mt-1"
          />
          <div className="mt-2">
            {tagsArray.map((tag, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span>{tag}</span>
                <Button
                  label={<FaTrash />}
                  onClick={() => handleDeleteTag(tag)}
                  className="text-[#47A7A2] hover:text-red-700"
                />
              </div>
            ))}
          </div>
          <TextArea
            label="Question"
            value={questionText}
            onChange={setQuestionText}
            placeholder="Enter the question text"
          />
          <span className="ml-2 mb-3">Min:</span>
          <InputField
            label="Time"
            type="number"
            value={time}
            onChange={(value) => setTime(value)}
            placeholder="Enter duration"
          />
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            label="Save Changes"
            onClick={handleEdit}
            className="bg-[#47A7A2] text-white hover:bg-white hover:text-[#47A7A2] font-semibold border p-2 rounded mt-6"
          />
        </div>
      </div>
    </div>
  );
};

export default EditQuestionModal;
