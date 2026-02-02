import { View, TextInput, Text } from "react-native";
import { theme } from "./theme";

export default function SearchBar({ value, onChangeText, placeholder = "Search..." }) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: theme.radius,
        paddingHorizontal: 14,
        paddingVertical: 12,
        backgroundColor: "rgba(255,255,255,0.06)",
        marginBottom: 10,
      }}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(229,231,235,0.45)"
        autoCorrect={false}
        autoCapitalize="none"
        style={{ fontSize: 16, color: theme.text }}
      />
      <Text style={{ marginTop: 6, fontSize: 12, color: theme.muted }}>
        Tip: search by city, keyword, or name
      </Text>
    </View>
  );
}
