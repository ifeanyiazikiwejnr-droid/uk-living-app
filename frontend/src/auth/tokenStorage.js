import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "sib_token";

export async function getToken() {
  return AsyncStorage.getItem(KEY);
}

export async function setToken(token) {
  await AsyncStorage.setItem(KEY, token);
}

export async function clearToken() {
  await AsyncStorage.removeItem(KEY);
}
