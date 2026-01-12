// import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Navbar from './components/layout/Navbar';
// import Footer from './components/layout/Footer';
// import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import DeliveriesPage from './pages/DeliveriesPage';
// import CreateDeliveryPage from './pages/CreateDeliveryPage';
// import DeliveryDetailsPage from './pages/DeliveryDetailsPage';
// import ProfilePage from './pages/ProfilePage';
// import { AuthProvider } from './contexts/AuthContext';
// import PrivateRoute from './components/common/PrivateRoute';

// function App() {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate initial loading
//     setTimeout(() => setLoading(false), 800);
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <AuthProvider>
//       <Router>
//         <div className="flex flex-col min-h-screen">
//           <Navbar />
//           <main className="flex-grow">
//             <Routes>
//               <Route path="/" element={<HomePage />} />
//               <Route path="/login" element={<LoginPage />} />
//               <Route path="/register" element={<RegisterPage />} />
//               <Route path="/deliveries" element={<DeliveriesPage />} />
//               <Route path="/delivery/:id" element={<DeliveryDetailsPage />} />
//               <Route 
//                 path="/create-delivery" 
//                 element={
//                   <PrivateRoute>
//                     <CreateDeliveryPage />
//                   </PrivateRoute>
//                 } 
//               />
//               <Route 
//                 path="/profile" 
//                 element={
//                   <PrivateRoute>
//                     <ProfilePage />
//                   </PrivateRoute>
//                 } 
//               />
//               <Route path="*" element={<Navigate to="/" replace />} />
//             </Routes>
//           </main>
//           <Footer />
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DeliveriesPage from './pages/DeliveriesPage';
import CreateDeliveryPage from './pages/CreateDeliveryPage';
import DeliveryDetailsPage from './pages/DeliveryDetailsPage';
import ProfilePage from './pages/ProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
              <Route path="/deliveries" element={<DeliveriesPage />} />
              <Route path="/delivery/:id" element={<DeliveryDetailsPage />} />
              <Route 
                path="/create-delivery" 
                element={
                  <PrivateRoute>
                    <CreateDeliveryPage />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
