import React from 'react';
import { FormikProps } from 'formik';
import { InvoiceFormData, vendorOptions } from '../../../utils/dummyData';

interface VendorDetailsProps {
  formik: FormikProps<InvoiceFormData>;
}

const VendorDetails: React.FC<VendorDetailsProps> = ({ formik }) => {
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
              d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
            />
          </svg>
        </div>
        <h2 className='text-lg font-semibold text-gray-900'>Vendor Details</h2>
      </div>

      <div>
        <h3 className='text-base font-medium text-gray-900 mb-4'>
          Vendor Information
        </h3>

        <div className='space-y-4'>
          <div>
            <label
              htmlFor='vendor'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Vendor *
            </label>
            <select
              id='vendor'
              name='vendor'
              value={formik.values.vendor}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                formik.touched.vendor && formik.errors.vendor
                  ? 'border-red-300'
                  : 'border-gray-300'
              }`}
            >
              <option value=''>Select Vendor</option>
              {vendorOptions.map((vendor) => (
                <option key={vendor} value={vendor}>
                  {vendor}
                </option>
              ))}
            </select>
            {formik.touched.vendor && formik.errors.vendor && (
              <p className='mt-1 text-sm text-red-600'>
                {formik.errors.vendor}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor='vendorAddress'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Address
            </label>
            <input
              type='text'
              id='vendorAddress'
              name='vendorAddress'
              value={formik.values.vendorAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder='Enter vendor address'
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                formik.touched.vendorAddress && formik.errors.vendorAddress
                  ? 'border-red-300'
                  : 'border-gray-300'
              }`}
            />
            {formik.touched.vendorAddress && formik.errors.vendorAddress && (
              <p className='mt-1 text-sm text-red-600'>
                {formik.errors.vendorAddress}
              </p>
            )}
          </div>

          <div className='pt-2'>
            <button
              type='button'
              className='text-blue-600 hover:text-blue-800 text-sm font-medium'
            >
              ↗ View Vendor Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDetails;
