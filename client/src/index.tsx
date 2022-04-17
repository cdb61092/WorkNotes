import * as React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { AuthProvider } from './context/auth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from './theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Notes } from './components/Notes';
import { Editor } from './components/Editor';
import { Home } from './components/Home';
import { CreateNote } from './components/CreateNote';
export const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<App />}>
                <Route path='home' element={<Home />} />
                <Route path='notes' element={<Notes />}>
                  <Route path=':_id' element={<Editor />} />
                  <Route path='create' element={<CreateNote />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
