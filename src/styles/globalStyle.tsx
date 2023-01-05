import { createGlobalStyle } from 'styled-components';
import { ColorStyle, Size } from '@/config';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ColorStyle {}
}

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Concert';
    src: url(/assets/fonts/ConcertOne-Regular.ttf);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Concert', cursive;
    color: ${props => props.theme.text};
  }

  ::-webkit-scrollbar {
  display: none;
}

  html {
    scroll-behavior: smooth;
    // Since screens are generally more wide than they are tall, I used a 1.1:1.5 ratio.
    font-size: calc(10px + 0.5 * (1.5vh + 1.1vw));
    @media (max-width: 300px) {
      font-size: calc(8px + 0.5 * (1.5vh + 1.1vw));
    }    
    @media (min-width: 740px) {
      font-size: calc(16px + 0.5 * (1.5vh + 1.1vw));
    }    

    body {
      font-size: ${Size.m};
      background-color: ${props => props.theme.body};
      h1,
      h2,
      h3 {
        font-size: ${Size.xxl};
      }
      img,svg {
        max-width: 100%;
        height: 100%;
        object-fit: cover;
      }
      ul {
        list-style: none;
      }
      a {
        text-decoration: none;
      }
      input,
      button { 
        width: 100%;
        border: none;
        outline: none;
        background: none;
      }
      button {
        cursor: pointer;
      }
    }
  }
`;
