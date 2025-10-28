import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onLogout }) => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='bg-white shadow-sm border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-4'>
            <div className='flex items-center'>
              <button className='mr-4 text-gray-600 hover:text-gray-900'>
                <ChevronLeft className='w-6 h-6' />
              </button>
              <h1 className='text-xl font-semibold text-gray-900'>
                Create New Invoice
              </h1>
            </div>
            <button
              onClick={onLogout}
              className='text-sm text-gray-600 hover:text-gray-900 px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50'
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {children}
      </main>
    </div>
  );
};

export default Layout;
