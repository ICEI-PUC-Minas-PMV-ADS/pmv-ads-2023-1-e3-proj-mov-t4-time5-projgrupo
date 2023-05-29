import styled from "styled-components/native";

export const Input = styled.TextInput`
  height: 100%;
  max-height: 48px;
  min-width: 100%;
  max-width: 256px;
  border-color: gray;
  border-width: 1px;
  padding: 8px 16px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.color.background.main};
  color: ${(props) => props.theme.color.text.alt};
`;
