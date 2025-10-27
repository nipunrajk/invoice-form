import { useState } from 'react';
import { useFormik } from 'formik';

interface LoginFormProps {
  onLogin: (username: string, password: string) => boolean;
}

interface FormValues {
  username: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [loginError, setLoginError] = useState<string>('');

  const formik = useFormik<FormValues>({
    initialValues: {
      username: '',
      password: '',
    },
    validate: (values) => {
      const errors: Partial<FormValues> = {};

      if (!values.username) {
        errors.username = 'Username is required';
      }

      if (!values.password) {
        errors.password = 'Password is required';
      }

      return errors;
    },
    onSubmit: (values) => {
      const success = onLogin(values.username, values.password);
      if (!success) {
        setLoginError('Invalid username or password');
      }
    },
  });

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Sign in to your account
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Demo credentials: admin/admin123, user/user123, demo/demo123
          </p>
        </div>
        <form className='mt-8 space-y-6' onSubmit={formik.handleSubmit}>
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='username' className='sr-only'>
                Username
              </label>
              <input
                id='username'
                name='username'
                type='text'
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  formik.touched.username && formik.errors.username
                    ? 'border-red-300 text-red-900 placeholder-red-300'
                    : 'border-gray-300 text-gray-900 placeholder-gray-500'
                } rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder='Username'
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username && (
                <p className='mt-1 text-sm text-red-600'>
                  {formik.errors.username}
                </p>
              )}
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  formik.touched.password && formik.errors.password
                    ? 'border-red-300 text-red-900 placeholder-red-300'
                    : 'border-gray-300 text-gray-900 placeholder-gray-500'
                } rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder='Password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <p className='mt-1 text-sm text-red-600'>
                  {formik.errors.password}
                </p>
              )}
            </div>
          </div>

          {loginError && (
            <div className='text-red-600 text-sm text-center'>{loginError}</div>
          )}

          <div>
            <button
              type='submit'
              disabled={formik.isSubmitting}
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
