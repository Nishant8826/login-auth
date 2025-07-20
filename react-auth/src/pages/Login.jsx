import { useState } from "react"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, signupUser } from "../store/authSlice";
import toast from "react-hot-toast";

const initialState = {
  email: '',
  password: '',
  displayName: ''
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const [isLogin, setIsLogin] = useState(true);

  const submit = (e) => {
    e.preventDefault();
    isLogin ? login() : signup();
  }

  const login = () => {
    dispatch(loginUser(formData)).then((response) => {
      if (response?.payload?.success) {
        toast.success(response.payload.message);
        navigate('profile');
      } else {
        response?.payload?.message && showToastError(response.payload.message);
      }
    });
  }


  const signup = () => {
    dispatch(signupUser(formData)).then((response) => {
      if (response?.payload?.success) {
        toast.success(response.payload.message);
        navigate('profile');
      } else {
        response?.payload?.message && showToastError(response.payload.message);
      }
    });
  }

  const showToastError = (message) => {
    toast.error(message);
  }

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const toggleForm = () => {
    console.log("Toggling form");
    setIsLogin(!isLogin);
    setFormData(initialState);
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">{isLogin ? "Log in" : "Sign up"}</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          {!isLogin && (
            <div>
              <label htmlFor="displayName" className="block text-sm/6 font-medium text-gray-900">Display Name</label>
              <div className="mt-2">
                <input type="text" name="displayName" id="displayName" value={formData.displayName} onChange={(e) => changeHandler(e)} required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
              </div>
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
            <div className="mt-2">
              <input type="email" name="email" id="email" value={formData.email} onChange={(e) => changeHandler(e)} required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
              <div className="text-sm">
              </div>
            </div>
            <div className="mt-2">
              <input type="password" name="password" id="password" value={formData.password} onChange={(e) => changeHandler(e)} required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
          </div>

          <div>
            <button type="submit" onClick={(e) => submit(e)} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{isLogin ? "Log in" : "Sign up"}</button>
          </div>
        </form>

        <button onClick={toggleForm} className="mt-6 w-full text-center text-sm/6 font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer">
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
        </button>


      </div>
    </div>

  )
}

export default Login