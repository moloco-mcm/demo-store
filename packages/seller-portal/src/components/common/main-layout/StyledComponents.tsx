import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  grid-template-areas: 'top top' 'side content';
  width: 100vw;
  height: 100vh;
`;

export const Top = styled.div`
  grid-area: top;
  height: 100%;
  overflow-y: auto;
`;

export const Side = styled.div`
  grid-area: side;
`;

export const Content = styled.div`
  grid-area: content;
  width: 100%;
  height: 100%;
  overflow: auto;
`;
