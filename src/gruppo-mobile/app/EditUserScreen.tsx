import {Text} from "../components/Themed";
import {StyleSheet, View, TouchableOpacity, TextInput} from "react-native";
import React, {useEffect, useState} from "react";
import {Formik} from "formik";
import {client} from "../clients";
import {AxiosError} from "axios";
import {useRoute} from "@react-navigation/native";
import {useNavigation} from "expo-router";

export default function EditUserScreen() {
    //@ts-ignore
    const {params: {token}} = useRoute();
    const [person, setPerson] = useState({id: '', firstName: '', lastName: ''})
    const navigation = useNavigation()

    useEffect(() => {
        client.getProfile(token)
            //@ts-ignore
            .then(response => {
                console.log(response.data)
                setPerson(response.data)
            })
            .catch()
    }, [])

    const handleEditUserInfo = async ({firstName, lastName}: { firstName: string | null, lastName: string | null }) => {
        if (!firstName && !lastName) return alert('Desistiu de fazer as alterações?')

        try {
            const response = await client.putEditUser(person.id, {firstName, lastName}, token)
            console.log(response.status)
            if(response.status === 201){
                alert("Informações alteradas com sucesso.")
            }
            // @ts-ignore
            // @ts-ignore
        } catch (e: AxiosError) {
            if (e.response.status) return alert("Usuário não encontrado.")
            return alert(e.message)
        }
    }
    return (
        <View style={styles.container}>
            <Formik
                initialValues={{firstName: person.firstName, lastName: person.lastName}}
                onSubmit={handleEditUserInfo}
            >
                {({handleChange, handleBlur, handleSubmit, values}) => (
                    <>
                        <Text style={styles.title}>Edite as informações do seu usuário</Text>
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
                        <TouchableOpacity
                            style={styles.button}
                            //@ts-ignore
                            onPress={handleSubmit}
                        >
                            <Text style={styles.buttonText}>Confirmar alteração</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.greyButton}
                            //@ts-ignore
                            onPress={()=> navigation.goBack()}
                        >
                            <Text >Cancelar</Text>
                        </TouchableOpacity>
                    </>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 200,
        height: 40,
        backgroundColor: "#0E96EA",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginTop: 10,
    },
    greyButton: {
        width: 200,
        height: 40,
        backgroundColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginTop: 10
    },
    buttonText: {
        color: "#fff"
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
        marginBottom: 36
    },
})
