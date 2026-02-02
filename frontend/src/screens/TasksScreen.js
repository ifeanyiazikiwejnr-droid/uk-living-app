import { useEffect, useMemo, useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { api } from "../api";
import Card from "../ui/Card";
import { theme } from "../ui/theme";

export default function TasksScreen() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await api.get("/me/tasks");
    setTasks(res.data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const progress = useMemo(() => {
    if (!tasks.length) return { done: 0, total: 0, pct: 0 };
    const done = tasks.filter((t) => t.completed).length;
    const total = tasks.length;
    return { done, total, pct: Math.round((done / total) * 100) };
  }, [tasks]);

  async function toggle(id) {
    await api.post(`/me/tasks/${id}/toggle`);
    await load();
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.pageBg, padding: theme.screenPadding, alignItems: "center" }}>
      <View style={{ flex: 1, width: "100%", maxWidth: theme.maxWidth }}>
        <Text style={{ fontSize: 22, fontWeight: "900", color: theme.text, marginBottom: 10 }}>
          Onboarding Tasks
        </Text>

        <Card>
          <Text style={{ color: theme.muted }}>
            Progress: <Text style={{ color: theme.text, fontWeight: "900" }}>{progress.done}/{progress.total}</Text> ({progress.pct}%)
          </Text>

          <View style={{ height: 10, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.12)", marginTop: 10, overflow: "hidden" }}>
            <View style={{ width: `${progress.pct}%`, height: "100%", backgroundColor: theme.accent }} />
          </View>

          <Pressable
            onPress={load}
            style={{ marginTop: 12, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 999, borderWidth: 1, borderColor: theme.border, backgroundColor: "white", alignSelf: "flex-start" }}
          >
            <Text style={{ fontWeight: "900" }}>Refresh</Text>
          </Pressable>
        </Card>

        {loading ? (
          <Card><Text style={{ color: theme.muted }}>Loading…</Text></Card>
        ) : (
          <FlatList
            style={{ flex: 1, marginTop: 12 }}
            contentContainerStyle={{ paddingBottom: 40 }}
            data={tasks}
            keyExtractor={(t) => String(t.id)}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            renderItem={({ item }) => (
              <Card>
                <Text style={{ fontWeight: "900", color: theme.text }}>
                  Week {item.week_number}: {item.title}
                </Text>
                {item.description ? (
                  <Text style={{ marginTop: 6, color: theme.muted }}>{item.description}</Text>
                ) : null}

                <Pressable
                  onPress={() => toggle(item.id)}
                  style={{
                    marginTop: 12,
                    paddingVertical: 10,
                    paddingHorizontal: 14,
                    borderRadius: 999,
                    backgroundColor: item.completed ? "#16a34a" : theme.accent,
                    alignSelf: "flex-start",
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "900" }}>
                    {item.completed ? "Completed ✅ (tap to undo)" : "Mark complete"}
                  </Text>
                </Pressable>
              </Card>
            )}
          />
        )}
      </View>
    </View>
  );
}
