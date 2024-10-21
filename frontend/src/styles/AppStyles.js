import styled from 'styled-components';

export const AppContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  color: #333;
`;

export const HeaderContainer = styled.header`
  background: linear-gradient(90deg, #3498db, #2ecc71);
  color: white;
  padding: 30px;
  text-align: center;
  border-radius: 8px 8px 0 0;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: 600;
`;

export const Content = styled.main`
  background-color: white;
  padding: 30px;
  border-radius: 0 0 8px 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;
