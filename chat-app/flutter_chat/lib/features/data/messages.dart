import 'dart:convert';

import 'package:flutter_chat/features/models/message.dart';
import 'package:http/http.dart' as http;

class MessagesRepository {
  Future<List<Message>> fetchMessages(String room) async {
    final url = Uri.parse('http://localhost:8080/messages/$room');
    final response = await http.get(url);

    if (response.statusCode == 200) {
      final List<dynamic> data = jsonDecode(response.body);
      return data.map((e) => Message.fromJson(e)).toList();
    } else {
      throw Exception("failed to load messages");
    }
  }
}
