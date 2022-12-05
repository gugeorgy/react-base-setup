import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@/styles/globalStyle';
import { ThemeColor } from '@/config';
import { Home } from '@/containers';

export function App() {
  return (
    <ThemeProvider theme={ThemeColor}>
      <GlobalStyle />
      <Home />
    </ThemeProvider>
  );
}
