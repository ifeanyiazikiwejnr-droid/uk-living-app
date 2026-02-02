import { useEffect, useState } from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import { api } from "../api";
import Card from "../ui/Card";
import { theme } from "../ui/theme";
import ProfileImage from "../ui/ProfileImage";


export default function BuddyDirectoryScreen({ navigation }) {
  const [ethnicities, setEthnicities] = useState([]);
  const [selected, setSelected] = useState("");
  const [buddies, setBuddies] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api.get("/buddy-directory/ethnicities")
      .then(res => setEthnicities(res.data))
      .catch(() => setMsg("Could not load ethnicities."));
  }, []);

  async function chooseEthnicity(e) {
    setSelected(e);
    setMsg("");
    setBuddies([]);
    try {
      const res = await api.get(`/buddy-directory/buddies?ethnicity=${encodeURIComponent(e)}`);
      setBuddies(res.data);
      if (res.data.length === 0) setMsg("No buddies found for this ethnicity yet.");
    } catch {
      setMsg("Could not load buddies.");
    }
  }

  async function pickBuddy(buddy) {
    setMsg("");
    try {
      await api.post("/matching/select-buddy", {
        buddy_user_id: buddy.id,
        home_country: buddy.ethnicity,      // store as match_request home_country for now
        preferred_city: buddy.uk_city ?? null,
        support_areas: buddy.support_areas ?? null,
      });
      navigation.navigate("Buddy");
    } catch {
      setMsg("Could not create match. Try again.");
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.pageBg }} contentContainerStyle={{ paddingBottom: 30 }}>
      <View style={{ padding: theme.screenPadding, maxWidth: theme.maxWidth, width: "100%", alignSelf: "center", gap: 14 }}>
        <Text style={{ fontSize: 26, fontWeight: "900", color: theme.text }}>
          Choose your Buddy’s cultural background
        </Text>

        <Text style={{ color: theme.muted, lineHeight: 20 }}>
          Select an ethnicity to see available verified Buddies.
        </Text>

        {msg ? <Card><Text style={{ color: theme.text }}>{msg}</Text></Card> : null}

        {/* Ethnicity chips */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          {ethnicities.map((e) => (
            <Pressable
              key={e}
              onPress={() => chooseEthnicity(e)}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 14,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: theme.border,
                backgroundColor: selected === e ? theme.accent : "white",
              }}
            >
              <Text style={{ fontWeight: "900", color: selected === e ? "white" : "#111" }}>
                {e}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Buddy list */}
        {buddies.map((b) => (
          <Card key={b.id}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <ProfileImage uri={b.profile_image} size={46} />
                <Text style={{ fontSize: 16, fontWeight: "900", color: theme.text }}>
                    {b.full_name}
                </Text>
            </View>

              {b.verified ? (
                <View style={{ paddingVertical: 4, paddingHorizontal: 10, borderRadius: 999, backgroundColor: "#16a34a" }}>
                  <Text style={{ color: "white", fontWeight: "900", fontSize: 12 }}>Verified</Text>
                </View>
              ) : (
                <View style={{ paddingVertical: 4, paddingHorizontal: 10, borderRadius: 999, backgroundColor: "#334155" }}>
                  <Text style={{ color: "white", fontWeight: "900", fontSize: 12 }}>Unverified</Text>
                </View>
              )}
            </View>

            <Text style={{ marginTop: 6, color: theme.muted }}>
              {b.ethnicity} • {b.uk_city || "UK"} • {b.university || "University"}
            </Text>

            {b.bio ? <Text style={{ marginTop: 6, color: theme.muted }}>{b.bio}</Text> : null}

            <Pressable
              onPress={() => pickBuddy(b)}
              style={{ marginTop: 12, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 999, backgroundColor: theme.accent, alignSelf: "flex-start" }}
            >
              <Text style={{ color: "white", fontWeight: "900" }}>Choose this Buddy</Text>
            </Pressable>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}
