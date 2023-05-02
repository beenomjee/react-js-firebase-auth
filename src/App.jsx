import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { ErrorPage, Home, Login, SignUp } from './modules'
import { Loader } from './components';
import { auth, getUserDetail } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

const ProtectedRoute = ({ element }) => {
  const Element = element;
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const getDetails = async () => {
          const user = await getUserDetail();
          setUser(user);
          setIsLoading(false);
        };
        getDetails();
      }
      else
        navigate('/login');
    });
  }, []);
  return (
    isLoading ? <Loader /> : <Element user={user} />
  )
}

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={Home} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  )
}

export default App