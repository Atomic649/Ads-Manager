import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, Fonts } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import logo from "@/assets/images/logo.png";
import CallAPIUser from "@/api/auth_api";
import { saveBusinessId, saveMemberId, saveToken, saveUserId } from "@/utils/utility";


export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? "light"];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isDisabled = useMemo(
    () => isSubmitting || !email.trim() || !password.trim(),
    [email, password, isSubmitting]
  );

  const cardStyle = useMemo(
    () => [
      styles.card,
      {
        backgroundColor:
          colorScheme === "dark"
            ? "rgba(21, 23, 24, 0.94)"
            : "rgba(255, 255, 255, 0.92)",
        borderWidth: colorScheme === "dark" ? 1 : 0,
        borderColor: "rgba(255, 255, 255, 0.08)",
      },
    ],
    [colorScheme]
  );

  const inputStyle = useMemo(
    () => [
      styles.input,
      {
        borderColor: palette.tint,
        backgroundColor:
          colorScheme === "dark" ? "rgba(255,255,255,0.08)" : "#F8FAFC",
        color: palette.text,
      },
    ],
    [palette.tint, palette.text, colorScheme]
  );

  const handleLogin = async () => {
    console.log("🌟 handleLogin called");
    if (isDisabled) return;

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await CallAPIUser.loginAPI({ email, password });

      console.log("🌟 Login Response:", response);

      // Expecting backend to return { user, token }
      if (!response || !response.token || !response.user) {
        throw new Error("Invalid response from server.");
      }

      // Save token and user details
      await saveToken(response.token);
      await saveMemberId(String(response.user.memberId));
      await saveBusinessId(response.user.businessId);
      await saveUserId(response.user.id);
      await AsyncStorage.setItem("isLoggedIn", "true");
      if (response.user?.id != null) await saveUserId(response.user.id);
      if (response.user?.memberId != null) await saveMemberId(String(response.user.memberId));
      if (response.user?.businessId != null) await saveBusinessId(response.user.businessId);

      router.replace("/createProduct");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemedView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.select({ ios: "padding", default: undefined })}
        keyboardVerticalOffset={Platform.select({ ios: 80, default: 0 })}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          bounces={false}
        >
          <View style={cardStyle}>
            <Image
              source={logo}
              style={styles.logo}
              contentFit="contain"
            />
            <ThemedText
              type="title"
              style={[styles.title, { color: palette.text }]}
            >
              Welcome
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Sign in to continue managing your campaigns with Flexi Ads.
            </ThemedText>

            <View style={styles.formGroup}>
              <ThemedText type="defaultSemiBold">Email</ThemedText>
              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                placeholder="you@example.com"
                placeholderTextColor="#9BA1A6"
                selectionColor={palette.tint}
                style={inputStyle}
              />
            </View>

            <View style={styles.formGroup}>
              <ThemedText type="defaultSemiBold">Password</ThemedText>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password"
                placeholder="••••••••"
                placeholderTextColor="#9BA1A6"
                selectionColor={palette.tint}
                style={inputStyle}
              />
            </View>

            {errorMessage ? (
              <ThemedText style={[styles.errorText, { color: "#D92D20" }]}>
                {errorMessage}
              </ThemedText>
            ) : null}

            <Pressable
              onPress={handleLogin}
              disabled={isDisabled}
              style={({ pressed }) => [
                styles.button,
                {
                  backgroundColor: isDisabled ? "#9BA1A6" : palette.tint,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText type="defaultSemiBold" style={styles.buttonText}>
                  Sign in
                </ThemedText>
              )}
            </Pressable>

            <View style={styles.footer}>
              <ThemedText style={styles.footerText}>
                Need an account?
              </ThemedText>
              <Link href="/(auth)/register" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <ThemedText
                      type="link"
                      style={{ opacity: pressed ? 0.7 : 1 }}
                    >
                      Create one
                    </ThemedText>
                  )}
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 24,
    padding: 24,
    gap: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 4,
  },
  logo: {
    width: 72,
    height: 72,
    alignSelf: "center",
    marginBottom: 8,
  },
  title: {
    textAlign: "center",
    fontFamily: Fonts.rounded,
  },
  subtitle: {
    textAlign: "center",
    color: "#687076",
  },
  formGroup: {
    gap: 8,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: Fonts.sans,
    fontSize: 16,
    backgroundColor: "#F8FAFC",
  },
  errorText: {
    textAlign: "center",
  },
  button: {
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  footerText: {
    color: "#687076",
  },
});
