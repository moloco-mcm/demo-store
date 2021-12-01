import { createGlobalStyle } from 'styled-components';
import {
  color,
  mode,
  font,
  lineHeight,
  transitionDuration,
} from '../theme-utils';
import type { ThemeType } from '../theme/types';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}

type Props = {
  baseFontSize?: number;
};

export const GlobalStyle = createGlobalStyle<Props>`
  html,
  body {
    font-family: ${(props) => props.theme.fonts.body};
    font-family: ${font('body')};
    font-size: ${(props) =>
      props.baseFontSize ? `${props.baseFontSize}px` : '14px'};
    color: ${mode(color(['gray', 800]), color(['whiteAlpha', 900]))};
    background-color: ${mode(color('white'), color(['gray', 800]))};
    transition: background-color ${transitionDuration('normal')};
    line-height: ${lineHeight('base')};
  }
  *::placeholder {
    color: ${mode(color(['gray', 400]), color(['whiteAlpha', 400]))};
  }
  *, *::before, &::after {
    border-color: ${mode(color(['gray', 200]), color(['whiteAlpha', 300]))};
    word-wrap: break-word;
  }
`;
