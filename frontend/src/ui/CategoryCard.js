import { Pressable, Text, View, Image } from "react-native";
import { theme } from "./theme";

export default function CategoryCard({ title, subtitle, imageUrl, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        minWidth: 240,
        borderRadius: theme.radius,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: theme.border,
        backgroundColor: theme.card,
        ...theme.shadow,
      }}
    >
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={{ width: "100%", height: 140 }}
          resizeMode="cover"
        />
      ) : (
        <View style={{ height: 140, backgroundColor: theme.surface }} />
      )}

      <View style={{ padding: 14 }}>
        <Text style={{ color: theme.text, fontSize: 18, fontWeight: "800" }}>
          {title}
        </Text>
        <Text style={{ marginTop: 6, color: theme.muted, fontSize: 13 }}>
          {subtitle}
        </Text>
      </View>
    </Pressable>
  );
}
