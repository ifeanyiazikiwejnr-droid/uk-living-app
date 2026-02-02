import { useContext, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { api } from "../api";
import { AuthContext } from "../auth/AuthContext";
import { theme } from "../ui/theme";
import { useEffect } from "react";


export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("aisha@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [isAdminLogin, setIsAdminLogin] = useState(false);


  useEffect(() => {
      if (isAdminLogin) {
        setEmail("admin@settlingbuddy.com");
      }
    }, [isAdminLogin]);

  async function onSubmit() {
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });

  await login(res.data.token, res.data.user.role);

  if (res.data.user.role === "admin") {
    navigation.reset({
      index: 0,
      routes: [{ name: "Admin" }],
    });
  } else {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  }

    } catch (e) {
      setError("Login failed. Check your email/password.");
    }
  }

  return (
    <View style={{ flex: 1, padding: 18, justifyContent: "center" }}>
      <Text style={{ fontSize: 26, fontWeight: "900" }}>Sign in</Text>

      <Text style={{ marginTop: 8, color: theme?.muted ?? "#666" }}>
        Access your buddy and onboarding tasks.
      </Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        style={{ marginTop: 16, borderWidth: 1, padding: 12, borderRadius: 12 }}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={{ marginTop: 12, borderWidth: 1, padding: 12, borderRadius: 12 }}
      />

      {error ? <Text style={{ marginTop: 10 }}>{error}</Text> : null}

      <Pressable
        onPress={onSubmit}
        style={{ marginTop: 14, padding: 12, borderRadius: 12, backgroundColor: "#111" }}
      >
        <Text style={{ fontSize: 15, fontWeight: "900", color: theme.text, textAlign: "center" }}>
          {isAdminLogin ? "Admin Login" : "Welcome back"}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setIsAdminLogin((v) => !v)}
        style={{
          marginTop: 14,
          alignSelf: "center",
        }}
      >
        <Text style={{ color: theme.muted, fontWeight: "700" }}>
          {isAdminLogin ? "← Back to student login" : "Admin login"}
        </Text>
      </Pressable>


      <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 12 }}>
        <Text style={{ textAlign: "center" }}>
          No account? Create one
        </Text>
      </Pressable>
    </View>
  );
}
