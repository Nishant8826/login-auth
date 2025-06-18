import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const doLogout = () => {
        localStorage.removeItem('user');
        dispatch(logout());
        navigate('/')
    }

    return (
        <div className="max-w-2xl mx-auto mt-12 px-6">
            <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Profile</h2>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-medium">Name:</span>
                        <span className="text-gray-900">{user?.name}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-medium">Email:</span>
                        <span className="text-gray-900">{user?.email}</span>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <button onClick={doLogout} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition duration-200">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
