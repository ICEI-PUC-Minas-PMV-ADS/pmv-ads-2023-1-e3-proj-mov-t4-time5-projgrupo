import { Link, usePathname, useNavigation } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import styled from "styled-components/native";

import { HeaderContainer } from "./Header.styles";
import { HeaderMenu } from "./HeaderMenu/HeaderMenu";
import { Text } from "../Text";
import { useAuth } from "@app/Auth/provider/AuthProvider";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const { user } = useAuth();
  const navigation = useNavigation();



  return (
    <HeaderContainer>
      <Back>
        {navigation.canGoBack() && (
          <Link href="" onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </Link>)}
        <Link href={"/Profile/" + user.id}>
          <Text asTitle variant="white">{title}</Text>
          <Text asTitle small>{subtitle}</Text>
        </Link>
      </Back>
      <HeaderMenu />
    </HeaderContainer>
  )
}

export const Back = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
