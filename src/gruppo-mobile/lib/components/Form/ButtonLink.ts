import { Link } from "expo-router";
import styled from "styled-components/native";

interface IButtonLinkProps {
  color?: string;
  paddingVertical?: string;
  paddingHorizontal?: string;
  radius?: string;
  variant?: "outline" | "alt" | "primary" | "secondary";
}

function getBackgroundColor(color, variant = 'primary', theme) {
  if (variant === "outline") {
    return "transparent";
  }
  if (variant === "alt") {
    return theme.color.background.alt;
  }
  if (variant === "secondary") {
    return theme.color.secondary;
  }
  if (variant === "primary") {
    return theme.color.primary;
  }
  if (variant === "danger") {
    return theme.color.danger;
  }
  if (variant === "success") {
    return theme.color.success;
  }
  return color;
}

export const ButtonLink = styled(Link)<IButtonLinkProps>`
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 30px;
  min-height: 50px;
  max-height: 50px;
  height: 100%;
  
  border-radius: ${({radius}) => radius ? radius : "8px"};
  padding: ${({ paddingVertical }) => paddingVertical ? paddingVertical : "8px"} ${({ paddingHorizontal }) => paddingHorizontal ? paddingHorizontal : "16px"};
  background-color: ${({ color, theme, variant }) => getBackgroundColor(color, variant, theme)};
  color: #ffffff;
`;
