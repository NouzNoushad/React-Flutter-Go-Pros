import 'dart:convert';

import 'package:flutter_chat/core/api/base_client.dart';
import 'package:flutter_chat/core/api/end_points.dart';
import 'package:flutter_chat/features/models/message.dart';

import '../../core/utils/app_enums.dart';

class MessagesRepository {
  Future<List<Message>> fetchMessages(String room) async {
    final url = "${APIEndPoints.messages}/$room";
    final dio = await DioClient().getDio();
    final response = await dio.get(url);

    if (response.statusCode == 200 &&
        response.data?.status == ResponseStatus.success.name) {
      final List<dynamic> data = jsonDecode(response.data);
      return data.map((e) => Message.fromJson(e)).toList();
    } else {
      throw Exception("failed to load messages");
    }
  }
}
