import React, { createContext, useContext, useEffect, useState } from 'react';
import { useJwt } from 'react-jwt';

import { StorageService } from '../../../lib/services/StorageService';
import { AuthService } from './service/AuthService';
import { LoginPayload } from './service/models/AuthDTO';
import { Profile } from './service/models/Profile';

interface AuthContextData {
  user: Profile | null;
  Login(user: LoginPayload): Promise<void>;
  Logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }) {
  const service = AuthService.getInstance();
  const storage = StorageService();
  const [user, setUser] = useState<Profile | null>(null),
        [token, setToken] = useState<string>('');    
  const [count, setCount] = useState(0),
        { isExpired, reEvaluateToken } = useJwt(token);

  useEffect(() => {
    const timer = setTimeout(() => {
      reEvaluateToken(token);  
      if (isExpired && token !== '') {
        Logout();
      }
      setCount(count + 1);
    }, 1e3)
    return () => clearTimeout(timer)
  }, [count, isExpired])

  useEffect(() => {
    try {
      Login();
    } catch (e) {
      Logout();
    }
  }, []);

  const Logout = () => {
    setToken('');
    setUser(null);
    storage.remove('token');
    storage.remove('user');
  }

  const Login = async (userData?: LoginPayload): Promise<void> => {
    if (!userData) {
      storage.get('token').then(async (storageToken) => {
        if (storageToken && storageToken !== 'undefined') {
          service.getProfile(storageToken).then(({ data }) => {
            if (data.id) {
              setToken(storageToken);
              setUser(data);
              storage.set('user', JSON.stringify(data));
            }
          });
        }
      });
    } else {
      service.postLogin(userData).then(async ({ data }) => {
        if (data.access_token) {
          const accessToken = data.access_token;
          service.getProfile(accessToken).then(({ data }) => {
            if (data.id) {
              setToken(accessToken);
              setUser(data);
              storage.set('user', JSON.stringify(data));
              storage.set('token', accessToken);
            }
          });
        }
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
