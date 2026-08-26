import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFamily } from "@/components/family-provider";
import { haptic } from "@/lib/haptics";

const slides = [
  { icon: "family-restroom" as const, accent: "#176B73", kicker: "WELCOME TO FAMILY MONEY", title: "Learn together, one choice at a time.", text: "Parents and children can see balances, savings goals, pocket money, and work income in one calm family view." },
  { icon: "account-balance-wallet" as const, accent: "#2C8C6A", kicker: "SEE THE BIG PICTURE", title: "Every amount has a home.", text: "Record money spent, saved, invested, or earned. The activity feed makes it easy to talk through each choice." },
  { icon: "auto-graph" as const, accent: "#9A6B18", kicker: "GROW GOOD HABITS", title: "Savings, interest, and earning effort add up.", text: "Set a monthly virtual interest rate, create paid work tasks, and celebrate a three-day effort streak with a small bonus." },
  { icon: "lock" as const, accent: "#6C4A9B", kicker: "PARENTS STAY IN CONTROL", title: "Keep key actions thoughtful.", text: "A parent PIN protects interest changes and work approvals. You can edit child names anytime in Family settings." },
];

export function FirstUseIntro() {
  const { data, isReady, completeIntro } = useFamily();
  const [index, setIndex] = useState(0);
  if (!isReady || data.hasSeenIntro) return null;
  const slide = slides[index]; const last = index === slides.length - 1;
  const next = () => { if (last) { haptic.success(); completeIntro(); } else { haptic.light(); setIndex((current) => current + 1); } };
  return <Modal visible animationType="fade" statusBarTranslucent><View style={styles.root}><View style={[styles.icon, { backgroundColor: `${slide.accent}18` }]}><MaterialIcons name={slide.icon} size={38} color={slide.accent} /></View><Text style={[styles.kicker, { color: slide.accent }]}>{slide.kicker}</Text><Text style={styles.title}>{slide.title}</Text><Text style={styles.text}>{slide.text}</Text><View style={styles.dots}>{slides.map((item, dotIndex) => <View key={item.title} style={[styles.dot, { backgroundColor: dotIndex === index ? slide.accent : "#D7D9D5" }]} />)}</View><TouchableOpacity style={[styles.next, { backgroundColor: slide.accent }]} activeOpacity={0.85} onPress={next}><Text style={styles.nextText}>{last ? "Start using Family Money" : "Continue"}</Text><MaterialIcons name={last ? "check" : "arrow-forward"} size={20} color="#FFFFFF" /></TouchableOpacity>{!last && <TouchableOpacity style={styles.skip} activeOpacity={0.72} onPress={() => { haptic.selection(); completeIntro(); }}><Text style={styles.skipText}>Skip introduction</Text></TouchableOpacity>}</View></Modal>;
}

const styles = StyleSheet.create({ root: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F7F6F2", padding: 28 }, icon: { width: 88, height: 88, alignItems: "center", justifyContent: "center", borderRadius: 29 }, kicker: { fontSize: 10, letterSpacing: 1.25, fontWeight: "900", marginTop: 31, textAlign: "center" }, title: { color: "#1D2C3A", textAlign: "center", fontSize: 29, lineHeight: 37, fontWeight: "800", marginTop: 9 }, text: { color: "#65737C", textAlign: "center", fontSize: 15, lineHeight: 22, marginTop: 14, maxWidth: 330 }, dots: { flexDirection: "row", gap: 7, marginTop: 31 }, dot: { width: 8, height: 8, borderRadius: 4 }, next: { width: "100%", minHeight: 54, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8, borderRadius: 18, marginTop: 31 }, nextText: { color: "#FFFFFF", fontSize: 15, fontWeight: "800" }, skip: { paddingVertical: 17 }, skipText: { color: "#6E7B82", fontSize: 13, fontWeight: "800" } });
