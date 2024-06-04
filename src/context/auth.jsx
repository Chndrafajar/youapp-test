import { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    access_token: '',
  });

  //default
  axios.defaults.headers.common['x-access-token'] = auth?.access_token;

  useEffect(() => {
    const data = localStorage.getItem('auth');
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        access_token: parseData.access_token,
      });
    }
  }, []);
  return <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>;
};

//custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
