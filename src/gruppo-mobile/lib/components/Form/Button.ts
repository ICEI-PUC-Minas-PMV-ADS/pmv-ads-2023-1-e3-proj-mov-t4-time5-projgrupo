import styled from "styled-components/native";

export const Button = styled.TouchableOpacity`
  flex: 1;
  height: 100%;
  min-height: 48px;
  max-height: 64px;
  min-width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.color.primary};
  padding: 8px 16px;
  color: #ffffff;
  border-radius: 5px;
`;
