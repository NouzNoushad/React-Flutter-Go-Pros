import 'package:flutter_chat/core/storage/local_storage.dart';
import 'package:flutter_chat/core/utils/constants.dart';

class StorageManager {
  StorageManager({LocalStorage? storageManager})
    : _storageManager = storageManager ?? LocalStorage() {
    _storageManager.initStorage();
  }
  final LocalStorage _storageManager;

  Future<void> saveData(String key, dynamic value) async {
    logger("Values saved, $key : $value");
    await _storageManager.saveValue(key, value);
  }

  Future<void> saveEncryptedData(String key, dynamic value) async {
    logger("Values saved, $key : $value");
    await _storageManager.saveEncryptedValue(key, value);
  }

  Future<T?> retrieveData<T>(String key) async {
    return await _storageManager.getValue(key) as T?;
  }

  Future<T?> retrieveDecryptedData<T>(String key) async {
    return await _storageManager.getDecryptedValue(key) as T?;
  }

  Future<void> clearData(String key) async {
    logger("Clear value, $key");
    await _storageManager.removeValue(key);
  }

  Future<void> clearAll() async {
    logger("Clear all values");
    await _storageManager.removeAllFromStorage();
  }
}
