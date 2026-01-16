import { View, TextInput } from "react-native";
import { theme } from "./theme";

export default function SearchBar({ value, onChangeText, placeholder = "Search..." }) {
  return (
    <View
      style={{
        borderWidth: theme.border,
        borderRadius: theme.radius,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: "white",
        marginBottom: 12,
      }}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        autoCorrect={false}
        autoCapitalize="none"
        style={{ fontSize: 16 }}
      />
    </View>
  );
}
