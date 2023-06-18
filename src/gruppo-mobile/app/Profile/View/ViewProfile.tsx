import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Text } from "../../../lib/components";
import { AuthService } from "../../Auth/provider/service/AuthService";

import PersonIcon from "../../../assets/images/user-icon.png";


export default function ViewProfile() {
  //@ts-ignore
  const { params: { token } } = useRoute();
  const [person, setPerson] = useState(null);
  const client = AuthService.getInstance();

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
    <View>
      {person && (<Person token={token} {...person} />)}
    </View>
  );
}

interface IPerson {
  firstName: string,
  lastName: string,
  email: string
  token: string,
}

function Person({ firstName, lastName, email, token }: IPerson) {
  const navigation = useNavigation()
  return (
    <View>
      <Image source={PersonIcon} />
      <Text>{firstName}</Text>
      <Text>{lastName}</Text>
      <Text>{email}</Text>
      <TouchableOpacity

        //@ts-ignore
        onPress={() => navigation.navigate("EditUserScreen", { token })}
      >
        <Text>Atualizar informações</Text>
      </TouchableOpacity>
    </View>
  )
}
