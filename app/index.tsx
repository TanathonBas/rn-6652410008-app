import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

const YELLOW = "#FFD700";
const LIGHT_YELLOW = "#FFE082"; // สีเหลืองอ่อนกว่าพื้นหลัง แต่ไม่ใช่สีขาว
const DARK_GRAY = "#333333";

export default function SplashScreenComponent() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/calculator");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={{ flex: 1, backgroundColor: YELLOW }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 24,
        }}
      >
        <View
          style={{
            backgroundColor: LIGHT_YELLOW,
            borderRadius: 20,
            paddingVertical: 32,
            paddingHorizontal: 40,
            alignItems: "center",
            alignSelf: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <View
            style={{
              width: 80,
              height: 100,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <Image
              source={require("../assets/images/taxi.png")}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "800",
              color: DARK_GRAY,
              marginBottom: 8,
              fontFamily: "Kanit_800ExtraBold",
            }}
          >
            TAXI METER
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: DARK_GRAY,
              marginBottom: 40,
              fontFamily: "Kanit_400Regular",
            }}
          >
            THAI FARE CALCULATOR
          </Text>
          <ActivityIndicator size="small" color="#22c55e" />
        </View>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userInfoText}>ID: 6652410008</Text>
        <Text style={styles.userInfoText}>NAME: Tanathon Thipawanyasathien</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userInfo: {
    marginTop: 20,
    alignItems: "center",
    gap: 8,
    fontWeight: "bold",
  },
  userInfoText: {
    fontSize: 14,
    color: DARK_GRAY,
    opacity: 0.8,
    fontFamily: "Kanit_400Regular",
  },
})