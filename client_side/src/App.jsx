import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import React, { Suspense, lazy } from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Breadcrumb from './components/Breadcrumb';
import ProtectedRoute from './routes/ProtectedRoute';
import LoadingAnimation from './common/LoadingAnimation';

const SignIn = lazy(() => import('./features/auth/SignIn/SignIn'));
const PasswordResetEmail = lazy(() => import('./features/auth/PasswordResetEmail/PasswordResetEmail'));
const UserProfile = lazy(() => import('./features/user/components/UserProfile'));
const PasswordUpdate = lazy(() => import('./features/auth/PasswordUpdate/PasswordUpdate'));
const AllCustomerDetails = lazy(() => import('./features/user/components/AllCustomerDetails'));
const UserUpdateForm = lazy(() => import('./features/user/components/UserUpdateForm'));
const AddCustomerForm = lazy(() => import('./features/user/components/AddCustomerForm'));

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
      <Suspense fallback={<><LoadingAnimation /> </>}>
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
                <AddCustomerForm />
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
      </Suspense>
    </main>
  );
}

export default App;
