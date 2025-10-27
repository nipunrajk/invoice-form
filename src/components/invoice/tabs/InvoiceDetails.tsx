import React from 'react';
import { FormikProps } from 'formik';
import {
  InvoiceFormData,
  paymentTermsOptions,
  departmentOptions,
  accountOptions,
  locationOptions,
} from '../../../utils/dummyData';

interface InvoiceDetailsProps {
  formik: FormikProps<InvoiceFormData>;
}

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({ formik }) => {
  return (
    <div className='space-y-8'>
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
              d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
            />
          </svg>
        </div>
        <h2 className='text-lg font-semibold text-gray-900'>Invoice Details</h2>
      </div>

      {/* General Information */}
      <div>
        <h3 className='text-base font-medium text-gray-900 mb-4'>
          General Information
        </h3>
        <div>
          <label
            htmlFor='purchaseOrderNumber'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Purchase Order Number *
          </label>
          <select
            id='purchaseOrderNumber'
            name='purchaseOrderNumber'
            value={formik.values.purchaseOrderNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              formik.touched.purchaseOrderNumber &&
              formik.errors.purchaseOrderNumber
                ? 'border-red-300'
                : 'border-gray-300'
            }`}
          >
            <option value=''>Select PO Number</option>
            <option value='PO-2024-001'>PO-2024-001</option>
            <option value='PO-2024-002'>PO-2024-002</option>
            <option value='PO-2024-003'>PO-2024-003</option>
          </select>
          {formik.touched.purchaseOrderNumber &&
            formik.errors.purchaseOrderNumber && (
              <p className='mt-1 text-sm text-red-600'>
                {formik.errors.purchaseOrderNumber}
              </p>
            )}
        </div>
      </div>

      {/* Invoice Details */}
      <div>
        <h3 className='text-base font-medium text-gray-900 mb-4'>
          Invoice Details
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label
              htmlFor='invoiceNumber'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Invoice Number *
            </label>
            <input
              type='text'
              id='invoiceNumber'
              name='invoiceNumber'
              value={formik.values.invoiceNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder='Select Vendor'
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                formik.touched.invoiceNumber && formik.errors.invoiceNumber
                  ? 'border-red-300'
                  : 'border-gray-300'
              }`}
            />
            {formik.touched.invoiceNumber && formik.errors.invoiceNumber && (
              <p className='mt-1 text-sm text-red-600'>
                {formik.errors.invoiceNumber}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor='invoiceDate'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Invoice Date *
            </label>
            <input
              type='date'
              id='invoiceDate'
              name='invoiceDate'
              value={formik.values.invoiceDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                formik.touched.invoiceDate && formik.errors.invoiceDate
                  ? 'border-red-300'
                  : 'border-gray-300'
              }`}
            />
            {formik.touched.invoiceDate && formik.errors.invoiceDate && (
              <p className='mt-1 text-sm text-red-600'>
                {formik.errors.invoiceDate}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor='totalAmount'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Total Amount *
            </label>
            <div className='relative'>
              <span className='absolute left-3 top-2 text-gray-500'>$</span>
              <input
                type='text'
                id='totalAmount'
                name='totalAmount'
                value={formik.values.totalAmount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='0.00'
                className={`w-full pl-8 pr-12 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  formik.touched.totalAmount && formik.errors.totalAmount
                    ? 'border-red-300'
                    : 'border-gray-300'
                }`}
              />
              <span className='absolute right-3 top-2 text-gray-500'>USD</span>
            </div>
            {formik.touched.totalAmount && formik.errors.totalAmount && (
              <p className='mt-1 text-sm text-red-600'>
                {formik.errors.totalAmount}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor='paymentTerms'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Payment Terms *
            </label>
            <select
              id='paymentTerms'
              name='paymentTerms'
              value={formik.values.paymentTerms}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                formik.touched.paymentTerms && formik.errors.paymentTerms
                  ? 'border-red-300'
                  : 'border-gray-300'
              }`}
            >
              <option value=''>Select</option>
              {paymentTermsOptions.map((term) => (
                <option key={term} value={term}>
                  {term}
                </option>
              ))}
            </select>
            {formik.touched.paymentTerms && formik.errors.paymentTerms && (
              <p className='mt-1 text-sm text-red-600'>
                {formik.errors.paymentTerms}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor='invoiceDueDate'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Invoice Due Date *
            </label>
            <input
              type='date'
              id='invoiceDueDate'
              name='invoiceDueDate'
              value={formik.values.invoiceDueDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                formik.touched.invoiceDueDate && formik.errors.invoiceDueDate
                  ? 'border-red-300'
                  : 'border-gray-300'
              }`}
            />
            {formik.touched.invoiceDueDate && formik.errors.invoiceDueDate && (
              <p className='mt-1 text-sm text-red-600'>
                {formik.errors.invoiceDueDate}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor='glPostDate'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              GL Post Date *
            </label>
            <input
              type='date'
              id='glPostDate'
              name='glPostDate'
              value={formik.values.glPostDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                formik.touched.glPostDate && formik.errors.glPostDate
                  ? 'border-red-300'
                  : 'border-gray-300'
              }`}
            />
            {formik.touched.glPostDate && formik.errors.glPostDate && (
              <p className='mt-1 text-sm text-red-600'>
                {formik.errors.glPostDate}
              </p>
            )}
          </div>
        </div>

        <div className='mt-4'>
          <label
            htmlFor='invoiceDescription'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Invoice Description *
          </label>
          <textarea
            id='invoiceDescription'
            name='invoiceDescription'
            rows={3}
            value={formik.values.invoiceDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              formik.touched.invoiceDescription &&
              formik.errors.invoiceDescription
                ? 'border-red-300'
                : 'border-gray-300'
            }`}
          />
          {formik.touched.invoiceDescription &&
            formik.errors.invoiceDescription && (
              <p className='mt-1 text-sm text-red-600'>
                {formik.errors.invoiceDescription}
              </p>
            )}
        </div>
      </div>

      {/* Expense Details */}
      <div>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-base font-medium text-gray-900'>
            Expense Details
          </h3>
          <div className='text-sm text-gray-600'>
            <span className='text-gray-900 font-medium'>$ 0.00</span> /{' '}
            <span className='text-blue-600 font-medium'>$ 0.00</span>
            <span className='ml-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs'>
              $
            </span>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label
              htmlFor='lineAmount'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Line Amount *
            </label>
            <div className='relative'>
              <span className='absolute left-3 top-2 text-gray-500'>$</span>
              <input
                type='text'
                id='lineAmount'
                name='lineAmount'
                value={formik.values.lineAmount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='0.00'
                className={`w-full pl-8 pr-12 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  formik.touched.lineAmount && formik.errors.lineAmount
                    ? 'border-red-300'
                    : 'border-gray-300'
                }`}
              />
              <span className='absolute right-3 top-2 text-gray-500'>USD</span>
            </div>
            {formik.touched.lineAmount && formik.errors.lineAmount && (
              <p className='mt-1 text-sm text-red-600'>
                {formik.errors.lineAmount}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor='department'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Department *
            </label>
            <select
              id='department'
              name='department'
              value={formik.values.department}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                formik.touched.department && formik.errors.department
                  ? 'border-red-300'
                  : 'border-gray-300'
              }`}
            >
              <option value=''>Select Department</option>
              {departmentOptions.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {formik.touched.department && formik.errors.department && (
              <p className='mt-1 text-sm text-red-600'>
                {formik.errors.department}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor='account'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Account *
            </label>
            <select
              id='account'
              name='account'
              value={formik.values.account}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                formik.touched.account && formik.errors.account
                  ? 'border-red-300'
                  : 'border-gray-300'
              }`}
            >
              <option value=''>Select Account</option>
              {accountOptions.map((acc) => (
                <option key={acc} value={acc}>
                  {acc}
                </option>
              ))}
            </select>
            {formik.touched.account && formik.errors.account && (
              <p className='mt-1 text-sm text-red-600'>
                {formik.errors.account}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor='location'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Location *
            </label>
            <select
              id='location'
              name='location'
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                formik.touched.location && formik.errors.location
                  ? 'border-red-300'
                  : 'border-gray-300'
              }`}
            >
              <option value=''>Select Location</option>
              {locationOptions.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            {formik.touched.location && formik.errors.location && (
              <p className='mt-1 text-sm text-red-600'>
                {formik.errors.location}
              </p>
            )}
          </div>
        </div>

        <div className='mt-4'>
          <label
            htmlFor='expenseDescription'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Description *
          </label>
          <textarea
            id='expenseDescription'
            name='expenseDescription'
            rows={3}
            value={formik.values.expenseDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              formik.touched.expenseDescription &&
              formik.errors.expenseDescription
                ? 'border-red-300'
                : 'border-gray-300'
            }`}
          />
          {formik.touched.expenseDescription &&
            formik.errors.expenseDescription && (
              <p className='mt-1 text-sm text-red-600'>
                {formik.errors.expenseDescription}
              </p>
            )}
        </div>

        <div className='mt-4'>
          <button
            type='button'
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
                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
              />
            </svg>
            Add Expense Coding
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
