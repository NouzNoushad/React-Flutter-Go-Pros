import 'dart:convert';
import 'dart:math';

import 'package:crypto/crypto.dart';
import 'package:encrypt/encrypt.dart';
import 'package:flutter_chat/core/utils/app_logger.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../utils/app_keys.dart';

abstract class LocalStorageHelper {
  Future<void> saveEncryptedValue(String key, String value);
  Future<void> saveValue(String key, value);
  Future<dynamic> getDecryptedValue(String key);
  Future<dynamic> getValue(String key);
  Future<void> removeValue(String key);
  Future<void> removeAllFromStorage();
}

class LocalStorage extends LocalStorageHelper {
  SharedPreferences? _prefs;
  static const String _encryptionKey = AppKeys.privateKey;
  final AppLogger _logger = AppLogger();

  Future<void> initStorage() async {
    _prefs ??= await SharedPreferences.getInstance();
  }

  String _generateRandomKey() {
    final random = Random.secure();
    final values = List<int>.generate(32, (_) => random.nextInt(256));
    return base64UrlEncode(values);
  }

  Future<void> _ensureInitialized() async {
    if (_prefs == null) {
      await initStorage();
    }
  }

  Future<String> _createKey() async {
    await _ensureInitialized();
    var key = _prefs?.getString(_encryptionKey);
    if (key != null) return key;
    key = _generateRandomKey();
    await _prefs?.setString(_encryptionKey, key);
    return key;
  }

  Future<Encrypter> _createEncrypter() async {
    final keybase64 = await _createKey();
    final keyBytes = base64Url.decode(keybase64);
    final key = Key(keyBytes);
    return Encrypter(AES(key, mode: AESMode.cbc));
  }

  String _generateHash(String data) {
    return sha256.convert(utf8.encode(data)).toString();
  }

  Future<String> _enrypt(String input) async {
    final encrypter = await _createEncrypter();
    final iv = IV.fromSecureRandom(16);
    final encrypted = encrypter.encrypt(input, iv: iv);

    final payload = {
      "iv": iv.base64,
      "data": encrypted.base64,
      "hash": _generateHash(encrypted.base64),
    };
    return jsonEncode(payload);
  }

  Future<String?> _decrypt(String encryptedInput) async {
    try {
      final decoded = jsonDecode(encryptedInput);
      final iv = IV.fromBase64(decoded["iv"]);
      final data = decoded["data"];
      final hash = decoded["hash"];
      if (hash != _generateHash(data)) {
        _logger.log('Tampering detected! Decryption aborted.');
        return null;
      }
      final encrypter = await _createEncrypter();
      final decrypted = encrypter.decrypt64(data, iv: iv);
      return decrypted;
    } catch (e) {
      _logger.log('Decryption failed: $e');
      return null;
    }
  }

  @override
  Future<void> saveEncryptedValue(String key, String value) async {
    await _ensureInitialized();
    await _prefs?.setString(key, await _enrypt(value));
  }

  @override
  Future<dynamic> getDecryptedValue(String key) async {
    await _ensureInitialized();
    final encryptedValue = _prefs?.getString(key);
    if (encryptedValue != null) {
      return await _decrypt(encryptedValue);
    }
    return null;
  }

  @override
  Future<dynamic> getValue(String key) async {
    await _ensureInitialized();
    final value = _prefs?.get(key);
    if (value is String) {
      try {
        final decodedMap = jsonDecode(value) as Map;
        return decodedMap;
      } catch (_) {
        return value;
      }
    } else {
      return value;
    }
  }

  @override
  Future<void> removeAllFromStorage() async {
    await _ensureInitialized();
    _prefs?.clear();
  }

  @override
  Future<void> removeValue(String key) async {
    await _ensureInitialized();
    _prefs?.remove(key);
  }

  @override
  Future<void> saveValue(String key, value) async {
    await _ensureInitialized();
    if (_prefs != null) {
      if (value is String) {
        await _prefs?.setString(key, value);
      } else if (value is int) {
        await _prefs?.setInt(key, value);
      } else if (value is bool) {
        await _prefs?.setBool(key, value);
      } else if (value is double) {
        await _prefs?.setDouble(key, value);
      } else if (value is List<String>) {
        await _prefs?.setStringList(key, value);
      } else if (value is Map<String, dynamic>) {
        final jsonString = jsonEncode(value);
        await _prefs?.setString(key, jsonString);
      } else {
        throw ArgumentError("Unsupported value type");
      }
    }
  }
}
