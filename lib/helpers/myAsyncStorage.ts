import AsyncStorage from "@react-native-async-storage/async-storage";

export enum StorageKey {
  notifications = "notifications",
}

class LocalStorage {
  async setItem(key: string | StorageKey, value: any) {
    const string = JSON.stringify(value);
    await AsyncStorage.setItem(key, string);
  }

  async getItem(key: string | StorageKey) {
    let value = await AsyncStorage.getItem(key);
    try {
      const parsed = JSON.parse(value || "");
      return parsed;
    } catch (e) {
      return null;
    }
  }

  async mergeItem(key: string | StorageKey, value: any) {
    const string = JSON.stringify(value);
    await AsyncStorage.mergeItem(key, string);
  }
}

const storage = new LocalStorage();

export default storage;
