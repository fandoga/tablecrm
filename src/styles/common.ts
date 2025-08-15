import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }
`;

export const FieldWrapper = styled.div`
  margin-bottom: 16px;
`;

export const Label = styled.p`
font-weight: 500;
color:rgb(36, 36, 36);
font-size: 15px;
// margin-bottom: 10px;
`;

export const LabelMin = styled.h3`
  font-weight: 500;
  font-size: 17px;
  padding-bottom: 16px;
`;

export const Select = styled.select`
border: 1px solid rgb(215, 215, 215);
margin-bottom: 16px;
padding: 8px;
height: 42px;
width: 100%;
border-radius: 6px;

font-size: 15px;
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
