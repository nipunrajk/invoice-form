# Invoice Management System

A React application for managing invoices with PDF upload, form validation, and data persistence.

## Tech Stack

- React with TypeScript
- Formik for form management
- react-pdf for PDF rendering
- Tailwind CSS for styling
- localStorage for data persistence

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd invoice-management-system
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## Usage Instructions

### Login

Use demo credentials:

- Username: `admin` | Password: `admin123`
- Username: `user` | Password: `user123`
- Username: `demo` | Password: `demo123`

### Using the Application

1. **Login** with demo credentials
2. **Upload PDF** by dragging and dropping or clicking the upload area
3. **Fill the form** in the Vendor Details tab (contains all fields)
4. **Use "Populate Dummy Data"** button to auto-fill form with sample data
5. **Submit** the form to save data to localStorage
6. **Logout** using the logout button in the header

### Features

- Form data automatically saves and persists across page reloads
- PDF viewer with navigation for multi-page documents
- Form validation with error messages
- Responsive design for all screen sizes
