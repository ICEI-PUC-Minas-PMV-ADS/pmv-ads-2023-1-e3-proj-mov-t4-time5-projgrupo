import styled from "styled-components/native";

interface IButtonProps {
  color?: string;
  paddingVertical?: string;
  paddingHorizontal?: string;
}

export const Button = styled.TouchableOpacity<IButtonProps>`
  flex: 1;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  max-height: 50px;
  height: 100%;
  
  border-radius: 5px;
  padding: ${({ paddingVertical }) => paddingVertical ? paddingVertical : "8px"} ${({ paddingHorizontal }) => paddingHorizontal ? paddingHorizontal : "16px"};
  background-color: ${({ color, theme }) => color ? color : theme.color.primary};
  color: #ffffff;
`;
