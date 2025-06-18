import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />


        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        <Route path='*' element={<Navigate to={'/'} />} />
      </Routes>
    </Router>
  );
}

export default App;
