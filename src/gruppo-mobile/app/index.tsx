import { Button } from '@lib/components/Form/Button';
import { StatusBar, Platform } from 'react-native';
import styled from 'styled-components/native';

import { Text } from '../lib/components';
import { useAuth } from './Auth/provider/AuthProvider';

const Page = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  padding-top: ${Platform.OS === "android" ? StatusBar.currentHeight : 0}px;
  background-color: ${({ theme }) => theme.color.background.alt};
`;

const View = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

export default function HomeScreen() {
  const { user, Logout } = useAuth();
  return (
    <Page>
      <View>
        <Text>Hello {user.firstName}!</Text>
        <Button onPress={Logout}>
          <Text>Sair</Text>
        </Button>
      </View>
    </Page>
  );
}
