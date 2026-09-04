import { useState, useRef } from 'react';
import { UploadCloud, File, AlertCircle } from 'lucide-react';
import { UploadCloud, AlertCircle } from 'lucide-react';
import { Button } from '../common/Button';
import { formatBytes, validateFile } from '../../utils/fileTools/formatters';

export const FileUploader = ({
  onFilesSelected,
  accept,
  acceptSummary = 'Supported files',
  multiple = false,
  maxFileSizeMB = 50,
  allowedExtensions = []
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const fileInputRef = useRef(null);

  const processIncomingFiles = (incomingFileList) => {
    setErrorMessage(null);
    if (!incomingFileList || incomingFileList.length === 0) return;

    const filesArray = Array.from(incomingFileList);

    if (!multiple && filesArray.length > 1) {
      setErrorMessage('Please select only one file for this tool.');
      return;
    }

    // Validate each file
    const validFiles = [];
    for (const file of filesArray) {
      const validation = validateFile(file, {
        maxSizeMB: maxFileSizeMB,
        allowedExtensions
      });

      if (!validation.valid) {
        setErrorMessage(validation.error);
        return;
      }
      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processIncomingFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processIncomingFiles(e.target.files);
    }
    // reset input so same file can be re-selected if removed
    e.target.value = '';
  };

  const getAcceptString = () => {
    if (typeof accept === 'string') return accept;
    if (allowedExtensions.length > 0) return allowedExtensions.join(',');
    if (accept && typeof accept === 'object') {
      const exts = [];
      Object.values(accept).forEach(arr => {
        if (Array.isArray(arr)) exts.push(...arr);
      });
      return exts.join(',');
    }
    return '*/*';
  };

  return (
    <div className="w-full">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-[16px] p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center ${
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`Upload ${multiple ? 'files' : 'file'}`}
        className={`relative border-2 border-dashed rounded-[16px] p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center outline-none focus:ring-2 focus:ring-[#026fc7]/20 focus:border-[#026fc7] ${
          isDragOver
            ? 'border-brand-500 bg-brand-50/70 scale-[0.99] shadow-inner'
            : 'border-[#E1E2E7] hover:border-slate-400 bg-[#F7F7FA] hover:bg-white shadow-[var(--ui-shadow)]'
            ? 'border-[#026fc7] bg-[#eef5ff]'
            : 'border-[#E1E2E7] hover:border-[#026fc7]/60 bg-[#F7F7FA] hover:bg-white'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={getAcceptString()}
          multiple={multiple}
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-200 ${
          isDragOver ? 'bg-brand-500 text-white scale-110' : 'bg-brand-50 text-brand-600'
        <div className={`w-14 h-14 rounded-[12px] flex items-center justify-center mb-3.5 transition-transform duration-200 ${
          isDragOver ? 'bg-[#026fc7] text-white scale-105' : 'bg-white text-[#026fc7] border border-[#E1E2E7] shadow-sm'
        }`}>
          <UploadCloud className="w-8 h-8" />
          <UploadCloud className="w-7 h-7" />
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
        <h3 className="text-[18px] font-semibold text-[#2F3038]">
          Drop your {multiple ? 'files' : 'file'} here, or{' '}
          <span className="text-brand-600 hover:underline">browse</span>
          <span className="text-[#026fc7] underline-offset-2 hover:underline">browse</span>
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-md">
          {acceptSummary} • Max size: {maxFileSizeMB}MB per file
        <p className="mt-1.5 text-[13px] text-[#6F707A] max-w-md">
          {acceptSummary} • Max limit: {maxFileSizeMB}MB per file
        </p>

        <div className="mt-6">
        <div className="mt-5">
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          >
            Choose {multiple ? 'Files' : 'File'}
          </Button>
        </div>
      </div>

      {errorMessage && (
        <div className="mt-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-xs sm:text-sm text-rose-700 animate-in fade-in duration-150">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
        <div className="mt-4 p-3.5 rounded-[10px] bg-[#fff0f0] border border-[#fed7d7] flex items-center gap-2.5 text-[13px] text-[#ef4444] animate-in fade-in duration-150">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#ef4444]" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

