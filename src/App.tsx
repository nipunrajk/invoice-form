import { useAuth } from './hooks/useAuth';
import LoginForm from './components/auth/LoginForm';
import Layout from './components/layout/Layout';
import InvoiceForm from './components/invoice/InvoiceForm';

function App() {
  const { isAuthenticated, isLoading, login, logout } = useAuth();

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />;
  }

  return (
    <Layout onLogout={logout}>
      <InvoiceForm />
    </Layout>
  );
}

export default App;
