import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AppLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="add-parcel" options={{ presentation: "modal" }} />
        <Stack.Screen name="add-ramassage" options={{ presentation: "modal" }} />
      </Stack>
    </>
  );
}