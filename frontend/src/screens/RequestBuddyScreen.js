import { useState } from "react";
import { ScrollView, View, Text, TextInput, Pressable } from "react-native";
import { api } from "../api";
import Card from "../ui/Card";
import { theme } from "../ui/theme";

export default function RequestBuddyScreen({ navigation }) {
  const [home_country, setHomeCountry] = useState("");
  const [preferred_city, setPreferredCity] = useState("");
  const [support_areas, setSupportAreas] = useState("banking,transport,academics");
  const [msg, setMsg] = useState("");

  async function submit() {
    setMsg("");
    try {
      await api.post("/matching/request", {
        home_country: home_country.trim(),
        preferred_city: preferred_city.trim() ? preferred_city.trim() : null,
        support_areas: support_areas.trim(),
        });

      setMsg("Request created ✅ Now try Auto-match.");
    } catch (e) {
      setMsg("Could not create request. Check fields and try again.");
    }
  }

  async function autoMatch() {
    setMsg("");
    try {
      await api.post("/matching/auto-match");
      setMsg("Matched ✅ Returning to Buddy page...");
      setTimeout(() => navigation.goBack(), 800);
    } catch (e) {
      setMsg("No buddy found yet. Try later or change city/country.");
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.pageBg }} contentContainerStyle={{ paddingBottom: 30 }}>
      <View style={{ padding: theme.screenPadding, maxWidth: theme.maxWidth, width: "100%", alignSelf: "center", gap: 14 }}>
        <Text style={{ fontSize: 26, fontWeight: "900", color: theme.text }}>
          Request a Buddy
        </Text>

        <Text style={{ color: theme.muted, lineHeight: 20 }}>
          Tell us your home country and preferred UK city. We’ll match you with a culturally aligned Buddy.
        </Text>

        <Card>
          <Text style={{ fontWeight: "900", color: theme.text }}>Home country</Text>
          <TextInput
            value={home_country}
            onChangeText={setHomeCountry}
            placeholder="e.g. Nigeria"
            style={{ marginTop: 8, borderWidth: 1, borderColor: theme.border, padding: 12, borderRadius: 12, backgroundColor: "white" }}
          />

          <Text style={{ fontWeight: "900", color: theme.text, marginTop: 12 }}>Preferred UK city (optional)</Text>
          <TextInput
            value={preferred_city}
            onChangeText={setPreferredCity}
            placeholder="e.g. Manchester"
            style={{ marginTop: 8, borderWidth: 1, borderColor: theme.border, padding: 12, borderRadius: 12, backgroundColor: "white" }}
          />

          <Text style={{ fontWeight: "900", color: theme.text, marginTop: 12 }}>Support areas</Text>
          <Text style={{ color: theme.muted, marginTop: 6 }}>
            Comma-separated (banking, transport, academics, housing, social)
          </Text>
          <TextInput
            value={support_areas}
            onChangeText={setSupportAreas}
            style={{ marginTop: 8, borderWidth: 1, borderColor: theme.border, padding: 12, borderRadius: 12, backgroundColor: "white" }}
          />

          {msg ? <Text style={{ marginTop: 12, color: theme.text }}>{msg}</Text> : null}

          <View style={{ flexDirection: "row", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
            <Pressable
              onPress={submit}
              style={{ paddingVertical: 12, paddingHorizontal: 16, borderRadius: 999, backgroundColor: theme.accent }}
            >
              <Text style={{ color: "white", fontWeight: "900" }}>Create Request</Text>
            </Pressable>

            <Pressable
              onPress={autoMatch}
              style={{ paddingVertical: 12, paddingHorizontal: 16, borderRadius: 999, borderWidth: 1, borderColor: theme.border, backgroundColor: "white" }}
            >
              <Text style={{ fontWeight: "900" }}>Auto-match</Text>
            </Pressable>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
