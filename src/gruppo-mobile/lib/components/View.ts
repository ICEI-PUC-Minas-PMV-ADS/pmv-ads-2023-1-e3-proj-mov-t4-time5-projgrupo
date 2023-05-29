import styled from "styled-components/native";

interface IView {
  variant?: 'main' | 'alt'
}

export const View = styled.View<IView>`
  background-color: ${({theme, variant}) => !variant ? 'transparent' : theme.color.background[variant]};
`;
