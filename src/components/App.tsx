// src/components/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Login from '../auth/Login';
import Dashboard from '../dashboard/Dashboard';
import ProtectedRoute from '../auth/ProtectedRoute';
import UserPanel from './UserPanel';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/u/:username" element={<UserPanel />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;