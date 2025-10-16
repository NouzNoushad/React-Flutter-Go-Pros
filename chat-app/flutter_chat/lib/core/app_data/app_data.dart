import 'package:flutter_chat/core/storage/storage_manager.dart';
import 'package:flutter_chat/core/thread_safer/thread_safer.dart';
import 'package:flutter_chat/core/utils/app_keys.dart';

class AppData {
  AppData._internal({ThreadSafeRunner? threadSafeRunner})
    : _threadSafeRunner = threadSafeRunner ?? ThreadSafeRunner();
  final ThreadSafeRunner _threadSafeRunner;

  static final AppData _instance = AppData._internal();
  factory AppData() => _instance;

  static AppData get instance => _instance;

  final StorageManager _storageManager = StorageManager();

  Future<void> saveToStorage(String key, dynamic value) async {
    return _threadSafeRunner.executeSafely(() async {
      await _storageManager.saveData(key, value);
    });
  }

  Future<void> saveEncryptedDataToStorage(String key, dynamic value) async {
    return _threadSafeRunner.executeSafely(() async {
      await _storageManager.saveEncryptedData(key, value);
    });
  }

  Future<T?> getFromStorage<T>(String key) async {
    return _threadSafeRunner.executeSafely(() async {
      return await _storageManager.retrieveData(key);
    });
  }

  Future<T?> getDecryptedFromStorage<T>(String key) async {
    return _threadSafeRunner.executeSafely(() async {
      return await _storageManager.retrieveDecryptedData(key);
    });
  }

  Future<String?> get token async {
    return _threadSafeRunner.executeSafely(() async {
      return await _storageManager.retrieveData(AppKeys.token);
    });
  }

  Future<String?> get refreshToken async {
    return _threadSafeRunner.executeSafely(() async {
      return await _storageManager.retrieveData(AppKeys.refreshToken);
    });
  }
}
