import { ChakraProvider, Box } from '@chakra-ui/react';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { useAuth } from './context/auth';
import { Sidebar } from './components/Sidebar';

import theme from './theme';
import { QueryClient, QueryClientProvider } from 'react-query';

export const queryClient = new QueryClient();

const App = () => {
  const { user } = useAuth();
  return (
    <Box h='100vh' ml='50px'>
      {user ? (
        <>
          <Sidebar />
          <Outlet />
        </>
      ) : (
        <Login />
      )}
    </Box>
  );
};

export { App };
