// App.js
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import SignIn from './features/auth/SignIn/SignIn';
import PasswordResetEmail from './features/auth/PasswordResetEmail/PasswordResetEmail';
import UserProfile from './features/user/components/UserProfile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Breadcrumb from './components/Breadcrumb';
import ProtectedRoute from './routes/ProtectedRoute';
import PasswordUpdate from './features/auth/PasswordUpdate/PasswordUpdate';
import CreateUser from './features/user/components/CreateUser';
import AllCustomerDetails from './features/user/components/AllCustomerDetails';
import UserUpdateForm from './features/user/components/UserUpdateForm';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <MainContent />
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

function MainContent() {
  const location = useLocation();

  const noBreadcrumbRoutes = ['/', '/reset-password'];

  return (
    <main className="flex-grow">
      <div className="mx-auto max-w-md flex items-center justify-center">
        {!noBreadcrumbRoutes.includes(location.pathname) && <Breadcrumb />}
      </div>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/reset-password" element={<PasswordResetEmail />} />
        <Route
          path="/user"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-customer"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <CreateUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-customers"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AllCustomerDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-user/:id"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <UserUpdateForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-password"
          element={
            <ProtectedRoute>
              <PasswordUpdate />
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
