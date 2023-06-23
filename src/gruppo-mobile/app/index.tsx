import { ButtonLink } from '@lib/components/Form/ButtonLink';
import { Header } from '@lib/components/Header/Header';
import Env from '@lib/constants/Env';
import { useEffect, useState } from 'react';
import { StatusBar, Platform } from 'react-native';
import styled from 'styled-components/native';

import { Text } from '../lib/components';
import { ScrollView } from './Auth/components/Register/Register.style';
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
  padding: 20px 0;
`;

const ViewLeft = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 0;
`;

export default function HomeScreen() {
  const { user } = useAuth();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetch(Env.API_URL + '/users')
      .then(response => response.json())
      .then(json => setUsers(json))
  }, [])

  return (
    <Page>
      <Header title={user.firstName} />
      <View>
        <Text align='left'>Veja quem são os outros usuários:</Text>
        <ScrollView>
          <ViewLeft>
            {
              users.map((user) => (
                <ButtonLink variant='alt' href={"Profile/" + user?.id} radius={'0'}>
                  <Text variant='white'>{user?.firstName} {user?.lastName}</Text>
                  <Text> | </Text>
                  <Text small>{user?.email}</Text>
                </ButtonLink>
              ))
            }
          </ViewLeft>
        </ScrollView>
      </View>
    </Page>
  );
}
