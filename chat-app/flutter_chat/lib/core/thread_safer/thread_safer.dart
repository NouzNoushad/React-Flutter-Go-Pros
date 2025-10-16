import 'dart:async';

class ThreadSafeRunner {
  Completer<void>? _lock;

  Future<void> lock() async {
    if (_lock != null) {
      await _lock!.future;
    }
    _lock = Completer<void>();
  }

  void unlock() {
    if (_lock != null && !_lock!.isCompleted) {
      _lock!.complete();
      _lock = null;
    }
  }

  Future<T> executeSafely<T>(Future<T> Function() action) async {
    await lock();
    try {
      return await action();
    } finally {
      unlock();
    }
  }
}
