import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(['token']);
  const [isLoggedIn, setIsLoggedIn] = useState(cookies.token ? true : false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state ? location.state.from : '/';

  const tokenAuth = () => {
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
  };

  useEffect(() => {
    tokenAuth();
  }, [cookies.token]);

  const logoutHandler = () => {
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    axios.defaults.headers.common = {
      Authorization: ``,
    };
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
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
        setToken(response.data.jwt);
        document.cookie = `token=${response.data.jwt}`;
        setUser(response.data.user);
        setIsLoggedIn(true);
        setIsLoading(false);
        navigate(from, { replace: true });
      }
    } catch (err) {
      setIsLoading(false);
      setError('Eposta veya şifre hatalı!');
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
        tokenAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
