import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {


    const user = localStorage.getItem('user')

    const isAuthenticated = user

    return (
        isAuthenticated ? children : <Navigate to={'/'} />
    )
}

export default ProtectedRoute