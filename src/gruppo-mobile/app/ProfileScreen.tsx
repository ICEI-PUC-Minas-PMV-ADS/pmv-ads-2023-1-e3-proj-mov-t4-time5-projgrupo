import {Text} from "../components/Themed";
import {StyleSheet, View, Image, TouchableOpacity} from "react-native";
import {useRoute} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import {client} from "../clients";
import {useNavigation} from "expo-router";

export default function ProfileScreen() {
    //@ts-ignore
    const {params: {token}} = useRoute();
    const [person, setPerson] = useState(null)

    useEffect(() => {
        client.getProfile(token)
            //@ts-ignore
            .then(response => {
                setPerson(response.data)
            })
            .catch()
    }, [])

    // @ts-ignore
    return (
        <View style={styles.container}>
            {person && (<Person  token={token} { ...person} />)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        textAlign: "center",
    },
    imagePlaceHolder: {
        width: 100,
        height: 100,
        resizeMode: "center",
        alignSelf: "center"
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
    buttonText :{
        color: "#fff"
    }
})

interface IPerson {
    firstName: string,
    lastName: string,
    email
    token: string,
}

function Person({firstName, lastName, email, token }: IPerson ) {
    const navigation = useNavigation()
    return (
        <View>
            <Image source={require("../assets/images/user-icon.png")} style={styles.imagePlaceHolder}/>
            <Text style={styles.text}>{firstName}</Text>
            <Text style={styles.text}>{lastName}</Text>
            <Text style={styles.text}>{email}</Text>
            <TouchableOpacity
                style={styles.button}
                //@ts-ignore
                onPress={()=> navigation.navigate("EditUserScreen", { token })}
            >
                <Text style={styles.buttonText}>Atualizar informações</Text>
            </TouchableOpacity>
        </View>
    )
}
