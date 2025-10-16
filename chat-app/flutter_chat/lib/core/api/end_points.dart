class EndPoints {
  static const String _baseUrl = "http://10.0.2.2:8080";
  static const String _webSocketUrl = "ws://10.0.2.2:8080";
  static String get baseUrl => _baseUrl;
  static String get webSocketUrl => _webSocketUrl;
}

enum APIEndPoints { login, register, refresh, messages, ws }

extension APIEndPointsExt on APIEndPoints {
  String get _path {
    switch (this) {
      case APIEndPoints.login:
        return 'login';
      case APIEndPoints.register:
        return 'register';
      case APIEndPoints.refresh:
        return 'refresh';
      case APIEndPoints.messages:
        return 'messages';
      case APIEndPoints.ws:
        return 'ws';
    }
  }

  String get url => _path;
  String get wsUrl => EndPoints._webSocketUrl + _path;
}
