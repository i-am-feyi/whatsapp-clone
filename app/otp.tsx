import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import MaskInput from "react-native-mask-input";
import {
  SafeAreaFrameContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const otp = () => {
  const { top, bottom } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();
  const keyboardVerticalOffset = Platform.OS === "ios" ? 90 : 0;

  const openLink = (link: string) => {
    if (link === "terms") {
      Linking.openURL("https://www.whatsapp.com/legal/terms-of-service-eea");
    }
    if (link === "policy") {
      Linking.openURL("https://www.whatsapp.com/legal/privacy-policy-eea");
    }
  };

  const sendOTP = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(`/verify/${phoneNumber}`);
    }, 5);
  };

  const trySignIn = () => {};

  const TR_PHONE = [
    `+`,
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={{ flex: 1, marginBottom: bottom }}
      behavior="padding"
    >
      <View style={styles.container}>
        {loading && (
          <View style={[StyleSheet.absoluteFill, styles.loading]}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={{ fontSize: 18, padding: 10 }}>
              Requesting an SMS...
            </Text>
          </View>
        )}
        <Text style={styles.description}>
          WhatsApp will need to verify your account. Carrier charges may apply.
        </Text>

        <View style={styles.list}>
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>Turkey</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              style={{ color: Colors.lightGray }}
            />
          </View>
          <View style={styles.separator} />
          <MaskInput
            value={phoneNumber}
            style={styles.input}
            inputMode="numeric"
            autoFocus
            placeholder="+90 your phone number"
            onChangeText={(masked) => {
              setPhoneNumber(masked);
            }}
            mask={TR_PHONE}
          />
        </View>

        <Text style={styles.legal}>
          You must be{" "}
          <Text style={styles.link} onPress={() => openLink("policy")}>
            at least 16 years old{" "}
          </Text>
          to register. Learn how WhatsApp works with the{" "}
          <Text style={styles.link} onPress={() => openLink("terms")}>
            Meta companies
          </Text>
          .
        </Text>
        <View style={{ flex: 1 }} />

        <TouchableOpacity
          style={[styles.button, phoneNumber !== "" ? styles.enabled : null]}
          onPress={sendOTP}
          disabled={phoneNumber === ""}
        >
          <Text
            style={[
              styles.buttonText,
              phoneNumber !== "" ? styles.enabled : null,
            ]}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default otp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.background,
    gap: 20,
  },
  description: {
    color: Colors.gray,
    fontSize: 16,
    textAlign: "left",
  },
  list: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 20,
    borderRadius: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 6,
    marginBottom: 10,
  },
  listItemText: {
    color: Colors.primary,
    fontSize: 18,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    width: "100%",
    backgroundColor: Colors.gray,
    opacity: 0.5,
  },
  link: {
    color: Colors.primary,
  },
  legal: {
    color: Colors.gray,
    fontSize: 12,
    textAlign: "center",
  },
  button: {
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 22,
    color: Colors.gray,
    fontWeight: "500",
  },
  enabled: {
    backgroundColor: Colors.primary,
    color: "#fff",
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    fontSize: 16,
    padding: 6,
    marginTop: 10,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
