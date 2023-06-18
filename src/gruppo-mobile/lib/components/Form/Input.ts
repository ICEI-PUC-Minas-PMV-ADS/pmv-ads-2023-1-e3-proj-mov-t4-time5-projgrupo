import styled from "styled-components/native";

export const Input = styled.TextInput`
  flex: 1;
  max-height: 50px;  
  min-height: 50px;  
  
  min-width: 100%;
  max-width: 256px;
  
  margin: 0;
  padding: 8px 16px;

  border-radius: 5px;
  border: 1px solid gray;  
  background: ${({theme}) => theme.color.background.main};
  color: ${(props) => props.theme.color.text.alt};  
`;
