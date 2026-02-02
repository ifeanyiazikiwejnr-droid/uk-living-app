import { ScrollView, View, Text } from "react-native";
import Card from "../ui/Card";
import { theme } from "../ui/theme";
import Footer from "../ui/Footer";

export default function HowItWorksScreen() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.pageBg }}
      contentContainerStyle={{ paddingBottom: 30, color: "white" }}
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
        <Text style={{ fontSize: 28, fontWeight: "900", color: "white"}}>
          How Settling-In Buddy Works
        </Text>

        <Text style={{ color: theme.muted, lineHeight: 22 }}>
          Settling-In Buddy supports international students during their most
          challenging period — the first 4–8 weeks after arriving in the UK.
        </Text>

        <Step
          number="1"
          title="Sign up before or after arrival"
          description="International students join the platform before or shortly after arriving in the UK."
        />

        <Step
          number="2"
          title="Tell us about your background"
          description="Students share their home country, city, university, and the type of support they need."
        />

        <Step
          number="3"
          title="Get matched with a Buddy"
          description="We match students with a mentor from a similar cultural background who has already lived and studied in the UK."
        />

        <Step
          number="4"
          title="Receive personalised support (4–8 weeks)"
          description="Buddies provide practical, empathetic guidance on banking, transport, academics, housing, and social life."
        />

        <Step
          number="5"
          title="Pay it forward"
          description="Students can later become Buddies themselves, creating a sustainable and scalable support network."
        />

        <Card>
          <Text style={{ fontWeight: "900", color: theme.accent, fontSize: 18 }}>
            Why this model works
          </Text>
          <Text style={{ marginTop: 6, color: theme.muted, lineHeight: 20 }}>
            Unlike generic student apps, Settling-In Buddy focuses on
            culturally aligned, one-to-one mentorship, reducing isolation,
            culture shock, and early-stage drop-out.
          </Text>
        </Card>
      </View>

      <Footer />
    </ScrollView>
  );
}

function Step({ number, title, description }) {
  return (
    <Card>
      <Text style={{ fontSize: 14, fontWeight: "800", color: "white" }}>
        STEP {number}
      </Text>
      <Text style={{ fontSize: 18, fontWeight: "900", marginTop: 6, color: theme.accent }}>
        {title}
      </Text>
      <Text style={{ marginTop: 6, color: theme.muted, lineHeight: 20 }}>
        {description}
      </Text>
    </Card>
  );
}
