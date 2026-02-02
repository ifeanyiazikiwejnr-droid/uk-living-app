import { Pressable, Text } from "react-native";
import { theme } from "./theme";

export default function PrimaryButton({ title, onPress, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ hovered, pressed }) => [
        {
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 999,
          backgroundColor: theme.accent,
          opacity: pressed ? 0.85 : hovered ? 0.92 : 1,
          transform: hovered ? [{ scale: 1.02 }] : [{ scale: 1 }],
          alignSelf: "flex-start",
        },
        style,
      ]}
    >
      <Text style={{ color: "white", fontWeight: "900" }}>{title}</Text>
    </Pressable>
  );
}
