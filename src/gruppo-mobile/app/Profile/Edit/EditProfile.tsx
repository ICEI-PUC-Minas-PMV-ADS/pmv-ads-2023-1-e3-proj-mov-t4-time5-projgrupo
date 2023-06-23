import { AxiosError } from "axios";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import { Formik } from "formik";

import { AuthService } from "../../Auth/provider/service/AuthService";
import { Text } from "../../../lib/components";


export default function EditProfileScreen() {
  //@ts-ignore
  const { params: { token } } = useRoute();
  const client = AuthService.getInstance();
  const [person, setPerson] = useState({ id: '', firstName: '', lastName: '' })
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

  const handleEditUserInfo = async ({ firstName, lastName }: { firstName: string | null, lastName: string | null }) => {
    if (!firstName && !lastName) return alert('Desistiu de fazer as alterações?')

    try {
      const response = await client.putEditUser(person.id, { firstName, lastName }, token)
      console.log(response.status)
      if (response.status === 201) {
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
    <View>
      <Formik
        initialValues={{ firstName: person.firstName, lastName: person.lastName }}
        onSubmit={handleEditUserInfo}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <Text>Edite as informações do seu usuário</Text>
            <TextInput
              placeholder="nome"

              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              value={values.firstName}
              keyboardType="default"
            />
            <TextInput
              placeholder="sobrenome"

              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              value={values.lastName}
              keyboardType="default"
            />
            <TouchableOpacity

              //@ts-ignore
              onPress={handleSubmit}
            >
              <Text>Confirmar alteração</Text>
            </TouchableOpacity>
            <TouchableOpacity

              //@ts-ignore
              onPress={() => navigation.goBack()}
            >
              <Text >Cancelar</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
}
