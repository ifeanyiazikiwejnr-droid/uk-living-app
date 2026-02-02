import { ScrollView, View, Text, Pressable, Linking } from "react-native";
import Card from "../ui/Card";
import { theme } from "../ui/theme";

function LinkButton({ title, url }) {
  return (
    <Pressable
      onPress={() => Linking.openURL(url)}
      style={{
        marginTop: 8,
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 999,
        backgroundColor: theme.accent,
        alignSelf: "flex-start",
      }}
    >
      <Text style={{ color: "white", fontWeight: "900" }}>{title}</Text>
    </Pressable>
  );
}

export default function TourismScreen() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.pageBg }}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View
        style={{
          padding: theme.screenPadding,
          maxWidth: theme.maxWidth,
          width: "100%",
          alignSelf: "center",
          gap: 18,
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "900", color: theme.text }}>
          Getting Around the UK
        </Text>

        <Text style={{ color: theme.muted, lineHeight: 22 }}>
          The UK has reliable transport systems, but it can feel confusing at
          first. This guide shows you the easiest ways to move around using apps
          and public transport.
        </Text>

        {/* ================= BOOK A RIDE ================= */}
        <Text style={{ fontSize: 22, fontWeight: "900", marginTop: 10, color: theme.text }}>
          🚗 Book a Ride
        </Text>

        <Card>
          <Text style={{ fontWeight: "900", fontSize: 16, color: theme.text }}>Uber</Text>
          <Text style={{ marginTop: 6, color: theme.muted }}>
            Best for quick trips, airport rides, and late-night travel. Prices
            vary based on demand.
          </Text>
          <LinkButton
            title="Open Uber"
            url="https://www.uber.com/gb/en/"
          />
        </Card>

        <Card>
          <Text style={{ fontWeight: "900", fontSize: 16, color: theme.text }}>Bolt</Text>
          <Text style={{ marginTop: 6, color: theme.muted }}>
            Often cheaper than Uber in many UK cities. Works the same way.
          </Text>
          <LinkButton
            title="Open Bolt"
            url="https://bolt.eu/en-gb/"
          />
        </Card>

        <Text style={{ color: theme.muted }}>
          💡 Tip: Always check both apps — prices can differ.
        </Text>

        {/* ================= PUBLIC TRANSPORT ================= */}
        <Text style={{ fontSize: 22, fontWeight: "900", marginTop: 20, color: theme.text }}>
          🚆 Public Transport
        </Text>

        <Card>
          <Text style={{ fontWeight: "900", fontSize: 20, color: theme.text }}>
            Buses in the UK
          </Text>

          <Text style={{ marginTop: 6, color: theme.muted }}>
            Buses are one of the cheapest and most common ways to travel within UK
            cities and towns. Most buses accept contactless debit cards — no cash
            needed.
          </Text>

          {/* FirstGroup */}
          <Text style={{ fontWeight: "800", marginTop: 14, fontSize: 17, color: theme.text }}>
            FirstGroup (First Bus)
          </Text>
          <Text style={{ color: theme.muted }}>
            Operates local bus services in many UK cities including Manchester,
            Leeds, Bristol, and parts of Scotland. Reliable for daily commuting.
          </Text>
          <LinkButton
            title="Visit First Bus"
            url="https://www.firstbus.co.uk/"
          />

          {/* Stagecoach */}
          <Text style={{ fontWeight: "800", marginTop: 14, fontSize: 17, color: theme.text }}>
            Stagecoach
          </Text>
          <Text style={{ color: theme.muted }}>
            One of the UK’s largest bus operators, serving cities, towns, and rural
            areas. Also runs some long-distance coach services.
          </Text>
          <LinkButton
            title="Visit Stagecoach"
            url="https://www.stagecoachbus.com/"
          />

          {/* Arriva */}
          <Text style={{ fontWeight: "800", marginTop: 14, fontSize: 17, color: theme.text }}>
            Arriva
          </Text>
          <Text style={{ color: theme.muted }}>
            Common in London, the Midlands, and the North East. Good coverage for
            suburban routes and student areas.
          </Text>
          <LinkButton
            title="Visit Arriva"
            url="https://www.arrivabus.co.uk/"
          />

          {/* Go-Ahead */}
          <Text style={{ fontWeight: "800", marginTop: 14, fontSize: 17, color: theme.text }}>
            Go-Ahead Group
          </Text>
          <Text style={{ color: theme.muted }}>
            Operates many city bus networks, especially in London and the South
            East. Often runs buses under local city brand names.
          </Text>
          <LinkButton
            title="Visit Go-Ahead"
            url="https://www.go-ahead.com/"
          />

          {/* ComfortDelGro */}
          <Text style={{ fontWeight: "800", marginTop: 14, fontSize: 17, color: theme.text }}>
            ComfortDelGro
          </Text>
          <Text style={{ color: theme.muted }}>
            A global transport company operating some UK bus services, mainly in
            London and selected regions. Focuses on urban transport.
          </Text>
          <LinkButton
            title="Visit ComfortDelGro"
            url="https://www.comfortdelgro.com/"
          />

          {/* National Express */}
          <Text style={{ fontWeight: "800", marginTop: 14, fontSize: 17, color: theme.text }}>
            National Express (Coaches)
          </Text>
          <Text style={{ color: theme.muted }}>
            Best for long-distance travel between cities and airports. Cheaper than
            trains if booked early, but slower.
          </Text>
          <LinkButton
            title="Visit National Express"
            url="https://www.nationalexpress.com/"
          />

          <Text style={{ fontWeight: "800", marginTop: 14, fontSize: 17, color: theme.text }}>
            National Express (NX West Midlands)
          </Text>
          <Text style={{ color: theme.muted }}>
            Best for travel between cities and airports in the West Midlands; Birmingham, Coventry, Wolverhampton, West Bromwich.
          </Text>
          <LinkButton
            title="Visit NX West Midlands"
            url="https://nxbus.co.uk/west-midlands"
          />

          <Text style={{ marginTop: 12, color: theme.muted }}>
            💡 Tip: Google Maps automatically shows bus routes and times for all
            these operators in most UK cities.
          </Text>
        </Card>

        <Card>
          <Text style={{ fontWeight: "900", fontSize: 17, color: theme.text }}>
            Trains (National Rail)
          </Text>
          <Text style={{ marginTop: 6, color: theme.muted }}>
            Use trains for long-distance travel between cities. Always book
            tickets in advance for cheaper prices.
          </Text>

          <LinkButton
            title="Open Trainline"
            url="https://www.thetrainline.com/"
          />
        </Card>

        <Card>
          <Text style={{ fontWeight: "900", fontSize: 16, color: theme.text }}>
            London Transport (TfL)
          </Text>
          <Text style={{ marginTop: 6, color: theme.muted }}>
            In London, buses, trains, and the Underground use contactless cards
            or Oyster cards.
          </Text>

          <LinkButton
            title="Open TfL"
            url="https://tfl.gov.uk/"
          />
        </Card>

        <Text style={{ color: theme.muted, marginTop: 10 }}>
          💡 Tip: Use Google Maps for live routes and timings — it works very
          well across the UK.
        </Text>
      </View>
    </ScrollView>
  );
}
