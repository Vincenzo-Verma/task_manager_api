import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiClient } from '../../lib/apiClient';
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from '../../lib/tokenStorage';
import { getUserIdFromToken } from '../../shared/utils/jwt';
import { getApiErrorMessage } from '../../shared/utils/apiError';

const AuthContext = createContext(null);

async function fetchCurrentUser(accessToken) {
  const userId = getUserIdFromToken(accessToken);
  if (!userId) {
    throw new Error('Unable to determine current user from token.');
  }

  const response = await apiClient.get(`/api/users/${userId}/`);
  return response.data;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeSession = async () => {
      const access = getAccessToken();
      const refresh = getRefreshToken();

      if (!access && !refresh) {
        setLoading(false);
        return;
      }

      try {
        if (access) {
          const currentUser = await fetchCurrentUser(access);
          setUser(currentUser);
          return;
        }

        if (refresh) {
          const refreshResponse = await apiClient.post('/api/token/refresh/', { refresh });
          const newAccess = refreshResponse?.data?.access;
          if (!newAccess) {
            throw new Error('Could not refresh session.');
          }

          setTokens({ access: newAccess, refresh });
          const currentUser = await fetchCurrentUser(newAccess);
          setUser(currentUser);
        }
      } catch {
        clearTokens();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeSession();
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      register: async (payload) => {
        const response = await apiClient.post('/api/users/', payload);
        return response.data;
      },
      login: async (username, password) => {
        const tokenResponse = await apiClient.post('/api/token/', { username, password });
        const tokens = tokenResponse.data;

        setTokens(tokens);

        const currentUser = await fetchCurrentUser(tokens.access);
        setUser(currentUser);
      },
      logout: () => {
        clearTokens();
        setUser(null);
      },
      getErrorMessage: getApiErrorMessage,
    }),
    [loading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }
  return context;
}
