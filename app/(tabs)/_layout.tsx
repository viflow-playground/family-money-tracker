import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === "web" ? 10 : Math.max(insets.bottom, 8);
  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "#176B73", tabBarInactiveTintColor: "#7B858B", tabBarButton: HapticTab, tabBarStyle: { height: 58 + bottomPadding, paddingTop: 7, paddingBottom: bottomPadding, backgroundColor: "#FFFFFF", borderTopColor: "#E6E4DD" }, tabBarLabelStyle: { fontSize: 11, fontWeight: "700" } }}><Tabs.Screen name="index" options={{ title: "Overview", tabBarIcon: ({ color }) => <IconSymbol size={25} name="house.fill" color={color} /> }} /><Tabs.Screen name="activity" options={{ title: "Activity", tabBarIcon: ({ color }) => <IconSymbol size={25} name="chart.bar.fill" color={color} /> }} /><Tabs.Screen name="goals" options={{ title: "Goals", tabBarIcon: ({ color }) => <IconSymbol size={25} name="target" color={color} /> }} /><Tabs.Screen name="more" options={{ title: "More", tabBarIcon: ({ color }) => <IconSymbol size={25} name="ellipsis.circle.fill" color={color} /> }} /></Tabs>;
}
