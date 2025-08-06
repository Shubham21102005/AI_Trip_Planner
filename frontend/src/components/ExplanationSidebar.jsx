
import React from 'react';
import { X, Loader } from 'lucide-react';

const ExplanationSidebar = ({
  isOpen,
  onClose,
  content,
  isLoading,
  title,
}) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full md:w-1/3 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button onClick={onClose}>
          <X size={24} />
        </button>
      </div>
      <div className="p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader className="animate-spin" size={32} />
          </div>
        ) : (
          <p>{content}</p>
        )}
      </div>
    </div>
  );
};

export default ExplanationSidebar;
