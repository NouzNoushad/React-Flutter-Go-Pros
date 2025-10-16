import 'package:flutter/foundation.dart';

abstract class Logger {
  void log(String message);
}

class AppLogger extends Logger {
  @override
  void log(String message) {
    if (kDebugMode) {
      print('///////////////////// [DEBUG]: $message');
    }
  }
}
