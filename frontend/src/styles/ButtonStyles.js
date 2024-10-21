import styled from 'styled-components';

export const FileInput = styled.input`
  display: none;
`;

export const FileLabel = styled.label`
  display: inline-block;
  padding: 15px 20px;
  background-color: #3498db;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 15px;
  font-weight: 500;

  &:hover {
    background-color: #2980b9;
  }
`;

export const DropArea = styled.div`
  border: 2px dashed #3498db;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ecf0f1;
  }
`;

export const Button = styled.button`
  padding: 15px 20px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 15px;

  &:hover {
    background-color: #27ae60;
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;
