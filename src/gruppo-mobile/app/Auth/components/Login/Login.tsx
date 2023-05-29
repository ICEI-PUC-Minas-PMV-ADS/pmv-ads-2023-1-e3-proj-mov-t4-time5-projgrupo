import { Button } from "@lib/components/Form/Button";
import { Input } from "@lib/components/Form/Input";
import { Formik } from "formik";

import { Text, View } from "../../../../lib/components";
import { useAuth } from "../../provider/AuthProvider";
import { Container, FormContainer } from "./Login.style";

export function Login() {
  const { Login } = useAuth();

  const handleLogin = async ({ email, password }: { email: string | null, password: string | null }) => {
    try {
      await Login({ email, password });
    } catch (e: any) {
      return alert(e)
    }
  }
  // @ts-ignore
  return (
    <Container>
      <FormContainer style={{backgroundColor: '#00000000'}}>
        <Text asTitle weight="bold">Login</Text>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleLogin}
          validate={values => {
            const errors: any = {};
            if (!values.email) {
              errors.email = true;
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = true;
            }
            if (!values.password) {
              errors.password = true;
            }
            return errors;
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, errors, values }) => (
            <>
              <Input
                placeholder="E-mail"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              <Text small>{errors?.email}</Text>
              <Input
                placeholder="Senha"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
              />
              <Text small>{errors?.password}</Text>
              <Button
                //@ts-ignore
                onPress={handleSubmit}
              >
                <Text weight="bold" style={{color: 'white'}}>Login</Text>
              </Button>
            </>
          )}
        </Formik>
      </FormContainer>
    </Container>
  );
}
