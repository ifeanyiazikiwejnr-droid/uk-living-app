import * as React from "react";
import "./web.css";
import { Pressable, Text } from "react-native";
import { NavigationContainer, getStateFromPath, getPathFromState } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthProvider, AuthContext } from "./src/auth/AuthContext";

// Auth screens
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

// Student screens
import HomeScreen from "./src/screens/HomeScreen";
import AccommodationsScreen from "./src/screens/AccommodationsScreen";
import RestaurantsScreen from "./src/screens/RestaurantsScreen";
import JobsScreen from "./src/screens/JobsScreen";
import StarterPackScreen from "./src/screens/StarterPackScreen";
import TourismScreen from "./src/screens/TourismScreen";
import SchoolsScreen from "./src/screens/SchoolsScreen";
import BuddyScreen from "./src/screens/BuddyScreen";
import BuddyDirectoryScreen from "./src/screens/BuddyDirectoryScreen";
import RequestBuddyScreen from "./src/screens/RequestBuddyScreen";
import HowItWorksScreen from "./src/screens/HowItWorksScreen";
import BecomeBuddyScreen from "./src/screens/BecomeBuddyScreen";
import TasksScreen from "./src/screens/TasksScreen";
import BuddyStudentsScreen from "./src/screens/BuddyStudentsScreen";

// Admin screen
import AdminScreen from "./src/screens/AdminScreen";

const Stack = createNativeStackNavigator();

const linking = {
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
      Buddy: "buddy",
      BuddyDirectory: "buddy-directory",
      RequestBuddy: "request-buddy",
      HowItWorks: "how-it-works",
      BecomeBuddy: "become-buddy",
      Tasks: "tasks",
      Admin: "admin",
      Login: "login",
      Register: "register",
    },
  },

  // ✅ Hash routing so refresh never 404s on Netlify
  getStateFromPath: (path, options) => {
    const clean = path.startsWith("#") ? path.slice(1) : path;
    return getStateFromPath(clean, options);
  },
  getPathFromState: (state, options) => {
    const path = getPathFromState(state, options);
    return `#${path}`;
  },
};

function HeaderLogoutButton() {
  const { logout } = React.useContext(AuthContext);

  return (
    <Pressable
      onPress={logout}
      style={{
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 999,
        backgroundColor: "#111",
        marginRight: 8,
      }}
    >
      <Text style={{ color: "white", fontWeight: "900" }}>Logout</Text>
    </Pressable>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}

function Root() {
  const { token, role, loading } = React.useContext(AuthContext);

  if (loading) return null;

  return (
    <NavigationContainer linking={linking}>
      {!token ? (
        <AuthStack />
      ) : role === "admin" ? (
        <AdminStack />
      ) : (
        <StudentStack />
      )}
    </NavigationContainer>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Login" }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "Create account" }} />
    </Stack.Navigator>
  );
}

function AdminStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "white" },
        headerTitleStyle: { fontWeight: "700" },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: "#f7f7f7" },
      }}
    >
      <Stack.Screen
        name="Admin"
        component={AdminScreen}
        options={{
          title: "Admin Dashboard",
          headerRight: () => <HeaderLogoutButton />,
        }}
      />
    </Stack.Navigator>
  );
}


function StudentStack() {
  return (
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
      <Stack.Screen name="Tourism" component={TourismScreen} options={{ title: "Transportation" }} />
      <Stack.Screen name="StarterPack" component={StarterPackScreen} options={{ title: "Starter Pack" }} />
      <Stack.Screen name="Schools" component={SchoolsScreen} options={{ title: "Schools" }} />
      <Stack.Screen name="Buddy" component={BuddyScreen} options={{ title: "Your Buddy" }} />
      <Stack.Screen name="BuddyDirectory" component={BuddyDirectoryScreen} options={{ title: "Choose a Buddy" }} />
      <Stack.Screen name="RequestBuddy" component={RequestBuddyScreen} options={{ title: "Request a Buddy" }} />
      <Stack.Screen name="HowItWorks" component={HowItWorksScreen} options={{ title: "How It Works" }} />
      <Stack.Screen name="BecomeBuddy" component={BecomeBuddyScreen} options={{ title: "Become a Buddy" }} />
      <Stack.Screen name="Tasks" component={TasksScreen} options={{ title: "Onboarding Tasks" }} />
      <Stack.Screen name="BuddyStudents" component={BuddyStudentsScreen} options={{ title: "My Students" }} />

    </Stack.Navigator>
  );
}
