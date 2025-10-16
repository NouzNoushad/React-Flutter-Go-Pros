import 'package:flutter_chat/core/storage/local_storage.dart';

import '../utils/app_logger.dart';

class StorageManager {
  StorageManager({LocalStorage? storageManager})
    : _storageManager = storageManager ?? LocalStorage() {
    _storageManager.initStorage();
  }
  final LocalStorage _storageManager;
  final AppLogger _logger = AppLogger();

  Future<void> saveData(String key, dynamic value) async {
    _logger.log("Values saved, $key : $value");
    await _storageManager.saveValue(key, value);
  }

  Future<void> saveEncryptedData(String key, dynamic value) async {
    _logger.log("Values saved, $key : $value");
    await _storageManager.saveEncryptedValue(key, value);
  }

  Future<T?> retrieveData<T>(String key) async {
    return await _storageManager.getValue(key) as T?;
  }

  Future<T?> retrieveDecryptedData<T>(String key) async {
    return await _storageManager.getDecryptedValue(key) as T?;
  }

  Future<void> clearData(String key) async {
    _logger.log("Clear value, $key");
    await _storageManager.removeValue(key);
  }

  Future<void> clearAll() async {
    _logger.log("Clear all values");
    await _storageManager.removeAllFromStorage();
  }
}
