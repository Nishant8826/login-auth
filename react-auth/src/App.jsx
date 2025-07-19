import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProtectedRoute from './ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './store/authSlice';

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  useEffect(() => {
    // Check authentication status on app load
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />


        <Route path='/profile' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Profile /></ProtectedRoute>} />

        <Route path='*' element={<Navigate to={'/'} />} />
      </Routes>
    </Router>
  );
}

export default App;
