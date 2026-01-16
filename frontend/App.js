import * as React from "react";
import {
  NavigationContainer,
  getStateFromPath,
  getPathFromState,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import AccommodationsScreen from "./src/screens/AccommodationsScreen";
import RestaurantsScreen from "./src/screens/RestaurantsScreen";
import JobsScreen from "./src/screens/JobsScreen";
import StarterPackScreen from "./src/screens/StarterPackScreen";
import TourismScreen from "./src/screens/TourismScreen";
import SchoolsScreen from "./src/screens/SchoolsScreen";


const Stack = createNativeStackNavigator();

const linking = {
  // Keep prefixes loose so it works no matter what port Expo uses
  prefixes: ["http://localhost", "https://localhost"],

  config: {
    screens: {
      Home: "",
      Accommodations: "accommodations",
      Restaurants: "restaurants",
      Jobs: "jobs",
      StarterPack: "starter-pack",
      Tourism: "tourism",
      Schools: "schools",
    },
  },

  // ✅ Hash routing so refresh never 404s
  getStateFromPath: (path, options) => {
    const clean = path.startsWith("#") ? path.slice(1) : path;
    return getStateFromPath(clean, options);
  },
  getPathFromState: (state, options) => {
    const path = getPathFromState(state, options);
    return `#${path}`;
  },
};

const getInitialStateFromHash = () => {
  if (typeof window === "undefined") return undefined;

  // hash looks like "#/accommodations"
  const hash = window.location.hash || "";
  const path = hash.startsWith("#") ? hash.slice(1) : hash;

  // If there is no hash path, let it go to Home
  if (!path || path === "/") return undefined;

  return getStateFromPath(path, linking.config);
};

export default function App() {
  return (
    <NavigationContainer
  linking={linking}
  initialState={getInitialStateFromHash()}
>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "white" },
          headerTitleStyle: { fontWeight: "700" },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: "#f7f7f7" },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
        <Stack.Screen name="Accommodations" component={AccommodationsScreen} options={{ title: "Accommodations" }} />
        <Stack.Screen name="Restaurants" component={RestaurantsScreen} options={{ title: "Restaurants" }} />
        <Stack.Screen name="Jobs" component={JobsScreen} options={{ title: "Jobs" }} />
        <Stack.Screen name="Tourism" component={TourismScreen} options={{ title: "Tourism" }} />
        <Stack.Screen name="StarterPack" component={StarterPackScreen} options={{ title: "Starter Pack" }} />
        <Stack.Screen name="Schools" component={SchoolsScreen} options={{ title: "Schools" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
