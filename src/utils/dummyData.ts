export interface InvoiceFormData {
  // Vendor Details
  vendor: string;
  vendorAddress: string;

  // Invoice Details
  purchaseOrderNumber: string;
  invoiceNumber: string;
  invoiceDate: string;
  totalAmount: string;
  paymentTerms: string;
  invoiceDueDate: string;
  glPostDate: string;
  invoiceDescription: string;

  // Expense Details
  lineAmount: string;
  department: string;
  account: string;
  location: string;
  expenseDescription: string;

  // Comments
  comments: string;
}

export const dummyInvoiceData: InvoiceFormData = {
  // Vendor Details
  vendor: 'A - 1 Exterminators',
  vendorAddress: '550 Main St., Lynn',

  // Invoice Details
  purchaseOrderNumber: 'PO-2024-001',
  invoiceNumber: 'INV-2024-12345',
  invoiceDate: '2024-01-15',
  totalAmount: '2500.00',
  paymentTerms: 'Net 30',
  invoiceDueDate: '2024-02-14',
  glPostDate: '2024-01-16',
  invoiceDescription:
    'Monthly pest control services for office building including inspection, treatment, and follow-up maintenance.',

  // Expense Details
  lineAmount: '2500.00',
  department: 'Facilities',
  account: 'Maintenance & Repairs',
  location: 'Main Office',
  expenseDescription: 'Pest control services - monthly maintenance contract',

  // Comments
  comments:
    'Regular monthly service completed. Next scheduled visit: February 15, 2024. All areas treated according to contract specifications.',
};

export const vendorOptions = [
  'A - 1 Exterminators',
  'ABC Cleaning Services',
  'Tech Solutions Inc.',
  'Office Supplies Co.',
  'Maintenance Pro LLC',
];

export const paymentTermsOptions = [
  'Net 15',
  'Net 30',
  'Net 45',
  'Net 60',
  'Due on Receipt',
];

export const departmentOptions = [
  'Accounting',
  'Administration',
  'Facilities',
  'Human Resources',
  'IT',
  'Marketing',
  'Operations',
  'Sales',
];

export const accountOptions = [
  'Office Supplies',
  'Maintenance & Repairs',
  'Professional Services',
  'Utilities',
  'Insurance',
  'Software Licenses',
  'Travel & Entertainment',
  'Training & Development',
];

export const locationOptions = [
  'Main Office',
  'Branch Office',
  'Warehouse',
  'Remote Location',
  'Corporate HQ',
];
export const loadDummyPDF = async (): Promise<File | null> => {
  try {
    const response = await fetch('/dummy-invoice.pdf');
    if (response.ok) {
      const blob = await response.blob();
      return new File([blob], 'dummy-invoice.pdf', { type: 'application/pdf' });
    }
  } catch (error) {
    console.error('Error loading dummy PDF:', error);
  }
  return null;
};
