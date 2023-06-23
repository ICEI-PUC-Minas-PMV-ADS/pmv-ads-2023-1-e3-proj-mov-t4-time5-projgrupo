import { Page, Text } from "@lib/components";
import { Stack } from "expo-router";

export default function ProfileScreen() {
  return (
    <Page>
      <Stack>
        <Stack.Screen name="[id]" options={{ headerShown: false }} />
        <Stack.Screen name="Edit/EditProfile" options={{ headerShown: false }} />
      </Stack>
    </Page>
  );
}
