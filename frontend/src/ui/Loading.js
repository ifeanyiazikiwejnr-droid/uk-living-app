import { View, ActivityIndicator, Text } from "react-native";
import { theme } from "./theme";

export default function Loading({ label = "Loading..." }) {
  return (
    <View style={{ paddingTop: 24, alignItems: "center", gap: 10 }}>
      <ActivityIndicator />
      <Text style={{ fontSize: theme.text.body, opacity: 0.8 }}>{label}</Text>
    </View>
  );
}
