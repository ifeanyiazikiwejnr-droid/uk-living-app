import { useEffect, useState } from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import { api } from "../api";
import Card from "../ui/Card";
import { theme } from "../ui/theme";
import Footer from "../ui/Footer";
import ProfileImage from "../ui/ProfileImage";


export default function BuddyScreen({ navigation }) {
  const [buddy, setBuddy] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setError("");
    setLoading(true);
    try {
      const res = await api.get("/me/buddy");
      setBuddy(res.data); // null if none
    } catch {
      setError("Could not load buddy.");
    } finally {
      setLoading(false);
    }
  }

  async function autoMatch() {
    setError("");
    try {
      await api.post("/matching/auto-match");
      await load();
    } catch {
      setError("No buddy found yet. Create a request or try again later.");
    }
  }

    async function unmatch() {
    try {
      await api.post("/matching/unmatch");
      setBuddy(null);
    } catch {
      setError("Could not unmatch. Try again.");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.pageBg }} contentContainerStyle={{ paddingBottom: 30 }}>
      <View style={{ padding: theme.screenPadding, maxWidth: theme.maxWidth, width: "100%", alignSelf: "center", gap: 14 }}>
        <Text style={{ fontSize: 26, fontWeight: "900", color: theme.text }}>Your Buddy</Text>

        {loading ? <Card><Text style={{ color: theme.muted }}>Loading…</Text></Card> : null}
        {error ? <Card><Text style={{ color: theme.text }}>{error}</Text></Card> : null}

        {!loading && !buddy ? (
          <Card>
            <Text style={{ fontWeight: "900", color: theme.text }}>No buddy matched yet</Text>
            <Text style={{ marginTop: 8, color: theme.muted, lineHeight: 20 }}>
              Create a match request and we’ll connect you with a culturally aligned mentor from your home country.
            </Text>

            <View style={{ flexDirection: "row", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
              <Pressable
                onPress={() => navigation.navigate("BuddyDirectory")}
                style={{ paddingVertical: 12, paddingHorizontal: 16, borderRadius: 999, backgroundColor: theme.accent }}
              >
                <Text style={{ color: "white", fontWeight: "900" }}>Request a Buddy</Text>
              </Pressable>

            </View>
          </Card>
        ) : null}

        {!loading && buddy ? (
          <Card>
            <ProfileImage uri={buddy.profile_image} size={70} />

            <Text style={{ fontSize: 18, fontWeight: "900", color: theme.text }}>
              {buddy.full_name}
            </Text>

            <Text style={{ marginTop: 6, color: theme.muted }}>
              From {buddy.home_country} • Based in {buddy.uk_city}
            </Text>

            {buddy.university ? (
              <Text style={{ marginTop: 6, color: theme.muted }}>
                {buddy.university}
              </Text>
            ) : null}

            {buddy.years_in_uk ? (
              <Text style={{ marginTop: 6, color: theme.muted }}>
                In the UK for {buddy.years_in_uk} years
              </Text>
            ) : null}

            {buddy.support_areas ? (
              <>
                <Text style={{ marginTop: 12, fontWeight: "900", color: theme.text }}>Support areas</Text>
                <Text style={{ marginTop: 6, color: theme.muted }}>{buddy.support_areas}</Text>
              </>
            ) : null}

            <View style={{ flexDirection: "row", gap: 10, marginTop: 14 }}>
              <Pressable
                onPress={load}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: theme.border,
                  backgroundColor: "white",
                }}
              >
                <Text style={{ fontWeight: "900" }}>Refresh</Text>
              </Pressable>

              <Pressable
                onPress={unmatch}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  borderRadius: 999,
                  backgroundColor: "#dc2626", // red
                }}
              >
                <Text style={{ color: "white", fontWeight: "900" }}>Unmatch</Text>
              </Pressable>
            </View>

          </Card>
        ) : null}
      </View>

      <Footer />
    </ScrollView>
  );
}
