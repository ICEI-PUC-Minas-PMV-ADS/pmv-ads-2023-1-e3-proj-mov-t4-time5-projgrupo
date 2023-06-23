import { useEffect, useState } from 'react'

import { useAuth } from "@app/Auth/provider/AuthProvider";
import { Text, Button, Input } from "@lib/components";
import { Register } from '../Register/Register';

import { ButtonsContainer, Container, FormContainer } from "./Login.style";

export function Login() {
  const { Login } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [justRendered, setJustRendered] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');

  const handleLogin = async ({ email, password }: { email: string, password: string }) => {
    if (email.length < 6 || password.length < 6) {
      setIsValid(false);
      return;
    }
    setIsValid(true);
    await Login({ email, password }).then((user) => {
      setTimeout(() => {
        if (!user) {
          setIsValid(false);
          setMessage("Email ou senha incorretos.");
        }
      }, 2000);
    });
  }

  useEffect(() => {
    if (email.length > 5 && password.length > 5) {
      if (justRendered) {
        setJustRendered(false);
      }
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    if (!isValid && !justRendered) setMessage("Favor inserir credenciais válidas.");
  }, [email, password])

  return (
    <Container>
      <FormContainer>
        <Text small variant='white'>Email</Text>
        <Input
          placeholder="E-mail"
          onChangeText={(e) => setEmail(e)}
          value={email}
          keyboardType="email-address"
          textContentType='emailAddress'
        />
        <Text small variant='white'>Senha</Text>
        <Input
          placeholder="Senha"
          textContentType='password'
          onChangeText={e => setPassword(e)}
          value={password}
          secureTextEntry
        />
        <Text variant='text'>{message}</Text>
        <ButtonsContainer>
          <Button
            onPress={() => setIsVisible(true)}
            color="transparent"
            paddingHorizontal='0'
          >
            <Text weight="bold" variant='white' marginHorizontal={0}>Registre-se</Text>
          </Button>
          <Text marginHorizontal={8}>ou</Text>
          <Button onPress={() => handleLogin({ email, password })} disabled={!isValid}>
            <Text weight="bold" variant='white'>Entre</Text>
          </Button>
        </ButtonsContainer>
      </FormContainer>
      <Register
        visible={isVisible}
        email={email}
        password={password}
        close={() => setIsVisible(false)}
      />
    </Container>
  );
}
