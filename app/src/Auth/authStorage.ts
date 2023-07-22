import EncryptedStorage from 'react-native-encrypted-storage';

enum StorageKeys {
  LOGGED_IN = 'LOGGED_IN',
  IS_BANNER_SHOWN = 'false',
}

const AuthStorage = {
  StorageKeys: StorageKeys,
  async setItem(key: StorageKeys, value: string): Promise<void> {
    try {
      await EncryptedStorage.setItem(key, value);
    } catch (error) {
      // do nothing since EncryptedStorage fails when we remove a key that does not exist
    }
  },
  async clearItem(key: StorageKeys): Promise<void> {
    try {
      await EncryptedStorage.removeItem(key);
    } catch (error) {
      // do nothing since EncryptedStorage fails when we remove a key that does not exist
    }
  },

  // eslint-disable-next-line consistent-return
  async getItem(key: StorageKeys): Promise<string | undefined | null> {
    try {
      const value = await EncryptedStorage.getItem(key);
      return value;
    } catch (error) {
      // do nothing since EncryptedStorage fails when we remove a key that does not exist
    }
  },
  async resetCredentialsOnLogout(): Promise<void> {
    try {
      await Promise.all([EncryptedStorage.removeItem(StorageKeys.LOGGED_IN)]);
    } catch (error) {
      // do nothing since EncryptedStorage fails when we remove a key that does not exist
    }
  },
};

export default AuthStorage;
