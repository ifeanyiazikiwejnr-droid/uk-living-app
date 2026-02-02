import { Pressable, Text } from "react-native";
import { theme } from "./theme";

export default function ButtonLink({ title = "Open", onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ hovered, pressed }) => ({
        marginTop: 12,
        alignSelf: "flex-start",
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: theme.border,
        backgroundColor: "rgba(255,255,255,0.08)",
        opacity: pressed ? 0.8 : hovered ? 0.9 : 1,
      })}
    >
      <Text style={{ color: theme.text, fontWeight: "800" }}>{title}</Text>
    </Pressable>
  );
}
