import 'dart:convert';

import 'package:flutter_chat/features/data/messages.dart';
import 'package:flutter_chat/features/models/message.dart';
import 'package:web_socket_channel/web_socket_channel.dart';

class ChatsService {
  late WebSocketChannel channel;
  final MessagesRepository _messagesRepository = MessagesRepository();

  void connect() {
    channel = WebSocketChannel.connect(Uri.parse('ws://10.0.2.2:8080/ws'));
  }

  void sendMessage({
    required String room,
    required String sender,
    required String content,
    String? replyTo,
  }) {
    final msg = {
      "type": replyTo != null ? "reply" : "chat",
      "room": room,
      "sender": sender,
      "content": content,
      "reply_to": replyTo,
    };
    channel.sink.add(jsonEncode(msg));
  }

  Stream<dynamic> get messages => channel.stream;

  Future<List<Message>> fetchMessages(String room) {
    return _messagesRepository.fetchMessages(room);
  }

  void disconnect() {
    channel.sink.close();
  }
}
