import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Text, View} from '../../components/Themed';
import React from "react";
import {client} from "../../clients";
import {Formik} from "formik";
import {useNavigation} from "expo-router";

export default function SignupScreen() {
    const navigation = useNavigation()
    const handleSignup = async ({firstName, lastName, email, password, confirmedPassword}: any) => {
        if (!firstName || !lastName || !email || !password || !password || !confirmedPassword) return alert("Por favor, preencha todos os campos.")

        if (password !== confirmedPassword) return alert("A senha e sua confirmação não conferem!")

        try {
            const response = await client.postSignup({firstName, lastName, email, password, confirmedPassword})
            if (response.status === 201) {
                const {data: {id}} = await client.postLogin({email, password})
                //@ts-ignore
                navigation.navigate('ProfileScreen', {id})
            }
        } catch (e: any) {
            console.log(e.message)
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Registro</Text>
                <Formik
                    initialValues={{firstName: '', lastName: '', email: '', password: '', confirmedPassword: ''}}
                    onSubmit={handleSignup}
                >
                    {({handleChange, handleBlur, handleSubmit, values}) => (
                        <>
                            <TextInput
                                placeholder="nome"
                                style={styles.textBox}
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                                value={values.firstName}
                                keyboardType="default"
                            />
                            <TextInput
                                placeholder="sobrenome"
                                style={styles.textBox}
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                                value={values.lastName}
                                keyboardType="default"
                            />
                            <TextInput
                                placeholder="e-mail"
                                style={styles.textBox}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />
                            <TextInput
                                style={styles.textBox}
                                placeholder="senha"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry
                            />
                            <TextInput
                                style={styles.textBox}
                                placeholder="confirme sua senha"
                                onChangeText={handleChange('confirmedPassword')}
                                onBlur={handleBlur('confirmedPassword')}
                                value={values.confirmedPassword}
                                secureTextEntry
                            />
                            <TouchableOpacity
                                style={styles.signupButton}
                                //@ts-ignore
                                onPress={handleSubmit}
                            >
                                <Text>Cadastrar-se</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </Formik>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 36
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    textBox: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        marginTop: 10
    },
    signupButton: {
        width: 200,
        height: 40,
        backgroundColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginTop: 10
    },
});
