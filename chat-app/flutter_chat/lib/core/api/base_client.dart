import 'package:dio/dio.dart';
import 'package:flutter_chat/core/api/end_points.dart';
import 'package:flutter_chat/core/app_data/app_data.dart';
import 'package:flutter_chat/core/model/auth_model.dart';
import 'package:flutter_chat/core/utils/app_keys.dart';
import 'package:flutter_chat/core/utils/constants.dart';
import 'package:flutter_chat/core/utils/enums.dart';

class DioClient {
  static final DioClient _instance = DioClient._internal();
  factory DioClient() => _instance;
  DioClient._internal();

  Dio? _dio;

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
        connectTimeout: const Duration(seconds: 10),
        receiveTimeout: const Duration(seconds: 15),
      ),
    );

    dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) {
          logger("API request: ${options.method} ${options.uri}");
          logger("Headers: ${options.headers}");
          return handler.next(options);
        },
        onResponse: (response, handler) {
          logger(
            "API response: ${response.statusCode} ${response.requestOptions.uri}",
          );
          return handler.next(response);
        },
        onError: (error, handler) async {
          logger(
            "API error: ${error.response?.statusCode} ${error.requestOptions.uri}",
          );

          // refresh
          if (error.response?.statusCode == 401) {
            logger("Token refresh");
            final refresh = await _refreshToken();

            if (refresh) {
              logger("Token refreshed, retrying...");
              final newToken = await AppData.instance.token;
              final request = await _retryRequest(
                dio: dio,
                requestOptions: error.requestOptions,
                newToken: newToken ?? '',
              );
              return handler.resolve(request);
            } else {
              logger('Refresh token failed');
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
          connectTimeout: const Duration(seconds: 10),
          receiveTimeout: const Duration(seconds: 15),
        ),
      );
      final response = await dio.post(
        "/refresh",
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
      logger('Failed: $e');
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
