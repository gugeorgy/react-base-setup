import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/lib/theme';
import App from './App';
import Layout from './Layout';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <Layout>
          <App/>
        </Layout>
      </ChakraProvider>
    </React.StrictMode>,
  );
} else {
  console.warn('No element with id "root" found');
}
