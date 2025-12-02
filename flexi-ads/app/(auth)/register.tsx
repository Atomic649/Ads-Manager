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
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, Fonts } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import logo from "@/assets/images/logo.png";
import CallAPIUser from "@/api/auth_api";

export default function RegisterScreen() {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? "light"];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isDisabled = useMemo(
    () =>
      isSubmitting ||
      !firstName.trim() ||
      !lastName.trim() ||
      !businessType.trim() ||
      !businessName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password.trim() ||
      password.trim().length < 8 ||
      password !== confirmPassword,
    [firstName, lastName, businessType, businessName, email, phone, password, confirmPassword, isSubmitting]
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

  const handleRegister = async () => {
   
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      // Call the register API
      const data = await CallAPIUser.registerAPI({
        firstName,
        lastName,
        phone,
        email,
        password,
        username,
        businessType,
        businessName,
      });

  if (data?.error) throw new Error(data.error);

      
      // go to business register with params
      router.replace( "/(auth)/login");
    } catch (error: any) {
      let message = "Unable to create account. Please try again.";
      if (error && typeof error === "object") {
        if ((error as any).message) message = String((error as any).message);
        else if (Array.isArray((error as any).errors)) {
          message = (error as any).errors
            .map((e: any) => e?.message || String(e))
            .join("\n");
        }
      } else if (typeof error === "string") {
        message = error;
      }
      setErrorMessage(message);
    }
    finally {
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
            <Image source={logo} style={styles.logo} contentFit="contain" />
            <ThemedText
              type="title"
              style={[styles.title, { color: palette.text }]}
            >
              Join Flexi Ads
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Create an account to access your dashboard and manage clients with
              ease.
            </ThemedText>

            <View style={styles.row}>
              <View style={styles.halfField}>
                <ThemedText type="defaultSemiBold">First name</ThemedText>
                <TextInput
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="Jane"
                  placeholderTextColor="#9BA1A6"
                  autoCorrect={false}
                  autoCapitalize="words"
                  selectionColor={palette.tint}
                  style={inputStyle}
                />
              </View>
              <View style={styles.halfField}>
                <ThemedText type="defaultSemiBold">Last name</ThemedText>
                <TextInput
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Doe"
                  placeholderTextColor="#9BA1A6"
                  autoCorrect={false}
                  autoCapitalize="words"
                  selectionColor={palette.tint}
                  style={inputStyle}
                />
              </View>
            </View>

			 <View style={styles.row}>
              <View style={styles.halfField}>
                <ThemedText type="defaultSemiBold">Business Type</ThemedText>
                <TextInput
                  value={businessType}
                  onChangeText={setBusinessType}
                  placeholder="Jane"
                  placeholderTextColor="#9BA1A6"
                  autoCorrect={false}
                  autoCapitalize="words"
                  selectionColor={palette.tint}
                  style={inputStyle}
                />
              </View>
              <View style={styles.halfField}>
                <ThemedText type="defaultSemiBold">Business Name</ThemedText>
                <TextInput
                  value={businessName}
                  onChangeText={setBusinessName}
                  placeholder="Doe"
                  placeholderTextColor="#9BA1A6"
                  autoCorrect={false}
                  autoCapitalize="words"
                  selectionColor={palette.tint}
                  style={inputStyle}
                />
              </View>
            </View>

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
              <ThemedText type="defaultSemiBold">Phone</ThemedText>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholder="+66 1234 5678"
                placeholderTextColor="#9BA1A6"
                selectionColor={palette.tint}
                style={inputStyle}
              />
            </View>

            <View style={styles.formGroup}>
              <ThemedText type="defaultSemiBold">Username</ThemedText>
              <TextInput
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoComplete="username"
                placeholder="flexihero"
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
                placeholder="Minimum 8 characters"
                placeholderTextColor="#9BA1A6"
                selectionColor={palette.tint}
                style={inputStyle}
              />
            </View>
            {password && password.trim().length < 8 ? (
              <ThemedText style={[styles.errorText, { color: "#F04438" }]}>
                Password must be at least 8 characters.
              </ThemedText>
            ) : null}

            <View style={styles.formGroup}>
              <ThemedText type="defaultSemiBold">Confirm password</ThemedText>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password"
                placeholder="Re-enter password"
                placeholderTextColor="#9BA1A6"
                selectionColor={palette.tint}
                style={inputStyle}
              />
            </View>

            {password && confirmPassword && password !== confirmPassword ? (
              <ThemedText style={[styles.errorText, { color: "#F04438" }]}>
                Passwords do not match.
              </ThemedText>
            ) : null}

            {errorMessage ? (
              <ThemedText style={[styles.errorText, { color: "#D92D20" }]}>
                {errorMessage}
              </ThemedText>
            ) : null}

            <Pressable              
              onPress={handleRegister}            
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
                  Create account
                </ThemedText>
              )}
            </Pressable>

            <View style={styles.footer}>
              <ThemedText style={styles.footerText}>
                Already registered?
              </ThemedText>
              <Link href="/(auth)/login" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <ThemedText
                      type="link"
                      style={{ opacity: pressed ? 0.7 : 1 }}
                    >
                      Sign in
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
    width: 64,
    height: 64,
    alignSelf: "center",
    marginBottom: 4,
  },
  title: {
    textAlign: "center",
    fontFamily: Fonts.rounded,
  },
  subtitle: {
    textAlign: "center",
    color: "#687076",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfField: {
    flex: 1,
    gap: 8,
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

