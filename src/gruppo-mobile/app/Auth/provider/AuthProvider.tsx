import React, { createContext, useContext, useEffect, useState } from 'react';

import { StorageService } from '../../../lib/services/StorageService';
import { AuthService } from './service/AuthService';
import { LoginPayload } from './service/models/AuthDTO';
import { Profile } from './service/models/Profile';

interface AuthContextData {
  user: Profile | null;
  Login(user: LoginPayload): Promise<void>;
  Validate(token: string): Promise<boolean>;
  Logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }) {
  const service = AuthService.getInstance();
  const storage = StorageService();
  const [user, setUser] = useState<Profile | null>(null);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    storage.get('user').then((response) => {
      if (response) {
        if (response !== 'undefined') {
          setUser(JSON.parse(response));
        } else {
          setUser(null);
          storage.remove('user');
        }
      }
    });
    storage.get('token').then((response) => {
      if (response) {
        if (response !== 'undefined') {
          setToken(response);
        } else {
          setToken('');
          storage.remove('token');
        }
      }
    });
  }, []);

  const Login = async (userData?: LoginPayload) => {
    const token = await storage.get('token');
    const valid = await Validate(token);
    if (valid) {
      return;
    }
    if (userData) {
      const response = await service.postLogin(userData);

      if (response.data.access_token) {
        setToken(response.data.access_token);
        storage.set('token', response.data.access_token);
        await Validate(response.data.access_token)
      } else {
        throw new Error(response.data.message);
      }
    }
  }
  
  const Logout = () => {
    setToken('');
    setUser(null);
    storage.remove('token');
    storage.remove('user');
  }

  const Validate = async (token: string): Promise<boolean> => {
    if (token) {
      const response = await service.getProfile(token);
      if (response?.data) {
        storage.set('user', JSON.stringify(response.data));
        setUser(response.data);
        return true;
      }
    }
    Logout();
    return false;
  }

  return (
    <AuthContext.Provider value={{ Validate, user, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
