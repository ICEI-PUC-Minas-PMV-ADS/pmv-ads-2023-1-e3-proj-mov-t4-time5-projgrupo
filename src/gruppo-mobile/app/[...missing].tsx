import { Link, Stack } from 'expo-router';


import { Text, View } from '../lib/components';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View>
        <Text>This screen doesn't exist.</Text>
        <Link href="index">
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
