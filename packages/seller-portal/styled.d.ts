import { CSSProp } from 'styled-components';

// ref: https://github.com/styled-components/styled-components/issues/2528
declare module 'react' {
  interface Attributes {
    css?: CSSProp;
  }
}
