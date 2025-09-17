import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_chat/features/data/chats_service.dart';
import 'package:flutter_chat/features/models/message.dart';

class HomeView extends StatefulWidget {
  const HomeView({super.key, required this.room});
  final String room;

  @override
  State<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  final ChatsService chatsService = ChatsService();
  final TextEditingController _controller = TextEditingController();
  List<Message> messages = [];

  @override
  void initState() {
    chatsService.connect();

    // listen for new messages
    chatsService.messages.listen((data) {
      final msg = Message.fromJson(jsonDecode(data));
      setState(() {
        messages.add(msg);
      });
    });

    // load history
    chatsService.fetchMessages(widget.room).then((history) {
      setState(() {
        messages = history;
      });
    });
    super.initState();
  }

  // chat input
  Widget _buildMessageInput() => Padding(
    padding: const EdgeInsets.all(8.0),
    child: Row(
      children: [
        Expanded(
          child: TextField(
            controller: _controller,
            decoration: InputDecoration(
              hintText: 'Write message...',
              enabledBorder: OutlineInputBorder(),
              focusedBorder: OutlineInputBorder(),
            ),
          ),
        ),
        SizedBox(width: 8),
        Container(
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            border: Border.all(),
          ),
          child: IconButton(onPressed: () {}, icon: Icon(Icons.send)),
        ),
      ],
    ),
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Room: ${widget.room}")),
      body: Column(
        children: [
          Expanded(
            child: Container(
              color: Colors.transparent,
              child: ListView.separated(
                itemBuilder: (context, index) {
                  return Container(
                    child: Text(messages.length.toString()),
                  );
                },
                separatorBuilder: (context, index) => SizedBox(height: 8),
                itemCount: messages.length,
              ),
            ),
          ),
          _buildMessageInput(),
        ],
      ),
    );
  }
}
