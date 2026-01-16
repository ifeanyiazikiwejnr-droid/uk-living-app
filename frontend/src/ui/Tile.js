import { Pressable, Text } from "react-native";
import { theme } from "./theme";

export default function Tile({ title, icon, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 16,
        marginVertical: 8,
        borderRadius: theme.radius,
        borderWidth: theme.border,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
      }}
    >
      <Text style={{ fontSize: theme.text.subtitle, fontWeight: "600" }}>
        {icon ? `${icon} ` : ""}{title}
      </Text>
    </Pressable>
  );
}
