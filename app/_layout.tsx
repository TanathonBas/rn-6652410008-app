import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Kanit_400Regular, Kanit_500Medium, Kanit_600SemiBold, Kanit_700Bold, Kanit_800ExtraBold } from "@expo-google-fonts/kanit";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Kanit_400Regular,
    Kanit_500Medium,
    Kanit_600SemiBold,
    Kanit_700Bold,
    Kanit_800ExtraBold,
  });

  // ไม่ hide SplashScreen ที่นี่ ให้หน้า index.tsx จัดการเอง
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
