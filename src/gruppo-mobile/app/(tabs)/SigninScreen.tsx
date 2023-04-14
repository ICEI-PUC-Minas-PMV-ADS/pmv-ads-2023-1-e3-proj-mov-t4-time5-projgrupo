import {Alert, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { Text, View } from '../../components/Themed';
import React, {useState} from "react";
import {client} from "../../clients";

const handleLogin = async(email: string, password: string) => {
  if(!email || !password){
    return Alert.alert("Por favor, preencha os campos de email e senha.")
  }
  try{
    const {data} = await client.postLogin({ email, password})
    console.log(data)
  }catch(e: any){
    console.log(e.message)
  }
}

export default function TabOneScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Login</Text>
      </View>
        <View style={styles.textBoxContainer}>
          <Text>Email</Text>
          <TextInput
              style={styles.textBox}
              selectionColor={"gray"}
              placeholder="email@teste.com"
              onChangeText={newEmail => setEmail(newEmail)}
              defaultValue={email}
          />
        </View>
        <View style={styles.textBoxContainer}>
          <Text>Senha</Text>
          <TextInput
              style={styles.textBox}
              secureTextEntry={true}
              selectionColor={"gray"}
              placeholder="senha"
              onChangeText={newPassword => setPassword(newPassword)}
              defaultValue={password}
          />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={() => handleLogin(email, password)}>
          <Text>Login</Text>
        </TouchableOpacity>
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
    margin: 10,
  },
  textBox: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 52
  },
});
