import React, { useEffect, useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  // Register field
  useEffect(() => {
    register(name, { required: true });
  }, [register, name]);

  //Set value for react-hook-form
  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue, name]);

  //  Handle edit/view preview
  useEffect(() => {
    const source = viewData || editData;
    if (source) {
      setPreview(source);   // URL from backend
    }
  }, [viewData, editData]);

  const handleFile = (file) => {
    if (!file) return;

    
    if (video) {
      if (!file.type.startsWith("video/")) {
        alert("Only video files allowed");
        return;
      }
    } else {
      if (!file.type.startsWith("image/")) {
        alert("Only image files allowed");
        return;
      }
    }

    setSelectedFile(file);

    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-richblack-5">
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onClick={() => !preview && fileInputRef.current.click()}
        className={`flex flex-col items-center justify-center min-h-[250px] border-2 border-dashed rounded-md bg-richblack-700 cursor-pointer p-6
        ${dragActive ? "border-yellow-300" : "border-richblack-600"}`}
      >
        {/* Hidden Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={video ? "video/*" : "image/*"}
          onChange={handleChange}
          className="hidden"
        />

        {!preview ? (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-richblack-900">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>

            <p className="text-sm text-richblack-200">
              Drag and drop a {video ? "video" : "image"}, or{" "}
              <span
                className="text-yellow-50 font-semibold cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current.click();
                }}
              >
                Browse
              </span>{" "}
              a file
            </p>

            <ul className="flex gap-6 mt-4 text-xs text-richblack-400 list-disc list-inside">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024×576</li>
            </ul>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 w-full">
            
            
            {video ? (
              <video
                src={preview}
                controls
                className="max-h-[200px] rounded-md object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="max-h-[200px] rounded-md object-contain"
              />
            )}

            
            {!viewData && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPreview(null);
                  setSelectedFile(null);
                  setValue(name, null);
                }}
                className="text-richblack-600 text-sm font-semibold underline underline-offset-2 hover:text-richblack-500"
              >
                Cancel
              </button>
            )}
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}