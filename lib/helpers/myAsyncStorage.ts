import AsyncStorage from "@react-native-async-storage/async-storage";

class LocalStorage {
  async setItem(key: string, value: any) {
    const string = JSON.stringify(value);
    await AsyncStorage.setItem(key, string);
    return;
  }

  async getItem(key: string) {
    let value = await AsyncStorage.getItem(key);
    try {
      const parsed = JSON.parse(value || "");
      return parsed;
    } catch (e) {
      return null;
    }
  }
}

const storage = new LocalStorage();

export default storage;
