import { useState } from "react";
import { View, Image, Pressable, Modal, Text } from "react-native";
import { theme } from "./theme";

export default function ProfileImage({ uri, size = 44 }) {
  const [open, setOpen] = useState(false);

  if (!uri) {
    // fallback circle if no image
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: 999,
          backgroundColor: "rgba(255,255,255,0.15)",
          borderWidth: 1,
          borderColor: theme.border,
        }}
      />
    );
  }

  return (
    <>
      <Pressable onPress={() => setOpen(true)} style={{ borderRadius: 999, overflow: "hidden" }}>
        <Image
          source={{ uri }}
          style={{
            width: size,
            height: size,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: theme.border,
          }}
          resizeMode="cover"
        />
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable
          onPress={() => setOpen(false)}
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.75)",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              width: "100%",
              maxWidth: 520,
              borderRadius: 18,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: theme.border,
              backgroundColor: "#000",
            }}
          >
            <Image source={{ uri }} style={{ width: "100%", height: 520 }} resizeMode="cover" />
          </View>

          <Text style={{ color: "white", marginTop: 14, opacity: 0.9 }}>
            Tap anywhere to close
          </Text>
        </Pressable>
      </Modal>
    </>
  );
}
