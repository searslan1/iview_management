import React, { useState, useEffect } from "react";
import Button from "../Button";
import TextArea from "../TextArea";
import InputField from "../InputField";
import axios from "axios";


const API_URL = process.env.VITE_API_URL;

const AddQuestionModal = ({ isOpen, onClose, onAddQuestion }) => {
  const [question, setQuestion] = useState("");
  const [time, setTime] = useState(2);
  const [packageNames, setPackageNames] = useState([""]);
  const [availableTags, setAvailableTags] = useState([]); 
  
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/questions/tags`); 
        setAvailableTags(response.data); 
        console.log("Available tags:", response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchTags(); 
  }, []);

  if (!isOpen) return null;

  const addPackageName = () => {
    setPackageNames([...packageNames, ""]);
  };

  const handlePackageNameChange = (index, value) => {
    const updatedPackageNames = [...packageNames];
    updatedPackageNames[index] = value;
    setPackageNames(updatedPackageNames);
  };

  const handleAdd = async () => {
    if (!question.trim()) {
      alert("Please enter a valid question.");
      return;
    }
    const nonEmptyPackages = packageNames.filter((pkg) => pkg.trim() !== "");
    if (nonEmptyPackages.length === 0) {
      alert("Please enter at least one package name.");
      return;
    }
    try {
      await onAddQuestion({
        packageNames: nonEmptyPackages,
        question,
        time,
      });
      // Formu sıfırla
      setPackageNames([""]);
      setQuestion("");
      setTime(2);
      // Modalı kapat
      onClose();
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

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
          <h2 className="text-xl font-bold text-[#47A7A2]">Add Question</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            X
          </button>
        </div>
        <div className="mt-4 space-y-4">
          {packageNames.map((name, index) => (
            <div key={index}>
              <InputField
                label={`Package Name ${index + 1}`}
                value={name}
                onChange={(value) => handlePackageNameChange(index, value)}
                placeholder="Enter package name"
                list="packageNamesList" 
              />
              {/* Tag önerileri */}
              <datalist id="packageNamesList">
                {availableTags.map((tag, i) => (
                  <option key={i} value={tag} />
                ))}
              </datalist>
            </div>
          ))}
          <Button
            label="Add Another Package"
            onClick={addPackageName}
            className="text-white bg-[#47A7A2] font-semibold hover:bg-white hover:text-[#47A7A2] border p-2 rounded mt-6"
          />
          <TextArea
            label="Question"
            value={question}
            onChange={setQuestion}
            placeholder="Input your question..."
            maxLength={500}
          />
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center border px-3 py-2 rounded-md">
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-12 text-center"
                min={1}
              />
              <span className="ml-2">min</span>
            </div>
            <Button
              label="Add"
              onClick={handleAdd}
              className="text-white bg-[#47A7A2] font-semibold hover:bg-white hover:text-[#47A7A2] border p-2 rounded mt-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionModal;
