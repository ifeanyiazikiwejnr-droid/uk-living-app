import { View } from "react-native";
import { theme } from "./theme";

export default function Card({ children, style }) {
  return (
    <View
      style={[
        {
          backgroundColor: theme.card,
          borderRadius: theme.radius,
          borderWidth: 1,
          borderColor: theme.border,
          padding: 16,
          ...theme.shadow,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
