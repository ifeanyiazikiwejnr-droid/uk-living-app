import { useEffect, useState } from "react";
import { FlatList, View, Text, Linking, Pressable, Image } from "react-native";
import { api } from "../api";
import Card from "../ui/Card";
import Loading from "../ui/Loading";
import ButtonLink from "../ui/ButtonLink";
import { theme } from "../ui/theme";
import SearchBar from "../ui/SearchBar";
import Footer from "../ui/Footer";

export default function ListScreen({ title, endpoint, line1, line2, link }) {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

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

  useEffect(() => {
    load(true);
    setQuery(""); // clear search when switching pages
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  const filtered = items.filter((item) => {
    const text = JSON.stringify(item).toLowerCase();
    return text.includes(query.trim().toLowerCase());
  });

  async function onRefresh() {
    setRefreshing(true);
    await load(false);
    setRefreshing(false);
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.pageBg,
        padding: theme.screenPadding,
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1, width: "100%", maxWidth: theme.maxWidth }}>
        <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 12, color: theme.text }}>
          {title}
        </Text>

        {status === "ready" ? (
          <>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            placeholder={`Search ${title.toLowerCase()}...`}
          />
          
              <Text
                  style={{
                    fontSize: 12,
                    color: theme.muted,
                    marginTop: 6,
                    marginBottom: 10,
                  }}
                >
                  Tip: you can search by city, name, or keyword
                </Text>
              </>
        ) : null}

        

        {status === "loading" ? <Loading /> : null}

        {status === "error" ? (
          <Card>
            <Text style={{ fontSize: 14, fontWeight: "700", color: theme.text }}>
              Something went wrong
            </Text>
            <Text style={{ marginTop: 6, color: theme.muted }}>{error}</Text>
          </Card>
        ) : null}

        {status === "ready" ? (
          filtered.length === 0 ? (
            <Card>
              <Text style={{ fontSize: 14, fontWeight: "700", color: theme.text }}>
                Nothing found
              </Text>
              <Text style={{ marginTop: 6, color: theme.muted }}>
                Try a different search, or refresh.
              </Text>
            </Card>
          ) : (
            <FlatList
              style={{ flex: 1, marginTop: 12 }}
              contentContainerStyle={{ paddingBottom: 40 }}
              data={filtered}
              refreshing={refreshing}
              onRefresh={onRefresh}
              keyExtractor={(item) => String(item.id)}
              ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
              ListFooterComponent={
              <View style={{ marginTop: 15 }}>
                 <Footer />
              </View>
              }
              renderItem={({ item }) => (
                <Card>
                  {item.image ? (
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        width: "100%",
                        height: 180,
                        borderRadius: 14,
                        marginBottom: 10,
                      }}
                      resizeMode="cover"
                    />
                  ) : null}

                  <Text style={{ fontSize: 16, fontWeight: "700", color: theme.text }}>
                    {line1(item)}
                  </Text>

                  {line2 ? (
                    <Text style={{ marginTop: 6, color: theme.muted }}>
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
    </View>
  );
}
