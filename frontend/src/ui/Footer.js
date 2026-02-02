import { View, Text, Pressable, Linking } from "react-native";
import { theme } from "./theme";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

function SocialButton({ onPress, children, label }) {
  return (
    <Pressable
      onPress={onPress}
      aria-label={label}
      style={({ hovered }) => ({
        width: 42,
        height: 42,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: theme.border,
        backgroundColor: theme.card,
        alignItems: "center",
        justifyContent: "center",
        opacity: hovered ? 0.8 : 1,
        transform: hovered ? [{ scale: 1.06 }] : [{ scale: 1 }],
      })}
    >
      {children}
    </Pressable>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <View
      style={{
        width: "100%",
        paddingVertical: 28,
        backgroundColor: theme.surface,
        borderTopWidth: 1,
        borderTopColor: theme.border,
        alignItems: "center",
      }}
    >
      <Text style={{ color: theme.text, fontSize: 18, fontWeight: "900" }}>
        Settle-In Buddy
      </Text>

      <Text
        style={{
          marginTop: 8,
          color: theme.muted,
          fontSize: 13,
          textAlign: "center",
          maxWidth: 650,
          lineHeight: 18,
        }}
      >
        Helping newcomers find accommodation, tourism, jobs, schools, and essential UK services.
      </Text>

      <Text
        style={{
          marginTop: 8,
          marginBottom: -12,
          color: theme.muted,
          fontSize: 13,
          textAlign: "center",
          maxWidth: 650,
          lineHeight: 18,
        }}
      >
        Contact Us
      </Text>

      <View style={{ flexDirection: "row", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
        <SocialButton
          label="GitHub"
          onPress={() => Linking.openURL("https://github.com/ifeanyiazikiwejnr-droid")}
        >
          <FaGithub size={20} color={theme.text} />
        </SocialButton>

        <SocialButton
          label="LinkedIn"
          onPress={() => Linking.openURL("https://www.linkedin.com/")}
        >
          <FaLinkedin size={20} color={theme.text} />
        </SocialButton>

        <SocialButton
          label="X"
          onPress={() => Linking.openURL("https://twitter.com/")}
        >
          <FaTwitter size={20} color={theme.text} />
        </SocialButton>

        <SocialButton
          label="Email"
          onPress={() => Linking.openURL("mailto:contact@example.com")}
        >
          <FaEnvelope size={20} color={theme.text} />
        </SocialButton>
      </View>

      <Text style={{ marginTop: 18, color: theme.muted, fontSize: 12 }}>
        © {year} Settle-In Buddy • All rights reserved.
      </Text>
    </View>
  );
}
