import { View, Text } from "react-native";
import Tile from "../ui/Tile";
import { theme } from "../ui/theme";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ padding: theme.screenPadding, gap: 8 }}>
      <Text style={{ fontSize: theme.text.title, fontWeight: "700" }}>
        Settling In Buddy
      </Text>
      <Text style={{ fontSize: theme.text.body, opacity: 0.8, marginBottom: 8 }}>
        Find accommodation, food, jobs, and essential UK links in one place.
      </Text>

      <Tile icon="🏠" title="Accommodations" onPress={() => navigation.navigate("Accommodations")} />
      <Tile icon="🍽️" title="Restaurants" onPress={() => navigation.navigate("Restaurants")} />
      <Tile icon="💼" title="Jobs" onPress={() => navigation.navigate("Jobs")} />
      <Tile icon="🧰" title="Starter Pack" onPress={() => navigation.navigate("StarterPack")} />
      <Tile icon="🗺️" title="Tourism" onPress={() => navigation.navigate("Tourism")} />
      <Tile icon="🏫" title="Schools" onPress={() => navigation.navigate("Schools")} />
    </View>
  );
}
