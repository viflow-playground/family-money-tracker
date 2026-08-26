import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { haptic } from "@/lib/haptics";
import type { FamilyMember } from "@/lib/family-data";

interface MemberSwitcherProps { members: FamilyMember[]; selectedId: string; onSelect: (memberId: string) => void; }
export function MemberSwitcher({ members, selectedId, onSelect }: MemberSwitcherProps) {
  return <FlatList horizontal data={members} keyExtractor={(member) => member.id} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row} renderItem={({ item }) => { const selected = item.id === selectedId; return <TouchableOpacity accessibilityRole="button" accessibilityState={{ selected }} onPress={() => { haptic.selection(); onSelect(item.id); }} style={[styles.choice, selected && styles.choiceSelected]} activeOpacity={0.75}><View style={[styles.dot, { backgroundColor: item.color }]} /><Text style={[styles.label, selected && styles.labelSelected]}>{item.name}</Text></TouchableOpacity>; }} />;
}
const styles = StyleSheet.create({ row: { gap: 8, paddingRight: 24 }, choice: { alignItems: "center", flexDirection: "row", gap: 7, borderRadius: 22, borderWidth: 1, borderColor: "#E6E4DD", backgroundColor: "#FFFFFF", paddingHorizontal: 13, paddingVertical: 10 }, choiceSelected: { borderColor: "#176B73", backgroundColor: "#E4F1F0" }, dot: { width: 9, height: 9, borderRadius: 5 }, label: { color: "#53616B", fontSize: 14, fontWeight: "700" }, labelSelected: { color: "#176B73" } });
