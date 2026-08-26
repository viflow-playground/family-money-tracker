import { Platform } from "react-native";
import * as Haptics from "expo-haptics";

const nativeOnly = (action: () => Promise<void>) => { if (Platform.OS !== "web") void action(); };
export const haptic = {
  light: () => nativeOnly(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)),
  selection: () => nativeOnly(() => Haptics.selectionAsync()),
  success: () => nativeOnly(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)),
};
