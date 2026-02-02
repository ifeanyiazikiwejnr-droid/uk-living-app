import { useContext, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { api } from "../api";
import { AuthContext } from "../auth/AuthContext";

export default function RegisterScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [full_name, setFullName] = useState("Full Name");
  const [email, setEmail] = useState("newstudent@example.com");
  const [password, setPassword] = useState("password123");
  const [home_country, setHomeCountry] = useState("Nigeria");
  const [uk_city, setUkCity] = useState("Manchester");
  const [university, setUniversity] = useState("University of Salford");
  const [error, setError] = useState("");

  async function onSubmit() {
    setError("");
    try {
      const res = await api.post("/auth/register", {
        role: "student",
        full_name,
        email,
        password,
        home_country,
        uk_city,
        university,
      });
      await login(res.data.token, res.data.user?.role);
    } catch (e) {
      setError("Registration failed. Try a different email.");
    }
  }

  return (
    <View style={{ flex: 1, padding: 18, justifyContent: "center" }}>
      <Text style={{ fontSize: 26, fontWeight: "900" }}>Create account</Text>

      <TextInput value={full_name} onChangeText={setFullName} placeholder="Full name"
        style={{ marginTop: 16, borderWidth: 1, padding: 12, borderRadius: 12 }} />
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" autoCapitalize="none"
        style={{ marginTop: 12, borderWidth: 1, padding: 12, borderRadius: 12 }} />
      <TextInput value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry
        style={{ marginTop: 12, borderWidth: 1, padding: 12, borderRadius: 12 }} />

      <TextInput value={home_country} onChangeText={setHomeCountry} placeholder="Home country"
        style={{ marginTop: 12, borderWidth: 1, padding: 12, borderRadius: 12 }} />
      <TextInput value={uk_city} onChangeText={setUkCity} placeholder="UK city"
        style={{ marginTop: 12, borderWidth: 1, padding: 12, borderRadius: 12 }} />
      <TextInput value={university} onChangeText={setUniversity} placeholder="University"
        style={{ marginTop: 12, borderWidth: 1, padding: 12, borderRadius: 12 }} />

      {error ? <Text style={{ marginTop: 10 }}>{error}</Text> : null}

      <Pressable onPress={onSubmit} style={{ marginTop: 14, padding: 12, borderRadius: 12, backgroundColor: "#111" }}>
        <Text style={{ color: "white", fontWeight: "800", textAlign: "center" }}>
          Register
        </Text>
      </Pressable>

      <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 12 }}>
        <Text style={{ textAlign: "center" }}>Back to login</Text>
      </Pressable>
    </View>
  );
}
