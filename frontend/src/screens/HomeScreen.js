import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { View, Text, Pressable, ScrollView } from "react-native";
import { theme } from "../ui/theme";
import Footer from "../ui/Footer";





export default function HomeScreen({ navigation }) {
  const { logout } = useContext(AuthContext);
  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: theme.pageBg }}
      contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={{ flex: 1, backgroundColor: theme.pageBg }}>
        <Pressable
          onPress={logout}
          style={{
            alignSelf: "flex-end",
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: theme.border,
            backgroundColor: "white",
            marginTop: 10,
          }}
        >
          <Text style={{ fontWeight: "800" }}>Logout</Text>
        </Pressable>
        <View
          style={{
            padding: theme.screenPadding,
            maxWidth: theme.maxWidth,
            width: "100%",
            alignSelf: "center",
          }}
      >
        {/* HERO SECTION */}
        <Text
          style={{
            fontSize: 32,
            fontWeight: "900",
            lineHeight: 36,
            marginTop: -40,
            color: theme.accentText,
          }}
        >
          Settle-In Buddy.
        </Text>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "900",
            lineHeight: 36,
            marginTop: 5,
            color: theme.text,
          }}
        >
          Settle into the UK with confidence.
        </Text>

        <Text
          style={{
            marginTop: 14,
            fontSize: 16,
            lineHeight: 22,
            color: theme.muted,
            maxWidth: 650,
          }}
        >
          Settle-In Buddy connects international students with mentors from
          their home country who help them navigate banking, transport,
          academics, and social life during their first 4–8 weeks in the UK.
        </Text>

        <Text
          style={{
            marginTop: 10,
            fontSize: 14,
            fontWeight: "600",
            color: theme.text,
          }}
        >
          Personal guidance • Shared culture • Real experience
        </Text>

        {/* ACTION CARDS */}
        <View style={{ marginTop: 32, gap: 14 }}>
          <ActionCard
            title="How it works"
            subtitle="Understand how Settling-In Buddy supports you step-by-step"
            onPress={() => navigation.navigate("HowItWorks")}
          />

          <ActionCard
            title="Find accommodation"
            subtitle="Understand listings, avoid scams, and choose wisely"
            onPress={() => navigation.navigate("Accommodations")}
          />

          <ActionCard
            title="Get your starter pack"
            subtitle="Banking, SIM cards, GP registration and essentials"
            onPress={() => navigation.navigate("StarterPack")}
          />

          <ActionCard
            title="Navigate transport"
            subtitle="Learn how locals actually move around the UK"
            onPress={() => navigation.navigate("Tourism")}
          />

          <ActionCard
            title="Explore jobs & opportunities"
            subtitle="Early advice on part-time work and employability"
            onPress={() => navigation.navigate("Jobs")}
          />

          <ActionCard
            title="Meet your Buddy"
            subtitle="Get matched with someone who’s already walked your path"
            onPress={() => navigation.navigate("Buddy")}
          />

          <ActionCard
            title="Become a Buddy"
            subtitle="Support new students from your home country (and build your CV)"
            onPress={() => navigation.navigate("BecomeBuddy")}
          />

          <ActionCard
            title="Onboarding Tasks"
            subtitle="Your 4–8 week checklist with progress tracking"
            onPress={() => navigation.navigate("Tasks")}
          />


        </View>
      </View>

      {/* FOOTER */}
      <Footer />
    </View>
    </ScrollView>
  );
}

/* ---------- Small reusable card ---------- */

function ActionCard({ title, subtitle, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ hovered }) => ({
        backgroundColor: "white",
        borderRadius: 16,
        padding: 18,
        borderWidth: 1,
        borderColor: theme.border,
        transform: hovered ? [{ scale: 1.01 }] : [{ scale: 1 }],
      })}
    >
      <Text style={{ fontSize: 17, fontWeight: "800" }}>{title}</Text>
      <Text style={{ marginTop: 6, color: "black" }}>{subtitle}</Text>
    </Pressable>
  );
}
