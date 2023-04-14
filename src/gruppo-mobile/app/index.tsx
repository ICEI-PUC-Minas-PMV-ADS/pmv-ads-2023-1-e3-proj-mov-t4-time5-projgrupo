import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import {Link} from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Link href="/(tabs)/SignupScreen" style={styles.link}>
        <Text style={styles.linkText}>Registre-se agora!</Text>
      </Link>
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
