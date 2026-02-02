import { ScrollView, View, Text, Pressable, Linking } from "react-native";
import Card from "../ui/Card";
import { theme } from "../ui/theme";
import Footer from "../ui/Footer";

export default function BecomeBuddyScreen() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.pageBg }}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <View
        style={{
          padding: theme.screenPadding,
          maxWidth: theme.maxWidth,
          width: "100%",
          alignSelf: "center",
          gap: 16,
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "900", color: "white" }}>
          Become a Buddy
        </Text>

        <Text style={{ color: theme.muted, lineHeight: 22 }}>
          Help new international students from your home country settle into the UK.
          Buddies provide supportive guidance during the first 4–8 weeks — the most
          difficult period for most newcomers.
        </Text>

        <Card>
          <Text style={{ fontSize: 18, fontWeight: "900", color: theme.accent }}>
            What Buddies do
          </Text>

          <Text style={{ marginTop: 10, color: theme.muted, lineHeight: 20 }}>
            • Help students open bank accounts, register for a GP, and set up SIM plans
          </Text>
          <Text style={{ marginTop: 8, color: theme.muted, lineHeight: 20 }}>
            • Explain UK academic culture, expectations, and study habits
          </Text>
          <Text style={{ marginTop: 8, color: theme.muted, lineHeight: 20 }}>
            • Support students with transport, housing awareness, and safe settling tips
          </Text>
          <Text style={{ marginTop: 8, color: theme.muted, lineHeight: 20 }}>
            • Encourage social confidence and community integration
          </Text>
        </Card>

        <Card>
          <Text style={{ fontSize: 18, fontWeight: "900", color: theme.accent  }}>
            Why become a Buddy
          </Text>

          <Text style={{ marginTop: 10, color: theme.muted, lineHeight: 20 }}>
            • Paid mentorship opportunities (future feature)
          </Text>
          <Text style={{ marginTop: 8, color: theme.muted, lineHeight: 20 }}>
            • Volunteering & leadership experience
          </Text>
          <Text style={{ marginTop: 8, color: theme.muted, lineHeight: 20 }}>
            • Strengthen your CV with real impact
          </Text>
          <Text style={{ marginTop: 8, color: theme.muted, lineHeight: 20 }}>
            • Give back to your community and reduce isolation for others
          </Text>
        </Card>

        <Card>
          <Text style={{ fontSize: 18, fontWeight: "900", color: theme.accent  }}>
            Buddy requirements (MVP)
          </Text>

          <Text style={{ marginTop: 10, color: theme.muted, lineHeight: 20 }}>
            • Must have lived in the UK for at least 1 year
          </Text>
          <Text style={{ marginTop: 8, color: theme.muted, lineHeight: 20 }}>
            • Must be a student / graduate / working professional in the UK
          </Text>
          <Text style={{ marginTop: 8, color: theme.muted, lineHeight: 20 }}>
            • Must be willing to support a student for 4–8 weeks
          </Text>
        </Card>

        <Card>
          <Text style={{ fontSize: 18, fontWeight: "900", color: theme.accent  }}>
            Apply to become a Buddy
          </Text>

          <Text style={{ marginTop: 8, color: theme.muted, lineHeight: 20 }}>
            For now, Buddy onboarding is manual. In the full version, you’ll apply
            in-app and be verified before being matched with new students.
          </Text>

          <Pressable
            onPress={() => Linking.openURL("mailto:contact@example.com?subject=Become%20a%20Buddy")}
            style={({ hovered }) => ({
              marginTop: 14,
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 999,
              backgroundColor: theme.accent,
              alignSelf: "flex-start",
              opacity: hovered ? 0.9 : 1,
            })}
          >
            <Text style={{ color: "white", fontWeight: "900" }}>
              Apply via Email
            </Text>
          </Pressable>
        </Card>
      </View>

      <Footer />
    </ScrollView>
  );
}
