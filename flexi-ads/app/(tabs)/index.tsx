import { Image } from "expo-image";
import { Platform, StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link, router } from "expo-router";
import { Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeToken, removeMemberId, removeBusinessId } from "@/utils/utility";
import images from "@/constants/images";

export default function HomeScreen() {
  const handleLogout = async () => {
    try {
      await removeToken();
      await removeMemberId();
      await removeBusinessId();
      await AsyncStorage.removeItem("userId");
      await AsyncStorage.removeItem("isLoggedIn");
      router.replace("/(auth)/login");
    } catch (e) {
      console.error("Logout error:", e);
    }
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<Image source={images.logo} style={styles.reactLogo} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Flexi Ads!</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <Link href="/createProduct">
          <Link.Trigger>
            <ThemedText type="subtitle">Step 1: Create Product</ThemedText>
          </Link.Trigger>
          <Link.Preview />
        </Link>

        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>

      <Pressable
        onPress={handleLogout}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#0ee9c1" : "#0ce9b2",
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 10,
            alignSelf: "flex-start",
          },
        ]}
      >
        <ThemedText type="defaultSemiBold" style={{ color: "#fff" }}>
          Logout
        </ThemedText>
      </Pressable>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
