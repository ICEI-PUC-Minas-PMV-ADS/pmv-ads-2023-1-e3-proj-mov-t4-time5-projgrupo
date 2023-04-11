import {Alert, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { Text, View } from '../../components/Themed';
import React, {useState} from "react";
import {client} from "../../clients";

const handleSignup = async({firstName, lastName, email, password, confirmedPassword}: any) => {
    if(!firstName|| !lastName || !email || !password || !password || !confirmedPassword) return Alert.alert("Por favor, preencha todos os campos.")

    if(password !== confirmedPassword) return Alert.alert("A senha e sua confirmação não conferem!")

    try{
        const response = await client.postSignup({firstName, lastName, email, password, confirmedPassword})
        if(response.status === 201){
            const {data} = await client.postLogin({email, password})
            console.log(data)
        }
    }catch(e: any){
        console.log(e.message)
    }
}

export default function SignupScreen() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    return (
      <View style={styles.container}>
        <View >
          <Text style={styles.title}>Registro</Text>
          <Text>Nome</Text>
          <TextInput
              style={styles.textBox}
              selectionColor={"gray"}
              placeholder="Seu nome"
              onChangeText={newFirstName => setFirstName(newFirstName)}
              defaultValue={firstName}
          />
        </View>
          <View >
              <Text>Sobrenome</Text>
              <TextInput
                  style={styles.textBox}
                  selectionColor={"gray"}
                  placeholder="Seu sobrenome"
                  onChangeText={newLastName => setLastName(newLastName)}
                  defaultValue={lastName}
              />
          </View>
        <View>
          <Text>Email</Text>
          <TextInput
              style={styles.textBox}
              selectionColor={"gray"}
              placeholder="email@email.com"
              onChangeText={newEmail => setEmail(newEmail)}
              defaultValue={email}
          />
        </View>
        <View>
          <Text>Senha</Text>
          <TextInput
              style={styles.textBox}
              secureTextEntry={true}
              selectionColor={"gray"}
              placeholder="Sua senha forte"
              onChangeText={newPassword => setPassword(newPassword)}
              defaultValue={password}
          />
        </View>
        <View>
          <Text>Confirmação de Senha</Text>
          <TextInput
              style={styles.textBox}
              secureTextEntry={true}
              selectionColor={"gray"}
              placeholder="Confirmação de sua senha"
              onChangeText={newConfirmedPassword => setConfirmedPassword(newConfirmedPassword)}
              defaultValue={confirmedPassword}
          />
        </View>
        <TouchableOpacity
            style={styles.signupButton}
            onPress={() => handleSignup({firstName, lastName, email, password, confirmedPassword})}
        >
          <Text>Cadastrar</Text>
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
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 52
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
    borderRadius: 8
  },
    signupButton: {
        width: 200,
        height: 40,
        backgroundColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        margin: 10,
    },
});
