import { useEffect, useState } from "react";
import { View, Text, Pressable, FlatList, TextInput } from "react-native";
import { api } from "../api";
import Card from "../ui/Card";
import { theme } from "../ui/theme";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useLayoutEffect } from "react";


export default function AdminScreen() {
  const [tab, setTab] = useState("users"); // users | buddies | createBuddy
  const [users, setUsers] = useState([]);
  const [buddies, setBuddies] = useState([]);
  const [msg, setMsg] = useState("");
  const { logout } = useContext(AuthContext);
  // create buddy form
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("password123");
  const [ethnicity, setEthnicity] = useState("Nigerian");
  const [uk_city, setUkCity] = useState("London");
  const [verified, setVerified] = useState(true);
  const [profile_image, setProfileImage] = useState("");

  

  async function loadUsers(role) {
    setMsg("");
    const res = await api.get(`/admin/users${role ? `?role=${role}` : ""}`);
    setUsers(res.data);
  }

  async function loadBuddies() {
    setMsg("");
    const res = await api.get("/admin/buddies");
    setBuddies(res.data);
  }

  async function deleteUser(id) {
    setMsg("");
    try {
      await api.delete(`/admin/users/${id}`);
      setMsg("User deleted ✅");
      await loadUsers();
      await loadBuddies();
    } catch {
      setMsg("Delete failed (you can’t delete yourself).");
    }
  }

  async function toggleVerify(userId, next) {
    setMsg("");
    await api.post(`/admin/buddies/${userId}/verify`, { verified: next });
    await loadBuddies();
  }

  async function createBuddy() {
    setMsg("");
    try {
      await api.post("/admin/buddies", {
        full_name,
        email,
        password,
        ethnicity,
        uk_city,
        verified,
        profile_image,
        support_areas: "banking,transport,academics",
        years_in_uk: 2,
      });
      setMsg("Buddy created ✅");
      setFullName("");
      setEmail("");
      setProfileImage("");
      await loadBuddies();
      setTab("buddies");
    } catch (e) {
      setMsg("Create buddy failed (email may already exist).");
    }
  }

  useEffect(() => {
    loadUsers();
    loadBuddies();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.pageBg, padding: theme.screenPadding, alignItems: "center" }}>
      <View style={{ width: "100%", maxWidth: theme.maxWidth, flex: 1 }}>
        <Text style={{ fontSize: 22, fontWeight: "900", color: theme.text, marginBottom: 10 }}>
          Admin Dashboard
        </Text>
        {msg ? <Card><Text style={{ color: theme.text }}>{msg}</Text></Card> : null}

        
        {/* Tabs */}
        <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
          <TabButton label="Users" active={tab === "users"} onPress={() => setTab("users")} />
          <TabButton label="Buddies" active={tab === "buddies"} onPress={() => setTab("buddies")} />
          <TabButton label="Add Buddy" active={tab === "createBuddy"} onPress={() => setTab("createBuddy")} />
        </View>

        {tab === "users" ? (
          <>
            <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
              <Pressable onPress={() => loadUsers()} style={pillSub()}>
                <Text style={pillText()}>All</Text>
              </Pressable>
              <Pressable onPress={() => loadUsers("student")} style={pillSub()}>
                <Text style={pillText()}>Students</Text>
              </Pressable>
              <Pressable onPress={() => loadUsers("buddy")} style={pillSub()}>
                <Text style={pillText()}>Buddies</Text>
              </Pressable>
            </View>

            <FlatList
              data={users}
              keyExtractor={(u) => String(u.id)}
              ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
              renderItem={({ item }) => (
                <Card>
                  <Text style={{ fontWeight: "900", color: theme.text }}>
                    {item.full_name} — {item.role}
                  </Text>
                  <Text style={{ marginTop: 6, color: theme.muted }}>{item.email}</Text>
                  <Text style={{ marginTop: 6, color: theme.muted }}>
                    {item.ethnicity || item.home_country || ""} • {item.uk_city || ""}
                  </Text>

                  <Pressable
                    onPress={() => deleteUser(item.id)}
                    style={{ marginTop: 12, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 999, backgroundColor: "#dc2626", alignSelf: "flex-start" }}
                  >
                    <Text style={{ color: "white", fontWeight: "900" }}>Delete</Text>
                  </Pressable>
                </Card>
              )}
            />
          </>
        ) : null}

        {tab === "buddies" ? (
          <FlatList
            data={buddies}
            keyExtractor={(b) => String(b.id)}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            renderItem={({ item }) => (
              <Card>
                <Text style={{ fontWeight: "900", color: theme.text }}>
                  {item.full_name} — {item.ethnicity || "No ethnicity"}
                </Text>
                <Text style={{ marginTop: 6, color: theme.muted }}>{item.email}</Text>
                <Text style={{ marginTop: 6, color: theme.muted }}>
                  Verified: {item.verified ? "Yes ✅" : "No"}
                </Text>

                <View style={{ flexDirection: "row", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
                  <Pressable onPress={() => toggleVerify(item.id, !item.verified)} style={pill()}>
                    <Text style={pillText()}>{item.verified ? "Unverify" : "Verify"}</Text>
                  </Pressable>

                  <Pressable onPress={() => deleteUser(item.id)} style={{ ...pill(), backgroundColor: "#dc2626", borderColor: "#dc2626" }}>
                    <Text style={{ ...pillText(), color: "white" }}>Delete</Text>
                  </Pressable>
                </View>
              </Card>
            )}
          />
        ) : null}

        {tab === "createBuddy" ? (
          <Card>
            <Text style={{ fontWeight: "900", color: theme.text }}>Add a Buddy</Text>

            <TextInput value={full_name} onChangeText={setFullName} placeholder="Full name"
              style={inputStyle()} />
            <TextInput value={email} onChangeText={setEmail} placeholder="Email"
              autoCapitalize="none" style={inputStyle()} />
            <TextInput value={password} onChangeText={setPassword} placeholder="Temp password"
              style={inputStyle()} />
            <TextInput value={ethnicity} onChangeText={setEthnicity} placeholder="Ethnicity (Nigerian/Ghanaian/Indian/Pakistani)"
              style={inputStyle()} />
            <TextInput value={uk_city} onChangeText={setUkCity} placeholder="UK city"
              style={inputStyle()} />
            <TextInput value={profile_image} onChangeText={setProfileImage} placeholder="Profile image URL (optional)"
              style={inputStyle()} />

            <Pressable
              onPress={() => setVerified(v => !v)}
              style={{ marginTop: 10, ...pill() }}
            >
              <Text style={pillText()}>
                Verified: {verified ? "Yes ✅" : "No"}
              </Text>
            </Pressable>

            <Pressable onPress={createBuddy} style={{ marginTop: 14, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 999, backgroundColor: theme.accent, alignSelf: "flex-start" }}>
              <Text style={{ color: "white", fontWeight: "900" }}>Create Buddy</Text>
            </Pressable>
          </Card>
        ) : null}
      </View>
    </View>
  );
}

function TabButton({ label, active, onPress }) {
  return (
    <Pressable onPress={onPress} style={{ ...pill(), backgroundColor: active ? theme.accent : "white" }}>
      <Text style={{ ...pillText(), color: active ? "white" : "#111" }}>{label}</Text>
    </Pressable>
  );
}

function pill() {
  return {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: "white",
  };
}

function pillSub() {
  return {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: "white",
    height: 15,
    justifyContent: "center",
  };
}
function pillText() {
  return { fontWeight: "900" };
}
function inputStyle() {
  return {
    marginTop: 10,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "white",
  };
}
