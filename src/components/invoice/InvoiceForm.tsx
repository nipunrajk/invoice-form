import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import PDFUpload from './PDFUpload';
import VendorDetails from './tabs/VendorDetails';
import InvoiceDetails from './tabs/InvoiceDetails';
import Comments from './tabs/Comments';
import {
  InvoiceFormData,
  dummyInvoiceData,
  loadDummyPDF,
} from '../../utils/dummyData';

type TabType = 'vendor' | 'invoice' | 'comments';

const InvoiceForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('vendor');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const formik = useFormik<InvoiceFormData>({
    initialValues: {
      vendor: '',
      vendorAddress: '',
      purchaseOrderNumber: '',
      invoiceNumber: '',
      invoiceDate: '',
      totalAmount: '',
      paymentTerms: '',
      invoiceDueDate: '',
      glPostDate: '',
      invoiceDescription: '',
      lineAmount: '',
      department: '',
      account: '',
      location: '',
      expenseDescription: '',
      comments: '',
    },
    validate: (values) => {
      const errors: Partial<InvoiceFormData> = {};

      // Vendor Details validation
      if (!values.vendor) errors.vendor = 'Vendor is required';

      // Invoice Details validation
      if (!values.purchaseOrderNumber)
        errors.purchaseOrderNumber = 'Purchase Order Number is required';
      if (!values.invoiceNumber)
        errors.invoiceNumber = 'Invoice Number is required';
      if (!values.invoiceDate) errors.invoiceDate = 'Invoice Date is required';
      if (!values.totalAmount) errors.totalAmount = 'Total Amount is required';
      if (!values.paymentTerms)
        errors.paymentTerms = 'Payment Terms is required';
      if (!values.invoiceDueDate)
        errors.invoiceDueDate = 'Invoice Due Date is required';
      if (!values.glPostDate) errors.glPostDate = 'GL Post Date is required';
      if (!values.invoiceDescription)
        errors.invoiceDescription = 'Invoice Description is required';

      // Expense Details validation
      if (!values.lineAmount) errors.lineAmount = 'Line Amount is required';
      if (!values.department) errors.department = 'Department is required';
      if (!values.account) errors.account = 'Account is required';
      if (!values.location) errors.location = 'Location is required';
      if (!values.expenseDescription)
        errors.expenseDescription = 'Expense Description is required';

      return errors;
    },
    onSubmit: (values) => {
      // Save to localStorage
      localStorage.setItem('invoiceFormData', JSON.stringify(values));
      console.log('Form submitted:', values);
      alert('Invoice data saved successfully!');
    },
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('invoiceFormData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        formik.setValues(parsedData);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save form data to localStorage whenever form values change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('invoiceFormData', JSON.stringify(formik.values));
    }, 1000); // Debounce saves by 1 second

    return () => clearTimeout(timeoutId);
  }, [formik.values]);

  const handleFileUpload = (file: File | null) => {
    setUploadedFile(file);
  };

  const populateWithDummyData = async () => {
    formik.setValues(dummyInvoiceData);

    // Load dummy PDF
    const dummyPDF = await loadDummyPDF();
    if (dummyPDF) {
      setUploadedFile(dummyPDF);
    }

    alert('Form populated with dummy data and PDF!');
  };

  const tabs = [
    {
      id: 'vendor' as TabType,
      label: 'Vendor Details',
      active: activeTab === 'vendor',
    },
    {
      id: 'invoice' as TabType,
      label: 'Invoice Details',
      active: activeTab === 'invoice',
    },
    {
      id: 'comments' as TabType,
      label: 'Comments',
      active: activeTab === 'comments',
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'vendor':
        return <VendorDetails formik={formik} />;
      case 'invoice':
        return <InvoiceDetails formik={formik} />;
      case 'comments':
        return <Comments formik={formik} />;
      default:
        return <VendorDetails formik={formik} />;
    }
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 h-full'>
      {/* Left Side - PDF Upload */}
      <div className='h-full'>
        <PDFUpload
          onFileUpload={handleFileUpload}
          uploadedFile={uploadedFile}
        />
      </div>

      {/* Right Side - Form */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
        {/* Tabs */}
        <div className='border-b border-gray-200'>
          <nav className='flex space-x-8 px-6' aria-label='Tabs'>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  tab.active
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <form onSubmit={formik.handleSubmit} className='p-6'>
          {renderTabContent()}

          {/* Action Buttons */}
          <div className='flex justify-between items-center mt-8 pt-6 border-t border-gray-200'>
            <button
              type='button'
              onClick={populateWithDummyData}
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
                  d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                />
              </svg>
              Populate Dummy Data
            </button>

            <div className='flex space-x-3'>
              <button
                type='button'
                className='inline-flex items-center px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              >
                Save as Draft
              </button>
              <button
                type='submit'
                className='inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              >
                Submit & New
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;
