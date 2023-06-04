import { useNavigation } from "expo-router"
import { Formik } from "formik"
import { TextInput, TouchableOpacity } from "react-native"

import { Text, View } from "../../../../lib/components"
import { Page } from "../../../../lib/components/Page"
import { AuthService } from "../../provider/service/AuthService"

export function Sigin() {
  const navigation = useNavigation()
  const client = AuthService.getInstance()
  const handleSignup = async ({ firstName, lastName, email, password, confirmedPassword }: any) => {
    if (!firstName || !lastName || !email || !password || !password || !confirmedPassword) return alert("Por favor, preencha todos os campos.")

    if (password !== confirmedPassword) return alert("A senha e sua confirmação não conferem!")

    try {
      const response = await client.postSignup({ firstName, lastName, email, password })
      if (response.status === 201) {
        const { data: { access_token: token } } = await client.postLogin({ email, password })
        //@ts-ignore
        navigation.navigate('ProfileScreen', { token })
      }
    } catch (e: any) {
      console.log(e.message)
    }
  }

  return (
    <Page>
      <View>
        <Text>Registro</Text>
        <Formik
          initialValues={{ firstName: '', lastName: '', email: '', password: '', confirmedPassword: '' }}
          onSubmit={handleSignup}
          validate={values => {
            const errors: any = {};
            const invalid: any = {};
            if (!values.email) {
              invalid.email = true;
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Email inválido!';
              invalid.email = true;
            }
            if (!values.password) {
              invalid.password = true;
            } else if (values.password.length < 6) {
              errors.password = 'Insira no mínimo 6 caracteres.';
            } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/i.test(values.password)) {
              errors.password = 'Senha fraca! Adicione letras maiúsculas, minúsculas e números.';
            }
            return { errors, invalid }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <TextInput
                placeholder="Nome"
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
                keyboardType="default"
              />
              <TextInput
                placeholder="Sobrenome"
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                value={values.lastName}
                keyboardType="default"
              />
              <TextInput
                placeholder="E-mail"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              <TextInput
                placeholder="Senha"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
              />
              <TextInput
                placeholder="Confirme sua senha"
                onChangeText={handleChange('confirmedPassword')}
                onBlur={handleBlur('confirmedPassword')}
                value={values.confirmedPassword}
                secureTextEntry
              />
              <TouchableOpacity
                //@ts-ignore
                onPress={handleSubmit}
              >
                <Text>Cadastrar-se</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </Page>
  );
}
