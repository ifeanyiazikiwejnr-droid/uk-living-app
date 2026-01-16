import { View } from "react-native";
import { theme } from "./theme";

export default function Card({ children, style }) {
  return (
    <View
      style={[
        {
          padding: 14,
          borderWidth: theme.border,
          borderRadius: theme.radius,
          backgroundColor: "white",
          // Web + Android shadow (safe)
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 2,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
