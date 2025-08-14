import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export const FieldWrapper = styled.div`
  margin-bottom: 16px;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 4px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  ${({ variant }) =>
    variant === "primary"
      ? `
        background-color: #007bff;
        color: white;
      `
      : `
        background-color: #6c757d;
        color: white;
      `}
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ListItem = styled.li`
  border: 1px solid #ddd;
  padding: 8px;
  margin-bottom: 4px;
  border-radius: 4px;
`;
