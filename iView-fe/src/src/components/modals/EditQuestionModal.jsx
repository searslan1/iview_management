import React, { useState, useEffect } from "react";
import Button from "../Button";
import TextArea from "../TextArea";
import InputField from "../InputField";
import { FaTrash } from "react-icons/fa";
import axios from "axios"; // Backend'den tag'leri almak için
const EditQuestionModal = ({ isOpen, onClose, onEditQuestion, question }) => {
  const [tagsArray, setTagsArray] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [time, setTime] = useState(2);
  const [availableTags, setAvailableTags] = useState([]); // Tag önerileri için state
  // Mevcut question verilerini ayarlamak için
  useEffect(() => {
    if (question) {
      setTagsArray(question.tags || []); // Mevcut tags değerlerini ayarlıyoruz
      setQuestionText(question.questionText); // Soru metni
      setTime(question.duration); // Süre bilgisi
    }
  }, [question]);
  // Backend'den tag önerilerini almak için
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/questions/tags"
        ); // API'den tag'leri çekiyoruz
        setAvailableTags(response.data); // Gelen tag'leri kaydediyoruz
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchTags();
  }, []);
  // Yeni bir tag eklemek için fonksiyon
  const handleAddTag = () => {
    if (newTag && !tagsArray.includes(newTag)) {
      setTagsArray([...tagsArray, newTag]);
      setNewTag(""); // Input'u sıfırlıyoruz
    }
  };
  // Bir tag'i silmek için fonksiyon
  const handleDeleteTag = (tagToDelete) => {
    setTagsArray(tagsArray.filter((tag) => tag !== tagToDelete));
  };
  // Soruyu güncelleme işlemi
  const handleEdit = () => {
    const updatedQuestion = {
      ...question,
      tags: tagsArray, // Tüm tagsArray'i burada kullanıyoruz
      questionText,
      duration: parseInt(time, 10),
    };
    onEditQuestion(updatedQuestion); // Güncelleme fonksiyonunu çağırıyoruz
    onClose(); // Modalı kapatıyoruz
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
        style={{ width: "500px", height: "auto" }}
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
          {/* Tag Ekleme */}
          <InputField
            label="Add Tag"
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e)} // Değişiklikleri handle ediyoruz
            placeholder="Enter new tag"
            list="availableTagsList" // Tag önerilerini ekliyoruz
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
          {/* Eklenen tagleri listeleme */}
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
          {/* Soru metni */}
          <TextArea
            label="Question"
            value={questionText}
            onChange={setQuestionText}
            placeholder="Enter the question text"
          />
          {/* Süre */}
          <span className="ml-2 mb-3">Min:</span>
          <InputField
            label="Time"
            type="number"
            value={time}
            onChange={(value) => setTime(value)} // Doğrudan 'value' gönderiliyor
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