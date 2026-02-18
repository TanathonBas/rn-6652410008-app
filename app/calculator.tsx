import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { calculateFare } from "../utils/fareCalculator";

const YELLOW = "#FFD700";
const DARK_GRAY = "#333333";
const GREEN = "#22c55e";

export default function CalculatorScreen() {
  const router = useRouter();
  const [distance, setDistance] = useState("0");
  const [waitMinutes, setWaitMinutes] = useState("0");
  const [fareDetails, setFareDetails] = useState({
    total: 0,
    distanceCharge: 0,
    timeCharge: 0,
  });

  const onCalculate = () => {
    const result = calculateFare(distance, waitMinutes);
    setFareDetails(result);
  };

  const onClear = () => {
    setDistance("0");
    setWaitMinutes("0");
    setFareDetails({ total: 0, distanceCharge: 0, timeCharge: 0 });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}
      >
      </Pressable>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topSection}>
          <View style={styles.taxiBox}>
            <Image
              source={require("../assets/images/taxi.png")}
              style={styles.taxiImage}
            />
          </View>
          <Text style={styles.title}>คำนวณค่าแท็กซี่</Text>
          <View style={styles.inputRow}>
            <Text style={styles.label}>ระยะทาง (กิโลเมตร)</Text>
            <TextInput
              style={styles.input}
              value={distance}
              onChangeText={setDistance}
              keyboardType="decimal-pad"
              placeholder="0"
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>เวลารถติด (นาที)</Text>
            <TextInput
              style={styles.input}
              value={waitMinutes}
              onChangeText={setWaitMinutes}
              keyboardType="number-pad"
              placeholder="0"
            />
          </View>
          <View style={styles.buttonRow}>
            <Pressable style={styles.btnCalculate} onPress={onCalculate}>
              <Text style={styles.btnCalculateText}>คำนวณ</Text>
            </Pressable>
            <Pressable style={styles.btnClear} onPress={onClear}>
              <Text style={styles.btnClearText}>ล้างค่า</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.resultSection}>
          <View style={styles.fareCard}>
            <Text style={styles.fareCardTitle}>ค่าโดยสารโดยประมาณ</Text>
            <View style={styles.fareTotalContainer}>
              <Text style={styles.fareValue}>{fareDetails.total.toFixed(2)}</Text>
              <Text style={styles.fareUnit}>บาท</Text>
            </View>
            <View style={styles.fareBreakdown}>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>ค่าโดยสารตามระยะทาง</Text>
                <Text style={styles.breakdownValue}>{fareDetails.distanceCharge.toFixed(2)} B</Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>ค่ารถติด (นาที)</Text>
                <Text style={styles.breakdownValue}>{fareDetails.timeCharge.toFixed(2)} B</Text>
              </View>
            </View>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userInfoText}>ID: 6652410008</Text>
            <Text style={styles.userInfoText}>NAME: Tanathon Thipawanyasathien</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 48,
    left: 16,
    zIndex: 10,
    padding: 8,
    backgroundColor: "#e5e5e5",
    borderRadius: 8,
  },
  scrollContent: { flexGrow: 1 },
  topSection: {
    backgroundColor: "#e5e5e5",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    alignItems: "center",
  },
  taxiBox: {
    width: 100,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  taxiImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: YELLOW,
    marginBottom: 24,
    textAlign: "center",
    fontFamily: "Kanit_700Bold",
  },
  inputRow: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: DARK_GRAY,
    marginBottom: 6,
    fontFamily: "Kanit_400Regular",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 18,
    fontFamily: "Kanit_400Regular",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 8,
    width: "100%",
  },
  btnCalculate: {
    flex: 1,
    backgroundColor: GREEN,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
  },
  btnCalculateText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Kanit_700Bold",
  },
  btnClear: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#dc2626",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  btnClearText: {
    color: "#dc2626",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Kanit_600SemiBold",
  },
  resultSection: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: "center",
    minHeight: 200,
  },
  fareCard: {
    backgroundColor: "#2D2D32",
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 28,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  fareCardTitle: {
    fontSize: 16,
    color: "#F0F0F0",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "500",
    fontFamily: "Kanit_500Medium",
  },
  fareTotalContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    marginBottom: 24,
  },
  fareValue: {
    fontSize: 48,
    fontWeight: "800",
    color: YELLOW,
    fontFamily: "Kanit_800ExtraBold",
  },
  fareUnit: {
    fontSize: 20,
    color: YELLOW,
    marginLeft: 8,
    fontWeight: "600",
    fontFamily: "Kanit_600SemiBold",
  },
  fareBreakdown: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    paddingTop: 20,
    gap: 16,
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  breakdownLabel: {
    fontSize: 14,
    color: "#F0F0F0",
    flex: 1,
    fontFamily: "Kanit_400Regular",
  },
  breakdownValue: {
    fontSize: 14,
    color: "#F0F0F0",
    fontWeight: "500",
    fontFamily: "Kanit_500Medium",
  },
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
});
