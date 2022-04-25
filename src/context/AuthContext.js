import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [cookies, setCookie] = useCookies(['token']);
  const [isLoggedIn, setIsLoggedIn] = useState(cookies.token ? true : false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.token) {
      setToken(cookies.token);
      setIsLoggedIn(true);

      axios.defaults.headers.common = {
        Authorization: `Bearer ${cookies.token}`,
      };

      axios
        .get('https://bootcamp.akbolat.net/users/me')
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => setError(err));
    }
  }, [cookies.token]);

  const logoutHandler = () => {
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    setCookie('token', '', { path: '/' });
    navigate('/');
  };

  const loginHandler = async (auth) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        'https://bootcamp.akbolat.net/auth/local',
        {
          identifier: auth.email,
          password: auth.password,
        }
      );

      if (response.status === 200) {
        setUser(auth);
        setToken(response.data.jwt);
        document.cookie = `token=${response.data.jwt}`;
        setIsLoggedIn(true);
        setIsLoading(false);
        navigate('/');
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError('Böyle bir kullanıcı yok!');

      setTimeout(() => {
        setError(null);
      }, 4000);
    }
  };

  const signupHandler = async (auth) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        'https://bootcamp.akbolat.net/auth/local/register',
        {
          username: auth.email,
          email: auth.email,
          password: auth.password,
        }
      );
      if (response.status === 200) {
        setUser(auth);
        setToken(response.data.jwt);
        document.cookie = `token=${response.data.jwt}`;
        setIsLoggedIn(true);
        setIsLoading(false);
        navigate('/');
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      setIsLoading(false);
      setError('Hata oldu, tekrar deneyiniz!');

      setTimeout(() => {
        setError(null);
      }, 4000);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoading,
        signupHandler,
        loginHandler,
        error,
        token,
        logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
