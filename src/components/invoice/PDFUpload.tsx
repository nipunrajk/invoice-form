import React, { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFUploadProps {
  onFileUpload?: (file: File) => void;
  uploadedFile?: File | null;
}

const PDFUpload: React.FC<PDFUploadProps> = ({
  onFileUpload,
  uploadedFile,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === 'application/pdf') {
      onFileUpload?.(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && files[0].type === 'application/pdf') {
      onFileUpload?.(files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  if (uploadedFile) {
    return (
      <div className='bg-white rounded-lg border-2 border-dashed border-gray-300 p-4 h-full'>
        <div className='flex flex-col h-full'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-lg font-medium text-gray-900'>
              {uploadedFile.name}
            </h3>
            <button
              onClick={() => onFileUpload?.(null as any)}
              className='text-red-600 hover:text-red-800 text-sm'
            >
              Remove
            </button>
          </div>

          <div className='flex-1 flex flex-col items-center'>
            <Document
              file={uploadedFile}
              onLoadSuccess={onDocumentLoadSuccess}
              className='max-w-full'
            >
              <Page pageNumber={pageNumber} width={400} className='shadow-lg' />
            </Document>

            {numPages && numPages > 1 && (
              <div className='mt-4 flex items-center space-x-4'>
                <button
                  onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                  disabled={pageNumber <= 1}
                  className='px-3 py-1 bg-blue-600 text-white rounded disabled:bg-gray-300'
                >
                  Previous
                </button>
                <span className='text-sm text-gray-600'>
                  Page {pageNumber} of {numPages}
                </span>
                <button
                  onClick={() =>
                    setPageNumber(Math.min(numPages, pageNumber + 1))
                  }
                  disabled={pageNumber >= numPages}
                  className='px-3 py-1 bg-blue-600 text-white rounded disabled:bg-gray-300'
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-lg border-2 border-dashed p-8 text-center h-full flex flex-col justify-center items-center transition-colors ${
        isDragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className='mb-6'>
        <div className='w-24 h-24 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center'>
          <div className='w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center'>
            <svg
              className='w-8 h-8 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
              />
            </svg>
          </div>
        </div>
      </div>

      <h3 className='text-xl font-semibold text-gray-900 mb-2'>
        Upload Your Invoice
      </h3>
      <p className='text-gray-600 mb-6'>
        To auto-populate fields and save time
      </p>

      <button
        onClick={handleUploadClick}
        className='inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
      >
        <svg
          className='w-4 h-4 mr-2'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
          />
        </svg>
        Upload File
      </button>

      <p className='text-sm text-gray-500 mt-4'>
        Click to upload or Drag and drop
      </p>

      <input
        ref={fileInputRef}
        type='file'
        accept='.pdf'
        onChange={handleFileSelect}
        className='hidden'
      />
    </div>
  );
};

export default PDFUpload;
