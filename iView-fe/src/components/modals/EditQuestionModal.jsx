import React, { useState, useEffect } from 'react';
import Button from '../Button';
import TextArea from '../TextArea';
import InputField from '../InputField';

const EditQuestionModal = ({ isOpen, onClose, onEditQuestion, question }) => {
    const [packageName, setPackageName] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [time, setTime] = useState(2);

    useEffect(() => {
        if (question) {
            setPackageName(question.packageName);
            setQuestionText(question.question);
            setTime(question.time);
        }
    }, [question]);

    if (!isOpen) return null;

    const handleEdit = () => {
        onEditQuestion({ ...question, packageName, question: questionText, time });
        setPackageName('');
        setQuestionText('');
        setTime(2);
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>

            <div className="relative bg-white rounded-lg shadow-lg p-6" style={{ width: '500px', height: '450px' }}>
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-xl font-bold text-[#47A7A2]">Edit Question</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">X</button>
                </div>

                <div className="mt-4 space-y-4">
                    <InputField
                        label="Package Name"
                        type="text"
                        value={packageName}
                        onChange={setPackageName}
                        placeholder="Enter package name"
                    />

                    <TextArea
                        label="Question"
                        value={questionText}
                        onChange={setQuestionText}
                        placeholder="Enter the question text"
                    />
                    <span className="ml-2 mb-3">Min:</span>
                    <InputField
                        type="number"
                        value={time}
                        onChange={setTime}
                        className="w-16 text-center"
                    />

                </div>

                <div className="mt-6 flex justify-end">
                    <Button
                        label="Save Changes"
                        onClick={handleEdit}
                        className="bg-[#47A7A2] text-white hover:bg-white hover:text-[#47A7A2] font-semibold border p-2 rounded"
                    />
                </div>
            </div>
        </div>
    );
};

export default EditQuestionModal;
