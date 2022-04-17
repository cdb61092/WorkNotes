import axios, { AxiosRequestConfig } from 'axios';
import { useContext, createContext, useState } from 'react';

interface User {
  _id?: String | undefined;
  username: String;
  password: String;
}

interface AuthContextInterface {
  user: User | null;
  login: (user: User) => void;
  register: (user: User) => void;
}

interface Credentials {
  username: String;
  password: String;
}

const AuthContext = createContext({} as AuthContextInterface);
AuthContext.displayName = 'AuthContext';
axios.defaults.withCredentials = true;

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (user: Credentials) => {
    const options: AxiosRequestConfig = {
      url: 'http://localhost:5000/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: { username: user.username, password: user.password },
    };
    axios(options)
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const register = (user: Credentials) => {
    const options: AxiosRequestConfig = {
      url: 'http://localhost:5000/auth/register',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: { username: user.username, password: user.password },
    };

    axios(options)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
