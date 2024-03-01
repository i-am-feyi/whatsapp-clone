import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import welcomeImage from "@/assets/images/welcome.png";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
const welcome_image = Image.resolveAssetSource(welcomeImage).uri;

const Page = () => {
  const openLink = (link: string) => {
    if (link === "terms") {
      Linking.openURL("https://www.whatsapp.com/legal/terms-of-service-eea");
    }
    if (link === "policy") {
      Linking.openURL("https://www.whatsapp.com/legal/privacy-policy-eea");
    }
  };
  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Image source={{ uri: welcome_image }} style={styles.welcome} />
        <Text style={styles.headline}>Welcome to Whatsapp</Text>
        <Text style={styles.description}>
          Read our{" "}
          <Text style={styles.link} onPress={() => openLink("policy")}>
            Privacy Policy
          </Text>
          . Tap "Agree and Continue" to accept the{" "}
          <Text style={styles.link} onPress={() => openLink("terms")}>
            Terms of Service
          </Text>
          .
        </Text>
        <Link href={"/otp"} replace asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Agree & Continue</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  welcome: {
    width: "100%",
    height: 400,
    padding: 20,
    marginBottom: 80,
  },
  headline: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  description: {
    color: Colors.gray,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 80,
  },
  link: {
    color: Colors.primary,
  },
  button: {
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 22,
    color: Colors.primary,
    fontWeight: "bold",
    marginBottom: 80,
  },
});
