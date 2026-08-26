import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import { FamilyProvider } from "@/components/family-provider";
import { ThemeProvider } from "@/lib/theme-provider";
export default function RootLayout() { return <ThemeProvider><FamilyProvider><StatusBar style="dark" /><Stack screenOptions={{ headerBackTitle: "Back", headerShadowVisible: false, headerStyle: { backgroundColor: "#F7F6F2" }, headerTitleStyle: { color: "#1D2C3A", fontWeight: "700" }, headerTintColor: "#176B73" }}><Stack.Screen name="(tabs)" options={{ headerShown: false }} /><Stack.Screen name="add-decision" options={{ presentation: "modal", headerShown: false }} /><Stack.Screen name="pocket-money" options={{ title: "Pocket money" }} /><Stack.Screen name="virtual-interest" options={{ title: "Virtual interest" }} /><Stack.Screen name="work" options={{ title: "Work & income" }} /><Stack.Screen name="new-work-task" options={{ presentation: "modal", headerShown: false }} /><Stack.Screen name="install" options={{ title: "Install on iPhone" }} /><Stack.Screen name="settings" options={{ title: "Family settings" }} /></Stack></FamilyProvider></ThemeProvider>; }
