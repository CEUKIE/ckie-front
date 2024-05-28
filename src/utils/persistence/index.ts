import AsyncStorage from '@react-native-async-storage/async-storage';

export const persist = async (key: string, value: string | object) => {
  try {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    throw e;
  }
};

export const retrieve = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    throw e;
  }
};
