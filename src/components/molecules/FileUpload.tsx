'use client';

import React, { useRef } from 'react';

interface ProfileImageUploaderProps {
  imageFile: File | null;
  onImageSelect: (file: File) => void;
  defaultImage?: string;
}

export const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({
  imageFile,
  onImageSelect,
  defaultImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const previewImage = imageFile
    ? URL.createObjectURL(imageFile)
    : defaultImage ||
      "data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100' height='100' fill='%23e5e7eb'/%3e%3cpath d='M50 30c-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15s15-6.716 15-15c0-8.284-6.716-15-15-15zm0 35c-11.046 0-20 8.954-20 20v5h40v-5c0-11.046-8.954-20-20-20z' fill='%239ca3af'/%3e%3c/svg%3e";

  return (
    <div className="flex justify-center mb-4">
      <div className="relative group">
        <img
          src={previewImage}
          alt="Profile"
          className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full object-cover border-2 border-gray-200 cursor-pointer hover:border-indigo-500 transition-colors duration-200"
          onClick={handleClick}
        />
        <div
          className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          onClick={handleClick}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
};
