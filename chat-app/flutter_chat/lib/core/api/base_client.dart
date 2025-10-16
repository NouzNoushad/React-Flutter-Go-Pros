import 'package:dio/dio.dart';

import '../app_data/app_data.dart';
import '../model/auth_model.dart';
import '../utils/app_constants.dart';
import '../utils/app_enums.dart';
import '../utils/app_keys.dart';
import '../utils/app_logger.dart';
import 'end_points.dart';

class DioClient {
  static final DioClient _instance = DioClient._internal();
  factory DioClient() => _instance;
  DioClient._internal();

  Dio? _dio;
  final AppLogger _logger = AppLogger();

  Future<Dio> getDio({String? contentType, String? token}) async {
    if (_dio != null && contentType != "multipart/form-data") {
      return _dio!;
    }

    final dio = Dio(
      BaseOptions(
        baseUrl: EndPoints.baseUrl,
        headers: {
          "Accept": "application/json",
          "Authorization": "Bearer $token",
          "Content-Type": contentType ?? "application/json",
        },
        connectTimeout: const Duration(seconds: AppConstants.connectTimeout),
        receiveTimeout: const Duration(seconds: AppConstants.receiveTimeout),
      ),
    );

    dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) {
          _logger.log("API request: ${options.method} ${options.uri}");
          _logger.log("Headers: ${options.headers}");
          return handler.next(options);
        },
        onResponse: (response, handler) {
          _logger.log(
            "API response: ${response.statusCode} ${response.requestOptions.uri}",
          );
          return handler.next(response);
        },
        onError: (error, handler) async {
          _logger.log(
            "API error: ${error.response?.statusCode} ${error.requestOptions.uri}",
          );

          // refresh
          if (error.response?.statusCode == 401) {
            _logger.log("Token refresh");
            final refresh = await _refreshToken();

            if (refresh) {
              _logger.log("Token refreshed, retrying...");
              final newToken = await AppData.instance.token;
              final request = await _retryRequest(
                dio: dio,
                requestOptions: error.requestOptions,
                newToken: newToken ?? '',
              );
              return handler.resolve(request);
            } else {
              _logger.log('Refresh token failed');
            }
          }
          return handler.next(error);
        },
      ),
    );
    _dio = dio;
    return dio;
  }

  Future<bool> _refreshToken() async {
    try {
      final refreshToken = await AppData.instance.refreshToken;
      final token = await AppData.instance.token;
      if (refreshToken == null || refreshToken.isEmpty) return false;

      final dio = Dio(
        BaseOptions(
          baseUrl: EndPoints.baseUrl,
          headers: {
            "Accept": "application/json",
            "Authorization": "Bearer $token",
          },
          connectTimeout: const Duration(seconds: AppConstants.connectTimeout),
          receiveTimeout: const Duration(seconds: AppConstants.receiveTimeout),
        ),
      );
      final response = await dio.post(
        APIEndPoints.refresh.url,
        data: {"refresh_token": refreshToken},
      );

      if (response.statusCode == 200) {
        final json = response.data as Map<String, dynamic>;
        final authResponse = AuthResponse.fromJson(json);
        if (authResponse.status == ResponseStatus.success.name) {
          final newToken = authResponse.accessToken;
          if (newToken != null) {
            await AppData.instance.saveToStorage(AppKeys.token, newToken);
            return true;
          }
        }
      }
    } catch (e) {
      _logger.log('Failed: $e');
    }
    return false;
  }
}

Future<Response<dynamic>> _retryRequest({
  required Dio dio,
  required RequestOptions requestOptions,
  required String newToken,
}) async {
  final options = Options(
    method: requestOptions.method,
    headers: {...requestOptions.headers, "Authorization": "Bearer $newToken"},
  );

  return await dio.request(
    requestOptions.path,
    data: requestOptions.data,
    queryParameters: requestOptions.queryParameters,
    options: options,
  );
}
