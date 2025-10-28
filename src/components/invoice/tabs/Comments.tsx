import React from 'react';
import type { FormikProps } from 'formik';
import type { InvoiceFormData } from '../../../utils/dummyData';

interface CommentsProps {
  formik: FormikProps<InvoiceFormData>;
}

const Comments: React.FC<CommentsProps> = ({ formik }) => {
  return (
    <div className='space-y-6'>
      <div className='flex items-center space-x-2 mb-6'>
        <div className='w-6 h-6 bg-blue-600 rounded flex items-center justify-center'>
          <svg
            className='w-4 h-4 text-white'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
            />
          </svg>
        </div>
        <h2 className='text-lg font-semibold text-gray-900'>Comments</h2>
      </div>

      <div>
        <label
          htmlFor='comments'
          className='block text-sm font-medium text-gray-700 mb-2'
        >
          Add a comment and use @Name to tag someone
        </label>
        <div className='relative'>
          <textarea
            id='comments'
            name='comments'
            rows={4}
            value={formik.values.comments}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Add a comment and use @Name to tag someone'
            className={`w-full px-3 py-2 pr-12 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
              formik.touched.comments && formik.errors.comments
                ? 'border-red-300'
                : 'border-gray-300'
            }`}
          />
          <button
            type='button'
            className='absolute bottom-3 right-3 text-gray-400 hover:text-blue-600'
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
              />
            </svg>
          </button>
        </div>
        {formik.touched.comments && formik.errors.comments && (
          <p className='mt-1 text-sm text-red-600'>{formik.errors.comments}</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
