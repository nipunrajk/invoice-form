import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { CloudUpload } from 'lucide-react';

// Set up PDF.js worker - use unpkg CDN with correct .mjs extension
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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
  const [pdfError, setPdfError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPdfError(null);
  }, []);

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
    } else if (files.length > 0) {
      alert('Please drop a PDF file.');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && files[0].type === 'application/pdf') {
      onFileUpload?.(files[0]);
    } else if (files && files.length > 0) {
      alert('Please select a PDF file.');
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPdfError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    setPdfError(error.message);
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
            {pdfError ? (
              <div className='text-center p-8 border-2 border-red-200 rounded-lg bg-red-50'>
                <div className='text-red-600 font-medium mb-2'>
                  Failed to load PDF
                </div>
                <div className='text-sm text-red-500 mb-4'>{pdfError}</div>
                <button
                  onClick={() => {
                    setPdfError(null);
                    // Force re-render by setting a new page number
                    setPageNumber(1);
                  }}
                  className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
                >
                  Retry
                </button>
              </div>
            ) : (
              <Document
                file={uploadedFile}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                className='max-w-full'
                loading={<div className='text-center p-4'>Loading PDF...</div>}
                error={
                  <div className='text-center p-4 text-red-600'>
                    Failed to load PDF file.
                  </div>
                }
              >
                <Page
                  pageNumber={pageNumber}
                  width={400}
                  className='shadow-lg'
                />
              </Document>
            )}

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
            <CloudUpload className='text-white w-10 h-10' />
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
        <CloudUpload className='w-5 h-5 mr-2' />
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
