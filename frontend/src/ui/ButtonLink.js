import { Pressable, Text } from "react-native";
import { theme } from "./theme";

export default function ButtonLink({ title = "Open link", onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        marginTop: 10,
        alignSelf: "flex-start",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 999,
        borderWidth: theme.border,
        backgroundColor: "white",
      }}
    >
      <Text style={{ fontSize: theme.text.body, fontWeight: "600" }}>{title}</Text>
    </Pressable>
  );
}
