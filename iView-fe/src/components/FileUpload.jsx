import React, { useRef } from 'react';

const FileUpload = ({ label, file, onChange, icon }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0] ?? null;
    onChange(selectedFile);
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();  // Trigger file selection dialog
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[#7a8699] text-sm font-normal">{label}</label>
      <div className="relative flex items-center border border-gray-200 rounded-md w-full h-12">
        <input
          type="file"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="w-full p-2 pr-10"
          style={{ display: 'none' }}  // Hide the input field
        />
        <div className="flex-grow">
          <input
            type="text"
            value={file ? file.name : ''}
            readOnly
            className="w-full border-none focus:ring-0 h-full p-3"  // Adjust padding for height
            placeholder="Dosya seçin..."
          />
        </div>
        <div
          className="absolute inset-y-0 right-0 flex items-center px-3 bg-gray-200 cursor-pointer h-full"  // Ensure the icon container matches the height
          onClick={handleIconClick}
        >
          {icon}
        </div>
      </div>

      {file && (
        <div className="mt-2 text-sm text-gray-500">
          {file.name}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
