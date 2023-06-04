import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export function StorageService() {
  const service = (Platform.OS !== 'web') ? AsyncStorage : localStorage;

  const set = async (key: string, value: string) => {
    await service.setItem("@Gruppo:" + key, value);
  }

  const get = async (key: string) => {
    return await service?.getItem("@Gruppo:" + key);
  }

  const remove = async (key: string) => {
    await service.removeItem("@Gruppo:" + key);
  }

  const clear = async () => {
    await service.clear();
  }

  return {
    set,
    get,
    remove,
    clear
  }
}
