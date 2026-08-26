import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { isValidParentPin } from "@/lib/parent-pin-rules";

const PIN_KEY = "family-money-parent-pin-v1";
export { isValidParentPin } from "@/lib/parent-pin-rules";

async function readPin() {
  if (Platform.OS === "web") return globalThis.localStorage?.getItem(PIN_KEY) ?? null;
  return SecureStore.getItemAsync(PIN_KEY);
}

export async function hasParentPin() { return Boolean(await readPin()); }
export async function saveParentPin(pin: string) {
  if (!isValidParentPin(pin)) throw new Error("Parent PIN must be four digits");
  if (Platform.OS === "web") { globalThis.localStorage?.setItem(PIN_KEY, pin); return; }
  await SecureStore.setItemAsync(PIN_KEY, pin);
}
export async function verifyParentPin(pin: string) { return (await readPin()) === pin; }
