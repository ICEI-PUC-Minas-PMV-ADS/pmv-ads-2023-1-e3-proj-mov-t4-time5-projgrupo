import styled from "styled-components/native";

const Splash = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

export function SplashScreen() {
  return (
    <Splash>
      <Text>Loading...</Text>
    </Splash>
  );
}
