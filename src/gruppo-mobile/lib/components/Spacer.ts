import styled from "styled-components/native";

interface IBR {
  size?: number,
}

export const BR = styled.View<IBR>`
  flex: 1;  
  height: ${({ size }) => size ? size : '8px'};
  width: ${({ size }) => size ? size : '8px'};
`;

interface IHR {
  size?: number,
  height?: number | string,
  width?: number | string,
  color?: string,
  marginTop?: number,
  marginBottom?: number,
}

export const HR = styled.View<IHR>`
  flex: 1;
  background-color: ${({ color, theme }) => color ? color : theme.color.background.alt};
  height: ${({ height }) => height ? height : '1px'};
  width: ${({ width }) => width ? width : '100%'};
  
  margin-top: ${({ marginTop }) => marginTop ? marginTop : 4}px;
  margin-bottom: ${({ marginBottom }) => marginBottom ? marginBottom : 4}px;  
`;

interface IVR {
  size?: number,
  height?: number | string,
  width?: number | string,
  color?: string,
  marginLeft?: number,
  marginRight?: number,
}

export const VR = styled.View<IVR>`
  flex: 1;
  background-color: ${({ color, theme }) => color ? color : theme.color.background.alt};
  height: ${({ height }) => height ? height : '100%'};
  width: ${({ width }) => width ? width : '1px'};
  
  margin-left: ${({ marginLeft }) => marginLeft ? marginLeft : 4}px;
  margin-right: ${({ marginRight }) => marginRight ? marginRight : 4}px;  
`;
