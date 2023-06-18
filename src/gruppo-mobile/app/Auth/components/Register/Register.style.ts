import styled from "styled-components/native";

export const Modal = styled.Modal`
  flex: 1;  
  height: 100%;
`;

export const Overlay = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.25);  
  justify-content: flex-end;
  align-items: center;
`;

export const Container = styled.View`
  flex: 3;
  justify-content: flex-end;
  align-items: center;

  width: 100%;
  height: 80%;

  background-color: rgba(0, 0, 0, 0.25);
`;

export const ScrollView = styled.ScrollView`
  flex: 1;  
`;

export const FormContainer = styled.View`
  flex: 1;  
  gap: 8px;
  padding: 16px 32px;
  background: ${({ theme }) => theme.color.background.alt};
`;

export const ModalWrapper = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  
  min-height: 100%;
  
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  overflow: hidden;
`;


