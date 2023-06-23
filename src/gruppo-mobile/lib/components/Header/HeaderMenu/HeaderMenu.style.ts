import styled from "styled-components/native";

export const Modal = styled.Modal`
  flex: 1;
  width: 100%;
  height: 100%;
  background: red;
`;

export const Overlay = styled.TouchableWithoutFeedback`
  flex: 1;
  width: 100%;
  height: 100%;
`;

export const ModalWrapper = styled.View`
  flex: 1;  
  position: relative;
`;

export const ModalContainer = styled.View`
  background: ${({theme}) => theme.color.background.main};
  border: 1px solid ${({theme}) => theme.color.border};
  border-radius: 8px;
  width: 42%;  
  gap: 1px;
  
  overflow: hidden;
  position: absolute;
  top: 64px;
  right: 8px;
`;

