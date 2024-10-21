// styles/ProgressBarStyles.js
import styled from 'styled-components';

export const ProgressBar = styled.div`
  width: 100%;
  background-color: #ddd;
  border-radius: 8px;
  margin: 10px 0;

  &::after {
    content: '';
    display: block;
    height: 20px;
    width: ${(props) => props.progress || 0}%;
    background-color: #27ae60;
    border-radius: 8px;
    transition: width 0.4s ease;
  }
`;
