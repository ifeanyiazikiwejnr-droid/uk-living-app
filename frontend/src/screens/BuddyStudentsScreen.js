import { useEffect, useState } from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import { api } from "../api";
import Card from "../ui/Card";
import Loading from "../ui/Loading";
import { theme } from "../ui/theme";

export default function BuddyStudentsScreen() {
  const [status, setStatus] = useState("loading");
  const [items, setItems] = useState([]);
  const [msg, setMsg] = useState("");

  async function load() {
    setMsg("");
    setStatus("loading");
    try {
      const res = await api.get("/buddy-page/my-students");
      setItems(res.data);
      setStatus("ready");
    } catch (e) {
      setStatus("error");
      setMsg(e?.response?.data?.error || "Could not load students.");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.pageBg }} contentContainerStyle={{ paddingBottom: 30 }}>
      <View style={{ padding: theme.screenPadding, maxWidth: theme.maxWidth, width: "100%", alignSelf: "center", gap: 12 }}>
        <Text style={{ fontSize: 24, fontWeight: "900", color: theme.text }}>
          My Students
        </Text>

        <Pressable
          onPress={load}
          style={{ alignSelf: "flex-start", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 999, borderWidth: 1, borderColor: theme.border, backgroundColor: "white" }}
        >
          <Text style={{ fontWeight: "900" }}>Refresh</Text>
        </Pressable>

        {status === "loading" ? <Loading /> : null}

        {status === "error" ? (
          <Card>
            <Text style={{ fontWeight: "900" }}>Error</Text>
            <Text style={{ marginTop: 6, color: theme.muted }}>{msg}</Text>
          </Card>
        ) : null}

        {status === "ready" && items.length === 0 ? (
          <Card>
            <Text style={{ fontWeight: "900" }}>No students yet</Text>
            <Text style={{ marginTop: 6, color: theme.muted }}>
              When a student chooses you, they’ll appear here.
            </Text>
          </Card>
        ) : null}

        {status === "ready" ? (
          items.map((s) => (
            <Card key={String(s.match_id)}>
              <Text style={{ fontSize: 16, fontWeight: "900", color: theme.text }}>
                {s.full_name}
              </Text>
              <Text style={{ marginTop: 6, color: theme.muted }}>{s.email}</Text>

              <Text style={{ marginTop: 6, color: theme.muted }}>
                {s.ethnicity || s.home_country || ""} • {s.uk_city || ""} • {s.university || ""}
              </Text>

              <Text style={{ marginTop: 6, color: theme.muted }}>
                Match status: {s.match_status}
              </Text>
            </Card>
          ))
        ) : null}
      </View>
    </ScrollView>
  );
}
