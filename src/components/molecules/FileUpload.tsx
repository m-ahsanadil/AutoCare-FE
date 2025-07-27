'use client';

import React, { ChangeEvent, useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import Image from "next/image"

interface ProfileImageUploaderProps {
  imageUrl?: string | null;
  onImageSelect: (file: File) => void;
  defaultImage?: string;
  size?: number;
}

export const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({
  imageUrl,
  onImageSelect,
  size = 128,
  defaultImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImageSelect(file);
  };

  // Default profile image SVG
  const defaultProfileImage = "data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100' height='100' fill='%23e5e7eb'/%3e%3cpath d='M50 30c-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15s15-6.716 15-15c0-8.284-6.716-15-15-15zm0 35c-11.046 0-20 8.954-20 20v5h40v-5c0-11.046-8.954-20-20-20z' fill='%239ca3af'/%3e%3c/svg%3e";

  // const previewImage = imageFile ? URL.createObjectURL(imageFile) : defaultImage;

  return (
    // <>
    //   <div className="flex justify-center items-center w-full bg-slate-500 mb-5">
    //     <div className="group relative bg-slate-600 rounded-full w-40 h-40 overflow-hidden cursor-pointer shadow-lg flex items-center justify-center" onClick={handleClick}>
    //       {imageFile ? (
    //         <Image src={previewImage} alt={'profile Image'} width={160} height={160} className='w-32 h-32 rounded-full' />
    //       ) : (
    //         <img
    //           src={defaultProfileImage}
    //           alt="Default Profile"
    //           className="w-32 h-32 opacity-60"
    //         />
    //       )}
    //       {/* Overlay with camera icon on hover */}
    //       <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
    //         <Camera className="w-6 h-6 text-white" />
    //       </div>
    //     </div>
    //   </div>
    //   <input
    //     type='file'
    //     ref={fileInputRef}
    //     onChange={handleChange}
    //     accept='image/*'
    //     className='hidden'
    //   />
    // </>
    <div className="flex items-center justify-center">
      <div
        onClick={handleClick}
        className="relative rounded-full overflow-hidden cursor-pointer group border-2 border-gray-300 shadow-sm"
        style={{ width: size, height: size }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Profile"
            width={size}
            height={size}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200">
            <Camera className="w-8 h-8 text-gray-500" />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="absolute inset-0 bg-black bg-opacity-20 hidden group-hover:flex items-center justify-center">
          <Camera className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};