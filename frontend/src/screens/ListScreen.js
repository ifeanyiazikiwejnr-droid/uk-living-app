import { useEffect, useState } from "react";
import { FlatList, View, Text, Linking, Pressable, Image } from "react-native";
import { api } from "../api";
import Card from "../ui/card";
import Loading from "../ui/Loading";
import ButtonLink from "../ui/ButtonLink";
import { theme } from "../ui/theme";
import SearchBar from "../ui/SearchBar";




export default function ListScreen({ title, endpoint, line1, line2, link }) {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);



  useEffect(() => {
    let cancelled = false;

    async function load(showFullLoading = true) {
  if (showFullLoading) setStatus("loading");
  setError("");

  try {
    const res = await api.get(endpoint);
    setItems(res.data);
    setStatus("ready");
  } catch (e) {
    setStatus("error");
    setError("Could not load data. Make sure the backend is running.");
  }
}

    load(true);
  // clear search when switching pages
  setQuery("");
  }, [endpoint]);

  const filtered = items.filter((item) => {
  const text = JSON.stringify(item).toLowerCase();
  async function onRefresh() {
  setRefreshing(true);
  await load(false);
  setRefreshing(false);
}

  return text.includes(query.trim().toLowerCase());
});


  return (
    <View style={{ padding: theme.screenPadding }}>
      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 12 }}>
        {title}
      </Text>

      {status === "ready" ? (
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder={`Search ${title.toLowerCase()}...`}
      />
    ) : null}
    

      {status === "loading" ? <Loading /> : null}

      {status === "error" ? (
        <Card>
          <Text style={{ fontSize: theme.text.body, fontWeight: "700" }}>
            Something went wrong
          </Text>
          <Text style={{ marginTop: 6, opacity: 0.8 }}>{error}</Text>
          <Text style={{ marginTop: 6, opacity: 0.8 }}>
            Try refreshing, or check your API_BASE_URL in src/config.js.
          </Text>
        </Card>
      ) : null}

      {status === "ready" ? (
        filtered.length === 0 ? (
          <Card>
            <Text style={{ fontSize: theme.text.body, fontWeight: "700" }}>
              Nothing here yet
            </Text>
            <Text style={{ marginTop: 6, opacity: 0.8 }}>
              Add items in the database and reload.
            </Text>
          </Card>
        ) : (
          <FlatList
            contentContainerStyle={{ paddingBottom: 24 }}
            data={filtered}
            keyExtractor={(item) => String(item.id)}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            renderItem={({ item }) => (
              <Card>
                {item.image ? (
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: "100%", height: 160, borderRadius: 12, marginBottom: 10 }}
                    resizeMode="cover"
                    onError={() => {
                      // If an image fails, remove it so it doesn't keep showing a broken image
                      item.image = "";
                    }}
                  />
                ) : null}
                <Text style={{ fontSize: 16, fontWeight: "700" }}>
                  {line1(item)}
                </Text>

                {line2 ? (
                  <Text style={{ marginTop: 6, opacity: 0.85 }}>
                    {line2(item)}
                  </Text>
                ) : null}

                {link ? (
                  <ButtonLink
                    title="Open"
                    onPress={() => {
                      const url = link(item);
                      if (url) Linking.openURL(url);
                    }}
                  />
                ) : null}
              </Card>
            )}
          />
        )
      ) : null}
    </View>
  );
}
