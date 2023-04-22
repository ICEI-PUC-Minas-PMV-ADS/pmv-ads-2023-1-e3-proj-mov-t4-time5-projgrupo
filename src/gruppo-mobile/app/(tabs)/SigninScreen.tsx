import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Text, View} from '../../components/Themed';
import React from "react";
import {client} from "../../clients";
import {Formik} from 'formik'
import {AxiosError} from "axios";
import {useNavigation} from "expo-router";




export default function TabOneScreen() {
    const navigation = useNavigation()
    const handleLogin = async ({email, password}: { email: string | null, password: string | null }) => {
        if (!email) return alert('O email não pode ser vazio.')
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) return alert('O formato do email é inválido.');

        try {
            const { data: { id } } = await client.postLogin({ email, password })
            // @ts-ignore
            navigation.navigate('ProfileScreen', { id })
            // @ts-ignore
        } catch (e: AxiosError) {
            if(e.response.status) return alert("Usuário não encontrado.")
        }
    }
    // @ts-ignore
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.textBoxContainer}>
                <Formik
                    initialValues={{email: '', password: ''}}
                    onSubmit={handleLogin}
                >
                    {({handleChange, handleBlur, handleSubmit, values}) => (
                        <>
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
                            <TouchableOpacity
                                style={styles.loginButton}
                                onPress={handleSubmit}
                            >
                                <Text>Submit</Text>
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
    textBoxContainer: {
        margin: 10
    },
    loginButton: {
        width: 200,
        height: 40,
        backgroundColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginTop: 10
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 52
    },
});
