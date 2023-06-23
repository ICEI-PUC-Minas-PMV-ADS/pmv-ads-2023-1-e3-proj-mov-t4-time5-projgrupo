import React, { useEffect, useState } from "react"
import type { ModalProps } from "react-native"

import { BR, HR } from "@lib/components/Spacer"
import { Button, Input, Text } from "@lib/components"
import { AuthService } from "../../provider/service/AuthService"

import { Container, FormContainer, Modal, Overlay, ScrollView, ModalWrapper } from "./Register.style"
import { useAuth } from "@app/Auth/provider/AuthProvider"

interface RegisterProps extends ModalProps {
  email?: string
  password?: string
  close: () => void
}

export function Register({ close, email = '', password = '', ...props }: RegisterProps) {
  const { Login, user } = useAuth();
  const client = AuthService.getInstance()
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [emailInput, setEmailInput] = useState<string>(email)
  const [passwordInput, setPasswordInput] = useState<string>(password)
  const [confirmedPassword, setConfirmedPassword] = useState<string>('')
  const [invalid, setInvalid] = useState<boolean>(true)
  const [message, setMessage] = useState<string>('')

  const handleSignup = async () => {
    if (firstName && lastName && emailInput && passwordInput && confirmedPassword) {
      const isValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(emailInput)
      if (!isValid) {
        setMessage('Por favor, insira um email válido.')
        setInvalid(true)
      } else {
        setInvalid(false)
        setMessage('')
      }
    }
    else {
      setMessage("Por favor, preencha todos os campos.")
      return;
    }
    await client.postSignup({ firstName, lastName, email: emailInput, password: passwordInput }).then(async (res) => {
      if (res.status === 201) {
        await Login({ email: emailInput, password: passwordInput });
      } else {
        setMessage(res.data.message)
      }
    }).catch((err) => {
      setMessage('Email já cadastrado. Você esqueceu sua senha?')
    });
  }

  useEffect(() => {
    if (user) close();
  }, [user])

  useEffect(() => {
    if (firstName.length > 0
      && lastName.length > 0
      && emailInput.length > 0
      && passwordInput.length > 0
      && confirmedPassword.length > 0
      && (passwordInput === confirmedPassword)
    ) {
      const isValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(emailInput)
      if (!isValid) {
        setMessage('Por favor, insira um email válido.')
        setInvalid(true)
      } else {
        setInvalid(false)
      }
    }
  }, [firstName, lastName, emailInput, passwordInput, confirmedPassword])

  return (
    <Modal {...props} onRequestClose={close} transparent>
      <Overlay onPress={close} />
      <Container>
        <ModalWrapper>
          <ScrollView>
            <FormContainer>
              <Text asTitle variant="text" marginHorizontal={0}>Cadastro</Text>
              <HR />
              <Text small variant="white">Nome</Text>
              <Input
                placeholder="Nome"
                onChangeText={e => setFirstName(e)}
                value={firstName}
                keyboardType="default"
                textContentType="name"
              />
              <Text small variant="white">Sobrenome</Text>
              <Input
                placeholder="Sobrenome"
                onChangeText={(e) => setLastName(e)}
                value={lastName}
                keyboardType="default"
                textContentType="familyName"
              />
              <Text small variant="white">Email</Text>
              <Input
                placeholder="E-mail"
                onChangeText={(e) => setEmailInput(e)}
                value={emailInput}
                keyboardType="email-address"
                textContentType="emailAddress"
              />
              <Text small variant="white">Senha</Text>
              <Input
                placeholder="Senha"
                onChangeText={(e) => setPasswordInput(e)}
                value={passwordInput}
                secureTextEntry
                textContentType="password"
              />
              <Text small variant="white">Confirmar Senha</Text>
              <Input
                placeholder="Confirme sua senha"
                onChangeText={(e) => setConfirmedPassword(e)}
                value={confirmedPassword}
                secureTextEntry
              />
              <Text small variant="text">{message}</Text>
              <BR />
              <Button
                onPress={handleSignup}
                disabled={invalid}
              >
                <Text variant="white">Confirmar</Text>
              </Button>
              <BR />
            </FormContainer>
          </ScrollView>
        </ModalWrapper>
      </Container>
    </Modal>

  );
}
