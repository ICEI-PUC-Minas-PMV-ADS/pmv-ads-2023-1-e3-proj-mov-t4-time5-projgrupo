import { useEffect, useState } from "react";
import { Dimensions, StatusBar, Platform } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

import { StorageService } from "../../lib/services/StorageService";
import { Login } from "./components/Login/Login";
import { useAuth } from "./provider/AuthProvider";

import styled from "styled-components/native";
import Logo from '@assets/images/icon.png';

interface ContainerProps {
  isLandscape?: boolean;
}

const Page = styled.ScrollView`
  flex: 1;
  flex-direction: column;
  padding-top: ${Platform.OS === "android" ? StatusBar.currentHeight : 0}px;
  background-color: ${({ theme }) => theme.color.background.alt};
  `;

const Container = styled.View<ContainerProps>`
  flex: 1;
  padding-top: ${Platform.OS === "android" ? StatusBar.currentHeight : 0}px;
  flex-direction: ${({isLandscape}) => isLandscape ? 'row' : 'column'};
  background-color: ${({ theme }) => theme.color.background.alt};
  align-items: center;
  justify-content: center;
  padding: 16px 16px 64px;
`;

interface ImageProps {
  isPortrait: boolean;
  appHeight: number;
  appWidth: number;
}

const Image = styled.ImageBackground<ImageProps>`  
  resize-mode: contain;
  justify-content: center;
  align-items: center;
  width: ${({ isPortrait, appWidth }) => isPortrait && appWidth < 720 ? appWidth - 64 : 360}px;
  height: ${({ isPortrait, appWidth }) => isPortrait && appWidth < 720 ? appWidth - 64 : 360}px;  
  margin: 16px;
`;

export default function AuthScreen({ children }) {
  const storage = StorageService();
  const { user, Validate } = useAuth();
  const [isValid, setIsValid] = useState<boolean>(false);
  const { height, width } = Dimensions.get('window');
  const isPortrait = height > width;
  const isPhone = width < 720;

  if (isPhone) {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }

  useEffect(() => {
    storage.get('token').then(async (token) => {
      setIsValid(await Validate(token));
    });
  }, [isValid])

  useEffect(() => {}, [user]);

  return user ? <>{children}</> : (
    <Page>
      <Container isLandscape={!isPortrait}>
        <Image isPortrait={isPortrait} appHeight={height} appWidth={width} source={Logo} />
        <Login />
      </Container>
    </Page>
  );
}
